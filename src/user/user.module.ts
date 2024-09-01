// user/user.module.ts

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { User, UserModel } from 'src/schema/user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserModel }]),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule { }
