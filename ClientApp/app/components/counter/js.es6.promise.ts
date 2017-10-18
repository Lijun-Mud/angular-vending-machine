import logger from "./js.common";

export default function (callback) {
    const log = (...messages) => logger(callback, messages);
    {
        let promise = new Promise((resolve, reject) => {
            log("promise");
            resolve();
        });
        promise.then(resolve => log("resolved"));
        log("after promise then");
    }
    {
        let second = Promise.resolve().then(() => console.log("second"));
        setTimeout(() => console.log("third"), 0);
        console.log("first");
    }
} 
