import { PomoCounter } from '@/domain/PomoCounter';

export class PomoCounterInstance implements PomoCounter {
    constructor(private worker: Worker) {}

    start() {
        this.worker.postMessage({ type: 'start' });
    }

    stop() {
        this.worker.postMessage({ type: 'stop' });
    }

    onTick(callback: () => void) {
        this.worker.onmessage = (message) => {
            if (message.data.type === 'tick') {
                callback();
            }
        };
    }
}
