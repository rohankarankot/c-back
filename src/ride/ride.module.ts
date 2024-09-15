import { Module, ValidationPipe } from '@nestjs/common';
import { RideController } from './ride.controller';
import { RideService } from './ride.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Ride, RideModal, } from 'src/schema/ride.schema';
import { User, UserModel } from 'src/schema/user.schema';
import { UserService } from 'src/user/user.service';
import { APP_PIPE } from '@nestjs/core';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Ride.name, schema: RideModal },
            { name: User.name, schema: UserModel },
        ]),
    ],
    controllers: [RideController],
    providers: [RideService, UserService,
        {
            provide: APP_PIPE,
            useClass: ValidationPipe,
        },],
    exports: [RideService],
})
export class RideModule { }
