import { kataEntity } from '../entities/Kata.entity';

import { LogError } from '../../utils/logger';
import { IKata } from '../interfaces/IKata.interface';

/**
 * Method to obtain all Katas from Collection Katas
 */
export const getAllKatas = async (
    page: number,
    limit: number
): Promise<any | undefined> => {
    try {
        let kataModel = kataEntity();

        let response: any = {
            katas: [],
            totalPages: 1,
            currentPage: page,
        };
        await kataModel
            .find({ isDeleted: false })
            .select('name email age')
            .limit(limit)
            .skip((page - 1) * limit)
            .exec()
            .then((katas: IKata[]) => {
                response.katas = katas;
            });

        await kataModel.countDocuments().then((total: number) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });

        return response;
    } catch (error) {
        LogError(`[ORM Error]: Getting All Katas: ${error}`);
    }
};

export const getKataById = async (id: string): Promise<any | undefined> => {
    try {
        let kataModel = kataEntity();
        return await kataModel.findById(id).select('name email age');
    } catch (error) {
        LogError(`[ORM Error]: Getting Kata by ID: ${error}`);
    }
};

export const deleteKataById = async (id: string): Promise<any | undefined> => {
    try {
        let kataModel = kataEntity();
        return await kataModel.deleteOne({ _id: id });
    } catch (error) {
        LogError(`[ORM Error]: Deleting Kata by ID: ${error}`);
    }
};

export const createKata = async (kata: IKata): Promise<any | undefined> => {
    try {
        let kataModel = kataEntity();
        return await kataModel.create(kata);
    } catch (error) {
        LogError(`[ORM Error]: Couldn't create Kata: ${error}`);
    }
};

export const updateKata = async (id: string, kata: any) => {
    try {
        let kataModel = kataEntity();
        return await kataModel.findByIdAndUpdate(id, kata);
    } catch (error) {
        LogError(`[ORM Error]: Couldn't update Kata ${id}: ${error}`);
    }
};
