let callbackLog:Function;
export default function (callback) {
    callbackLog = callback;
    {
        const source = {
            set foo(value) {
                console.log(value);
            }
        };
        let target = Object.assign({}, source);
        const target2 = Object.defineProperty({}, 'foo', Object.getOwnPropertyDescriptor(source, 'foo'));
        log(Object.getOwnPropertyDescriptor(target, 'foo'), "@@@", Object.getOwnPropertyDescriptor(target2, 'foo'));
    }
    {
        let sym1 = Symbol.for("symbol one");
        log("symbol one", sym1 === Symbol.for("symbol one"));

        let level = {
            DEBUG: Symbol("debug"),
            INFO: Symbol("info")
        };
    }

    {
        let obj = new Proxy({conter:0},
            {
                get:(target, key, receiver) => {
                    log(`getting ${key} `);
                    return Reflect.get(target, key, receiver);
                },
                set:(target, key, value, receiver) => {
                    log(`setting ${key} `);
                    return Reflect.set(target, key,value, receiver);
                }
            });
        obj.conter = 1;
        ++obj.conter;
        //Object.defineProperties(obj,
        //    {
        //        count: {
        //            value: 1,
        //            enumerable: true,
        //            writable:true
        //        }
        //    });
        //obj["count"] = 1;
        //obj["count"]++;
    }
    {
        let double = n => n * 2;
        let pow = n => n * n;
        let reverseInt = n => n.toString().split('').reverse().join("") | 0;
        let funcs = { double, pow, reverseInt };
        var pipe = (function() {
            return function(value) {
                var funcStack = [];
                var oproxy = new Proxy({},
                    {
                        get:function(pipeObject, fnName) {
                            if (fnName === "get") {
                                return funcStack.reduce(function(val, fn) {
                                    return fn(val);
                                },value);
                            }
                            funcStack.push(funcs[fnName]);
                            return oproxy;
                        }
                    });
                return oproxy;
            }
        }());
        log("pipe with proxy",pipe(3).double.pow.reverseInt.get);
    }
    {
        let p = new Proxy({},
            {
                preventExtensions:(target) => {
                    log("preventExtensions for proxy called");
                    Object.preventExtensions(target);
                    return true;
                }
            });
        log("Object.preventExtensions(p)",Object.preventExtensions(p));
    }
    {
        let a = new Set([1, 2, 3]);
        let b = new Set([4,  3, 2]);
        let union = new Set([...a, ...b]);
        let intersect = new Set([...a].filter(x => b.has(x)));
        let difference = new Set([...a].filter(x => !b.has(x)));
        log(union, intersect, difference);
    }
} 

var getObjectInfo = (obj) => {
    if (typeof obj !== "object") return obj;
    //if (obj instanceof Array || obj instanceof Set) return [...obj];
    if (obj.constructor=== Array || obj.constructor=== Set) return [...obj];
    var msg = "";
    for (let i in obj) {
        msg += "\t" + i + " : " + obj[i];
    }
    return msg;
}

var log = (...messages) => {
    let msgs = messages.map((x = "undefined") => {
        console.log(x);
        return getObjectInfo(x);
    });
    const message = msgs.map(x=>x.toString()).join('\t');
    callbackLog(message);
}


