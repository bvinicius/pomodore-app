export interface PomoCounter {
    start: () => void;
    stop: () => void;
    onTick: (callback: () => void) => void;
}
