DROP DATABASE IF EXISTS genosentinel;
CREATE DATABASE genosentinel;
USE genosentinel;

CREATE TABLE patient (
     id BIGINT AUTO_INCREMENT PRIMARY KEY,
     first_name VARCHAR(100) NOT NULL,
     last_name VARCHAR(100) NOT NULL,
     birth_date DATE NOT NULL,
     gender ENUM('Masculino','Femenino','Otro') NOT NULL,
     status ENUM('Activo','Seguimiento','Inactivo') NOT NULL DEFAULT 'Activo'
);

CREATE TABLE tumor_type (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    system_affected VARCHAR(150) NOT NULL
);

CREATE TABLE clinical_record (
     id BIGINT AUTO_INCREMENT PRIMARY KEY,
     patient_id BIGINT NOT NULL,
     tumor_type_id BIGINT NOT NULL,
     diagnosis_date DATE NOT NULL,
     stage VARCHAR(20),
     treatment_protocol TEXT,
     FOREIGN KEY (patient_id) REFERENCES patient(id) ON DELETE CASCADE,
     FOREIGN KEY (tumor_type_id) REFERENCES tumor_type(id) ON DELETE RESTRICT
);

CREATE TABLE gene (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      symbol VARCHAR(50) NOT NULL,
      full_name VARCHAR(200) NOT NULL,
      function_summary TEXT
);

CREATE TABLE genetic_variant (
     id BIGINT AUTO_INCREMENT PRIMARY KEY,
     gene_id BIGINT NOT NULL,
     chromosome VARCHAR(10) NOT NULL,
     position INT NOT NULL,
     reference_base CHAR(1) NOT NULL,
     alternate_base CHAR(1) NOT NULL,
     impact ENUM('Missense','Frameshift','Nonsense','Synonymous','Unknown') NOT NULL,
     FOREIGN KEY (gene_id) REFERENCES gene(id) ON DELETE CASCADE
);

CREATE TABLE patient_variant_report (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id BIGINT NOT NULL,
    variant_id BIGINT NOT NULL,
    detection_date DATE NOT NULL,
    allele_frequency DECIMAL(4,3),
    FOREIGN KEY (patient_id) REFERENCES patient(id) ON DELETE CASCADE,
    FOREIGN KEY (variant_id) REFERENCES genetic_variant(id) ON DELETE CASCADE
);

CREATE TABLE users (
   id BIGINT AUTO_INCREMENT PRIMARY KEY,
   username VARCHAR(100) NOT NULL UNIQUE,
   email VARCHAR(150) NOT NULL UNIQUE,
   password VARCHAR(255) NOT NULL,
   active BOOLEAN DEFAULT TRUE,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE roles (
   id BIGINT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE user_role (
   user_id BIGINT NOT NULL,
   role_id BIGINT NOT NULL,
   PRIMARY KEY (user_id, role_id),
   FOREIGN KEY (user_id) REFERENCES users(id),
   FOREIGN KEY (role_id) REFERENCES roles(id)
);

INSERT INTO patient (first_name, last_name, birth_date, gender, status)
VALUES
    ('Ana', 'García López', '1990-05-10', 'Femenino', 'Activo'),
    ('Carlos', 'Pérez Ríos', '1985-11-22', 'Masculino', 'Seguimiento'),
    ('Lucía', 'Martínez Díaz', '1978-03-05', 'Femenino', 'Inactivo');

INSERT INTO tumor_type (name, system_affected)
VALUES
    ('Cáncer de mama', 'Glándulas'),
    ('Cáncer de pulmón', 'Sistema respiratorio'),
    ('Leucemia linfoblástica aguda', 'Sistema hematológico');

INSERT INTO clinical_record (patient_id, tumor_type_id, diagnosis_date, stage, treatment_protocol)
VALUES
    (1, 1, '2023-01-15', 'IIA', 'Cirugía conservadora + quimioterapia adyuvante'),
    (2, 2, '2022-06-30', 'III', 'Quimioterapia sistémica + radioterapia'),
    (3, 3, '2020-09-10', 'IV', 'Quimioterapia intensiva + trasplante de médula ósea');

INSERT INTO gene (symbol, full_name, function_summary)
VALUES
    ('BRCA1', 'Breast cancer type 1 susceptibility protein', 'Participa en reparación de ADN y mantenimiento de estabilidad genómica'),
    ('TP53', 'Tumor protein p53', 'Regula ciclo celular y apoptosis en respuesta a daño en el ADN'),
    ('EGFR', 'Epidermal growth factor receptor', 'Receptor tirosina quinasa implicado en proliferación celular');

INSERT INTO genetic_variant (gene_id, chromosome, position, reference_base, alternate_base, impact)
VALUES
    (1, 'chr17', 43045701, 'A', 'G', 'Missense'),
    (1, 'chr17', 43049012, 'C', 'T', 'Nonsense'),
    (2, 'chr17', 7673802, 'G', 'A', 'Missense'),
    (2, 'chr17', 7674221, 'C', 'T', 'Synonymous'),
    (3, 'chr7', 55249071, 'G', 'T', 'Frameshift');

INSERT INTO patient_variant_report (patient_id, variant_id, detection_date, allele_frequency)
VALUES
    (1, 1, '2023-01-20', 0.325),
    (1, 2, '2023-01-20', 0.148),
    (2, 5, '2022-07-05', 0.420),
    (3, 3, '2020-09-15', 0.275);