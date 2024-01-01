let interval: NodeJS.Timeout;

onmessage = (message: MessageEvent<{ type: string }>) => {
    switch (message.data.type) {
        case 'start':
            start();
            break;
        case 'stop':
            finish();
            break;
    }
};

function start() {
    clearInterval(interval);
    interval = setInterval(() => {
        postMessage({ type: 'tick' });
    }, 1000);
}

function finish() {
    clearInterval(interval);
}
