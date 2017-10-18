import logger from "./js.common";

export default function (callback) {
    const log = (...messages) => logger(callback, messages);
    {
        let f = function* () {
            for (let i = 0; true; i++) {
                let reset = yield i;
                if (reset) i = -1;
            }
        }
        let g = f();
        log(g.next(), g.next(), g.next(true));

        let dataConsumer = function* () {
            console.log("started");
            console.log(`1. ${yield}`);
            console.log(`2. ${yield}`);
            return "result";
        }
        let gen = dataConsumer();
        gen.next();
        gen.next("a");
        gen.next("b");
        //for (let l of dataConsumer()) {
        //    console.log(l);
        //}
    }
    {
        let arr = [1, 2, [[3, 4], 5], [6, 7]];
        let flat = function*(a) {
            let length = a.length;
            for (let i = 0; i < length; i++) {
                let current = a[i];
                if (typeof current === 'number') {
                    yield current;
                } else {
                    yield *flat(current);
                }
            }
        };
        
        let [...result] = flat(arr);
        log("flat for generator", result);
        for (let l of flat(arr)) {
            console.log(l);
        }
    }
    {
        let gen=function*() {
            console.warn(`my first next for:${yield}`);
            return "done";
        }
        let wrapper = (genFunc) => ((...args) => {
            let genObject = genFunc(...args);
            genObject.next();
            return genObject;
        });
        //const wrapped = () => wrapper(gen);
        const wrapped = wrapper(function*() {
            console.warn(`my first next for:${yield}`);
            return "done";
        });
        log("wrapped for first next",wrapped().next("world"));
    }
    {
        let gen = function*() {
            try {
                yield console.log("a0");
            } catch (e) {
                let ret = e;
            }
            yield console.log("a1");
            yield console.log("a2");
        };
        var g = gen();
        g.next();
        g.throw();
        g.next();
    }
} 
