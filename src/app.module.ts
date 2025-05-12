import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersController } from './orders/orders.controller';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { OrdersService } from './orders/orders.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),

  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: +configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_DATABASE'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: configService.get('DB_SSL') === 'true' 
      ? { rejectUnauthorized: false }  // Azure acepta esto
      : false,
    }),
  }),

  UsersModule,
  ],

  controllers: [AppController, OrdersController, UsersController],
  providers: [AppService, UsersService, OrdersService],
})
export class AppModule {}
