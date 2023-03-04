export enum KataLevel {
    BASIC = 'Basic',
    MEDIUM = 'Medium',
    HIGH = 'High',
}

export interface IKata {
    name: string;
    description: string;
    level: KataLevel;
    attempts: number;
    starts: number;
    creator: string;
    solution: string;
    participants: string[];
}
