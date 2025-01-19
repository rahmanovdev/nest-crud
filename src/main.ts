import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Swagger конфигурациясы
  const config = new DocumentBuilder()
    .setTitle('Items API')
    .setDescription('Items API документациясы')
    .setVersion('1.0')
    .addServer(`http://localhost:/${process.env.PORT ?? 3000}`) // Локалдык сервер
    .addServer(`${process.env.PORT ?? 3000}`) // Продакшн сервер (deploy кылгандан кийин)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
