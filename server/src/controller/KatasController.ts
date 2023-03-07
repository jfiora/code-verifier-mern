import { IKataController } from './interfaces';
import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa';
import { LogSuccess, LogError, LogInfo } from '../utils/logger';

import {
    getAllKatas,
    getKataById,
    updateKata,
    deleteKataById,
    createKata,
} from '../domain/orm/Kata.orm';
import { IKata } from '../domain/interfaces/IKata.interface';

@Route('/api/katas')
@Tags('KatasController')
export class KatasController implements IKataController {
    /**
     * Enpoint to retrieve the katas or retrieve an specific katas by id
     * @param {number} page optional
     * @param {number} limit optional
     * @param {string} id optional
     * @returns All katas or kata by id
     */
    @Get('/')
    public async getKatas(
        @Query() page: number,
        @Query() limit: number,
        @Query() id?: string
    ): Promise<any> {
        let response: any = {};
        if (id) {
            LogSuccess(`[/api/katas/:id] Get Kata by ID: ${id}`);
            response = await getKataById(id);
        } else {
            LogSuccess('[/api/katas] Get All Katas Request');
            response = await getAllKatas(page, limit);
        }
        return response;
    }

    @Delete('/')
    /**
     * Endpoint to delete an kata
     * @param {string} id optional
     * @returns Deleted kata id
     */
    public async deleteKataById(@Query() id?: string): Promise<any> {
        let response: any = {};
        if (id) {
            LogSuccess(`[/api/katas/:id] Delete kata by ID: ${id}`);
            await deleteKataById(id).then(() => {
                response = {
                    message: `kata with id ${id} deleted successfully`,
                };
            });
        } else {
            LogError('[/api/katas] Delete kata by ID Request Without ID');
            response = {
                message: 'Invalid or non existing ID. Provide a correct one',
            };
        }
        return response;
    }

    @Post('/')
    public async createKata(kata: IKata): Promise<any> {
        let response: any = '';
        if (kata) {
            LogSuccess('[/api/katas] Register kata');
            await createKata(kata).then(() => {
                LogSuccess(`[/api/auth/register] Registering kata: ${kata}`);
                response = {
                    message: `kata registered successfully: ${kata.name}`,
                };
            });
        } else {
            LogError('[/api/katas] Register needs a kata entity');
            response = {
                message: 'Invalid kata',
            };
        }
        return response;
    }

    @Put('/')
    /**
     * Endpoint to update an kata
     */
    public async updateKata(
        @Query() id: string,
        @Query() kata: IKata
    ): Promise<any> {
        let response: any = {};
        if (id) {
            LogSuccess(`[/api/katas/:id] Updating kata by ID: ${id}`);
            await updateKata(id, kata).then(() => {
                response = {
                    message: `kata with id ${id} updated successfully`,
                };
            });
        } else {
            LogError('[/api/katas] Updating kata by ID Request Without ID');
            response = {
                message: 'Invalid or non existing ID. Provide a correct one',
            };
        }
        return response;
    }
}
