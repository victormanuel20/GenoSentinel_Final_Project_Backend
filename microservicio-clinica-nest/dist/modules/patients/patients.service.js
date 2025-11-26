"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientsService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const patient_entity_1 = require("./entities/patient.entity");
const common_1 = require("@nestjs/common");
const PatientAlreadyExistsException_1 = require("./exceptions/PatientAlreadyExistsException");
const patient_not_found_exception_1 = require("./exceptions/patient-not-found.exception");
const invalid_search_params_exception_1 = require("./exceptions/invalid-search-params.exception");
const PatientsNotFoundException_1 = require("./exceptions/PatientsNotFoundException");
const PatientUpdateFailedException_1 = require("./exceptions/PatientUpdateFailedException");
const PatientAlreadyInactiveException_1 = require("./exceptions/PatientAlreadyInactiveException");
const CannotDeleteActivePatientException_1 = require("./exceptions/CannotDeleteActivePatientException");
let PatientsService = class PatientsService {
    patientRepository;
    constructor(patientRepository) {
        this.patientRepository = patientRepository;
    }
    async findAll() {
        const patients = await this.patientRepository.find();
        return patients.map(patient => ({
            id: patient.id,
            firstName: patient.firstName,
            lastName: patient.lastName,
            birthDate: patient.birthDate,
            gender: patient.gender,
            status: patient.status,
        }));
    }
    async findOne(id) {
        const patient = await this.patientRepository.findOne({
            where: { id },
        });
        if (!patient) {
            throw new patient_not_found_exception_1.PatientNotFoundException(id);
        }
        return this.toResponseDto(patient);
    }
    async search(searchDto) {
        if (!searchDto.firstName && !searchDto.lastName && !searchDto.birthDate) {
            throw new invalid_search_params_exception_1.InvalidSearchParamsException();
        }
        const whereCondition = {};
        if (searchDto.firstName) {
            whereCondition.firstName = (0, typeorm_2.Like)(`%${searchDto.firstName}%`);
        }
        if (searchDto.lastName) {
            whereCondition.lastName = (0, typeorm_2.Like)(`%${searchDto.lastName}%`);
        }
        if (searchDto.birthDate) {
            whereCondition.birthDate = searchDto.birthDate;
        }
        const patients = await this.patientRepository.find({
            where: whereCondition,
        });
        if (!patients || patients.length === 0) {
            throw new PatientsNotFoundException_1.PatientsNotFoundException(searchDto);
        }
        return patients.map(patient => this.toResponseDto(patient));
    }
    async create(createPatientDto) {
        const existingPatient = await this.patientRepository.findOne({
            where: {
                firstName: createPatientDto.firstName,
                lastName: createPatientDto.lastName,
                birthDate: createPatientDto.birthDate,
            },
        });
        console.log('🔍 Buscando duplicado:', {
            firstName: createPatientDto.firstName,
            lastName: createPatientDto.lastName,
            birthDate: createPatientDto.birthDate,
        });
        console.log('🔍 Resultado:', existingPatient);
        if (existingPatient) {
            throw new PatientAlreadyExistsException_1.PatientAlreadyExistsException(createPatientDto.firstName, createPatientDto.lastName, createPatientDto.birthDate);
        }
        const patient = this.patientRepository.create({
            firstName: createPatientDto.firstName,
            lastName: createPatientDto.lastName,
            birthDate: createPatientDto.birthDate,
            gender: createPatientDto.gender,
            status: createPatientDto.status,
        });
        const savedPatient = await this.patientRepository.save(patient);
        return {
            id: savedPatient.id,
            firstName: savedPatient.firstName,
            lastName: savedPatient.lastName,
            birthDate: savedPatient.birthDate,
            gender: savedPatient.gender,
            status: savedPatient.status,
        };
    }
    toResponseDto(patient) {
        return {
            id: patient.id,
            firstName: patient.firstName,
            lastName: patient.lastName,
            birthDate: patient.birthDate,
            gender: patient.gender,
            status: patient.status,
        };
    }
    async update(id, updatePatientDto) {
        const existingPatient = await this.patientRepository.findOne({
            where: { id },
        });
        if (!existingPatient) {
            throw new patient_not_found_exception_1.PatientNotFoundException(id);
        }
        if (updatePatientDto.firstName || updatePatientDto.lastName || updatePatientDto.birthDate) {
            const firstName = updatePatientDto.firstName ?? existingPatient.firstName;
            const lastName = updatePatientDto.lastName ?? existingPatient.lastName;
            const birthDate = updatePatientDto.birthDate ?? existingPatient.birthDate;
            const duplicate = await this.patientRepository.findOne({
                where: { firstName, lastName, birthDate },
            });
            if (duplicate && duplicate.id !== id) {
                throw new PatientAlreadyExistsException_1.PatientAlreadyExistsException(firstName, lastName, birthDate);
            }
        }
        try {
            await this.patientRepository.update(id, updatePatientDto);
        }
        catch (error) {
            throw new PatientUpdateFailedException_1.PatientUpdateFailedException(id, error.message);
        }
        const updatedPatient = await this.patientRepository.findOne({
            where: { id },
        });
        if (!updatedPatient) {
            throw new patient_not_found_exception_1.PatientNotFoundException(id);
        }
        return this.toResponseDto(updatedPatient);
    }
    async desactivate(id, deactivatePatientDto) {
        const existingPatient = await this.patientRepository.findOne({
            where: { id },
        });
        if (!existingPatient) {
            throw new patient_not_found_exception_1.PatientNotFoundException(id);
        }
        if (existingPatient.status === deactivatePatientDto.status) {
            throw new PatientAlreadyInactiveException_1.PatientAlreadyInactiveException(id);
        }
        try {
            await this.patientRepository.update(id, {
                status: deactivatePatientDto.status,
            });
        }
        catch (error) {
            throw new PatientUpdateFailedException_1.PatientUpdateFailedException(id, error.message);
        }
        const updatedPatient = await this.patientRepository.findOne({
            where: { id },
        });
        if (!updatedPatient) {
            throw new patient_not_found_exception_1.PatientNotFoundException(id);
        }
        return this.toResponseDto(updatedPatient);
    }
    async remove(id) {
        const patient = await this.patientRepository.findOne({ where: { id } });
        if (!patient) {
            throw new patient_not_found_exception_1.PatientNotFoundException(id);
        }
        if (patient.status !== 'Inactivo') {
            throw new CannotDeleteActivePatientException_1.CannotDeleteActivePatientException(id);
        }
        await this.patientRepository.remove(patient);
        return {
            message: `Paciente con ID ${id} eliminado exitosamente`,
            success: true,
        };
    }
};
exports.PatientsService = PatientsService;
exports.PatientsService = PatientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(patient_entity_1.Patient)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PatientsService);
//# sourceMappingURL=patients.service.js.map