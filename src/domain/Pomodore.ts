export interface PomoSettings {
    workSessionLength: number;
    breakSessionLength: number;
    sessions: number;
}

export interface PomoSession {
    type: PomoSessionType;
    minutes: number;
}

export interface PomoSessionState {
    current: PomoSessionType;
    timeLeft: number;
    isOver: boolean;
}

export enum PomoSessionType {
    WORK = 'WORK',
    BREAK = 'BREAK'
}
