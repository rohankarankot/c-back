import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { LocationModule } from './location/location.module';
import { HealthController } from './health/health.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron/cron.service';
import { RideModule } from './ride/ride.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongooseModule.forRootAsync({
      imports: [ScheduleModule.forRoot(), ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('DATABASE_URI'),
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<string | number>('JWT_EXPIRE'),
        },
      }),
    }),
    AuthModule,
    UserModule,
    LocationModule,
    RideModule,
  ],
  controllers: [HealthController],
  providers: [CronService],
})
export class AppModule { }
