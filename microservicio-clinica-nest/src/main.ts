import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Prefijo global para todas las rutas
  app.setGlobalPrefix('genosentinel/clinica');

  // ✅ Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('GenoSentinel - Microservicio Clínica')
    .setDescription('API para gestión de pacientes, tipos de tumor e historias clínicas')
    .setVersion('1.0')
    .addTag('Pacientes')
    .addTag('Tipos de Tumor')
    .addTag('Historias Clínicas')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('genosentinel/clinica/api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
  
  console.log('🏥 Microservicio Clínica corriendo en http://localhost:3000');
  console.log('📚 Swagger disponible en http://localhost:3000/genosentinel/clinica/api-docs');
}
bootstrap();