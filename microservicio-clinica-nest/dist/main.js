"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('genosentinel/clinica');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('GenoSentinel - Microservicio Clínica')
        .setDescription('API para gestión de pacientes, tipos de tumor e historias clínicas')
        .setVersion('1.0')
        .addTag('Pacientes')
        .addTag('Tipos de Tumor')
        .addTag('Historias Clínicas')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('genosentinel/clinica/api-docs', app, document);
    await app.listen(process.env.PORT ?? 3000);
    console.log('🏥 Microservicio Clínica corriendo en http://localhost:3000');
    console.log('📚 Swagger disponible en http://localhost:3000/genosentinel/clinica/api-docs');
}
bootstrap();
//# sourceMappingURL=main.js.map