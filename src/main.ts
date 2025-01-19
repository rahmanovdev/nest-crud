import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Items API')
    .setDescription('Items API документациясы')
    .setVersion('1.0')
    .addServer('/') // Маанилүү: бул сапты кошуңуз
    .addServer('https://your-vercel-url.vercel.app') // Deploy кылгандан кийин Vercel URL'ди кошуңуз
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
