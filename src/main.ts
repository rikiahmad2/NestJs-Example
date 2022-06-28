/* eslint-disable @typescript-eslint/no-inferrable-types */
import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');
  const host: string = config.get<string>('HOST');

  /**
   * Enable Helmet
   * Helmet helps you secure your Express apps by setting various HTTP headers.
   * https://github.com/helmetjs/helmet#how-it-works
   */
  app.use(helmet());

  /**
   * Enable Cors
   * https://docs.nestjs.com/security/cors
   */
  app.enableCors();

  /**
   * Swagger Config
   * https://docs.nestjs.com/openapi/introduction
   */
  const docConfig = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription(
      'Riki Ahmad Practice Serverless API with NestJS, TypeScript, and AWS Lambda',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port, host, () => {
    console.log('[SERVICE]', `${host}:${port}`);
  });
}
bootstrap();
