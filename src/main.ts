import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('EduLab')
    .setDescription('Backend para o aplicativo EduLab')
    .setVersion('1.1')
    .build()

    const document = SwaggerModule.createDocument(app, config)

    SwaggerModule.setup('/docs', app, document)

  process.env.TZ = '-03:00'

  app.useGlobalPipes(new ValidationPipe())

  app.enableCors()

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
