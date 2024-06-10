import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 3000;
  await app.listen(PORT);
  // Use NestJSDI for injecting dependencies into validators
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
}
bootstrap();
