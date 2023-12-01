export interface PomoSettings {
    workSessionLength: number;
    breakSessionLength: number;
    sessions: number;
}

export interface PomoSession {
    type: PomoSessionType;
    minutes: number;
}

export enum PomoSessionType {
    WORK = 'WORK',
    BREAK = 'BREAK'
}
