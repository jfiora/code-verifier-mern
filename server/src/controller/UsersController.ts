import { Get, Route, Tags, Query, Delete, Post, Put } from 'tsoa';
import { IUserController } from './interfaces';
import { LogSuccess, LogError } from '../utils/logger';

import {
    getAllUsers,
    getUserById,
    deleteUserById,
    createUser,
    updateUser,
} from '../domain/orm/User.orm';

@Route('/api/users')
@Tags('UserController')
export class UserController implements IUserController {
    /**
     * Enpoint to retrieve the Users or retrieve an specific user by id
     * @param {string} id optional
     * @returns All Users or user by id
     */
    @Get('/')
    public async getUsers(@Query() id?: string): Promise<any> {
        let response: any = {};
        if (id) {
            LogSuccess(`[/api/users/:id] Get User by ID: ${id}`);
            response = await getUserById(id);
        } else {
            LogSuccess('[/api/users] Get All Users Request');
            response = await getAllUsers();
        }
        return response;
    }

    @Delete('/')
    /**
     * Endpoint to delete an user
     * @param {string} id optional
     * @returns Deleted user id
     */
    public async deleteUserById(@Query() id?: string): Promise<any> {
        let response: any = {};
        if (id) {
            LogSuccess(`[/api/users/:id] Delete User by ID: ${id}`);
            await deleteUserById(id).then(() => {
                response = {
                    message: `User with id ${id} deleted successfully`,
                };
            });
        } else {
            LogError('[/api/users] Delete User by ID Request Without ID');
            response = {
                message: 'Invalid or non existing ID. Provide a correct one',
            };
        }
        return response;
    }

    @Post('/')
    /**
     * Endpoint to create an user
     * @param {user} user
     * @returns Created user
     */
    public async createUser(@Query() user?: any): Promise<any> {
        let response: any = {};

        await createUser(user).then(() => {
            LogSuccess(`[/api/users] Creating User: ${user}`);
            response = {
                message: `User created successfully: ${user.name}`,
            };
        });

        return response;
    }

    @Put('/')
    /**
     * Endpoint to update an user
     */
    public async updateUser(
        @Query() id: string,
        @Query() user: any
    ): Promise<any> {
        let response: any = {};
        if (id) {
            LogSuccess(`[/api/users/:id] Updating User by ID: ${id}`);
            await updateUser(id, user).then(() => {
                response = {
                    message: `User with id ${id} updated successfully`,
                };
            });
        } else {
            LogError('[/api/users] Updating User by ID Request Without ID');
            response = {
                message: 'Invalid or non existing ID. Provide a correct one',
            };
        }
        return response;
    }
}
