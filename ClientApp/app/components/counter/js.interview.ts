import logger from "./js.common";
export default function (callback) {
    const log = (...messages) => logger(callback, messages);
    {
        var foo = 10 + '20';
        log(foo);;
        var add = (x, y) => x + y;
        var add2 = (x) => {
            return function(y) {
                return x + y;
            }
        };
        var add3 = (x) => (y) => x + y;
        log(add(2, 5), add2(2)(5), add3(2)(5));

        let str = `i'm a lasagna hog`;
        log(str.split("").reverse().join(""));

        //global["foo"] = "aaa";
        //let ret1 = global["foo"] || global["foo"]="bar");
    }
    {
        let foo = "hello";
        (function() {
            var bar = " world";
            log(foo + bar);
        })();
        //log(foo + bar);
    }
    {
        let foo = [];
        foo.push(1);
        foo.push(2);
        log(foo.length);
    }
    {
        let foo = { n: 1 };
        let bar = foo;
        foo["x"] = foo = { n: 2 };
        log(foo,"@",bar);
    }
    {
        console.log('one');
        setTimeout(function () {
            console.warn('two');
        }, 0);
        console.log('three');
    }
    {
        console.time("array timer");
        let arr = new Array(100);
        for (let i = 0; i < arr.length; i++) {
            arr[i] = new Object();
        }
        console.timeEnd("array timer");
    }
} 
