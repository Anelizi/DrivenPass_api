import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
  .setTitle("DrivenPass - Rest API Documentation")
  .setDescription("DrivenPass Rest API Documentation")
  .setVersion("1.0")
  .addTag("Driven")
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  const port = process.env.PORT || 3000
  await app.listen(port, () => {
    console.log('Servidor está ouvindo na porta 4000');
  });
}
bootstrap();
