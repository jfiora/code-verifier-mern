import { IKataController } from './interfaces';
import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa';
import { LogSuccess, LogError, LogInfo } from 'src/utils/logger';

import {
    getAllKatas,
    getKataById,
    updateKata,
    deleteKataById,
    createKata,
} from 'src/domain/orm/Kata.orm';
