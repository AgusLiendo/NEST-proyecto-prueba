import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TypeOrmUsersExceptionFilter } from './common/filters/typeorm-users-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new TypeOrmUsersExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
