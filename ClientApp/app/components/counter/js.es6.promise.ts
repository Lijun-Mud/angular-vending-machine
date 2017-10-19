import logger from "./js.common";

export default function (callback) {
    const log = (...messages) => logger(callback, messages);
    const thunk = (fn) => (...args) => (callback) => fn.call(this, ...args, callback);
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
    {
        let f = (a, cb) => cb(a);
        let ft = thunk(f)("thunk verify");
        let log = console.log.bind(console);
        ft(log);
    }
    {
        let fs = (filename, callback) => setTimeout(() => callback(null, { 'result': filename, 'time': Date.now() }), 10);
        let readFile = thunk(fs);
        let gen = function* () {
            let f1 = yield readFile("fa");
            console.log(f1);
            let f2 = yield readFile("fb");
            console.log(f2);
        }
        {
            //let g = gen();
            //let ret = g.next();
            //ret.value((error, data) => {
            //    if (error) throw error;
            //    let ret2 = g.next(data);
            //    ret2.value((error, data) => {
            //        if (error) throw error;
            //        g.next(data);
            //    });
            //});
        }
        {
            let run=function(gen) {
                let g = gen();
                function next(error=null,data=null) {
                    let result = g.next(data);
                    if (result.done) return result.value;
                    result.value(next);
                }

                next();
            }
            run(gen);
        }
    }
    {
        //let fs = (filename) => setTimeout(() => Promise.resolve({ result: filename }), 10);
        //let fs = (filename) => new Promise(resolved => setTimeout(() => resolved({ result: filename }), 10));
        let fs = (filename, callback) => setTimeout(() => callback(null, { 'result': filename,'time':Date.now() }), 10);
        let readFile = (filename) => new Promise((resovled, rejected) => {
            fs(filename,
                (error, data) => {
                    if (error) return rejected(error);
                    resovled(data);
                });
        });
        let gen=function*() {
            let f1 = yield readFile("f1");
            let f2 = yield readFile("f2");
            console.log(f1);
            console.log(f2);
        }
        {
            //let g = gen();
            //g.next().value.then((data) =>
            //    g.next(data).value.then((data) =>
            //        g.next(data)));
        }
        {
            let run = function(gen) {
                let g = gen();

                function next(data=null) {
                    let result = g.next(data);
                    if (result.done) return result.value;
                    result.value.then(data => next(data));
                };
                next();
            };
            run(gen);
        }
    }
} 
