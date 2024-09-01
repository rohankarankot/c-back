import { BadRequestException, Injectable, NotAcceptableException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schema/user.schema";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly User: Model<User>,
    ) { }

    async getProfile(request) {
        const userId = request.user.id;
        const user = await this.User.findById(userId);

        return user;
    }


    async updateProfile(body: any, user: User) {
        try {
            const existingUser = await this.User.findOne({
                email: body.email,
            });

            if (!existingUser) {
                throw new BadRequestException('User not found');
            }

            if (!existingUser._id.equals(user._id)) {
                throw new NotAcceptableException(
                    'This email is associated with another user, please use a new email',
                );
            }

            const updateObject: Partial<User> = {};

            if (body?.firstName && body.firstName !== existingUser.firstName) {
                updateObject.firstName = body.firstName;
            }

            if (body?.lastName && body.lastName !== existingUser.lastName) {
                updateObject.lastName = body.lastName;
            }
            if (body?.DOB && body.DOB !== existingUser.DOB) {
                updateObject.DOB = body.DOB;
            }
            if (body?.mobile && body.mobile !== existingUser?.mobile) {
                updateObject.mobile = body.mobile;
            }
            if (body?.gender && body.gender !== existingUser?.gender) {
                updateObject.gender = body.gender;
            }

            // Only proceed with update if there's something to update
            if (Object.keys(updateObject).length > 0) {
                const updatedUser = await this.User.findByIdAndUpdate(
                    existingUser._id,
                    updateObject,
                    {
                        new: true,
                    },
                );

                if (!updatedUser) {
                    throw new BadRequestException('User update failed');
                }

                return updatedUser;
            } else {
                return existingUser; // No changes, return the existing user
            }
        } catch (error) {
            console.error('Error updating user profile:', error);
            throw error;
        }
    }
}
