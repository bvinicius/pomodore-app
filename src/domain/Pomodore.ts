export interface PomoSettings {
    workSessionLength: number;
    breakSessionLength: number;
    sessions: number;
}

export interface PomoSessionState {
    current: PomoSessionType;
    timeLeft: number;
    isOver: boolean;
    started: boolean;
    paused: boolean;
}

export interface PomoSession {
    type: PomoSessionType;
    minutes: number;
}

export enum PomoSessionType {
    WORK = 'WORK',
    BREAK = 'BREAK'
}
