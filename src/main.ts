import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Items API')
    .setDescription('Items API документациясы')
    .setVersion('1.0')
    .addServer('https://nest-crud-mu.vercel.app') // сиздин Vercel URL'иңиз
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Swagger UI опцияларын кошуу
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Items API Documentation',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    ],
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
