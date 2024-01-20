export interface PomoSettings {
    workSessionLength: number;
    breakSessionLength: number;
}

export interface PomoSessionState {
    id: number;
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
    WORK = 'Work',
    BREAK = 'Break'
}
