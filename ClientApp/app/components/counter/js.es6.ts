let callbackLog:Function;
export default function (callback) {
    callbackLog = callback;

    testBlockScope();

    {
        let [a, b, c] = [1, 2, 3];
        let [foo, [[bar], baz]] = [11, [[22], 3]];;
        let [x, , y] = [1, 2, 3];
        let [head, ...tail] = [1, 2, 3, 54, 5];
        let [bar2, foo2 = "default"] = [1];
    }

    {
        let { bar: barz, foo } = { foo: "foo", bar: "bar" };
        let obj = {
            p: [
                'hello',
                { y: 'world' }
            ]
        };
        //let { p: [x, { y }] } = obj;
        let { toString: s } = 123;
        let result = [[1, 2], [3, 4]].map(([a, b]) => a + b);
        //move({x:3});
        //move({});
    }
    {
        let map = new Map();
        map.set("first", "hello");
        map.set("second", "world");
        map.forEach((k, v) => {
            console.log(k,v);
        });
        for (let [key, value] of map) {
            log(key," is " + value);
        }
    }

    {
        let my ="\u{20BB7}a".repeat(2);
        log(my, my.charCodeAt(0), my.charCodeAt(1), my.charAt(0), my.codePointAt(0), my.codePointAt(1), my.codePointAt(2));
        for (let m of my) {
            log(m);
        }
        log("length for 4-bytes",my.length,codePointLength(my));
    }

    {
        let sender = '<script>alert("hacker")</script>';
        let message = saferHTML`<p>${sender} has sent you a message.\t</p>`;
        log(message, String.raw`<p>${sender} has sent you a message.\n</p>`);
    }

    {
        let my = "\u{20BB7}";
        log("/^.$/", /^.$/.test(my), /^.$/u.test(my),
            "/^\u{3}/", /^\u{3}/.test('uuu'), /^u{3}/.test('uuu'));
    }

    {
        log(/\d+(?=%)/.exec("test 199% end"),0o11);
        //,/(?<=\$)\d+/.exec("test dollar $213 end")
    }
    {
        let arrayLike = {
            '0': 'a',
            '1': 'b',
            length: 2
        };
        let array1 = [].slice.call(arrayLike);
        let array2 = Array.from(arrayLike);
        log(array1, array2,
            Array.from({ length: 4 }, x => (x === undefined) + "\t" + typeof x));
        log("nan findindex", [NaN].findIndex(x => Object.is(NaN, x)));
        let emptyPositionArray = [,'a', 'b',];
        log("emptyPositionArray", emptyPositionArray, [...emptyPositionArray], Array.from(emptyPositionArray))
        let arr = [, ,];
        for (let i of arr) {
            console.log("for empty");
        }
        (fetch("url1"),fetch("url2", {method:"post"}));
    }
    {
        log([...[1, 2], ...['a']]);
        log(new Date(2015, 8, 8));
        const [first, ...rest] = [1, 2, 3, 4, 5, 6, 7];
        log("const [first, ...rest]", first, "@", rest);
    }

    {
        let str = 'x\uD83D\uDE80y';
        log("reverse unicode", str, "@", str.split('').reverse().join(''), "@", [...str].reverse().join(''));
        var go=function*() {
            yield 1;
            yield 2;
            yield 3;
        }
        log("generator go", [...go()]);
    }

    {
       //log(fibonacci(100), fibonacci(1000), fibonacci2(100), fibonacci2(1000));
        log(fibonacci2(100), fibonacci2(1000));

        const myfactorial = curring(factorial, 1);
        log(myfactorial(5));

        //log("Maximum call stack size exceeded",sum(1, 100000));
        var trampoline=function(f) {
            while (f && f instanceof Function) {
                f = f();
            }
            return f;
        }
        log("trampoline", trampoline(sum2(1, 100000)));

        var tco = function(f) {
            var value;
            var active = false;
            var accumulated = [];

            return function accumulator() {
                accumulated.push(arguments);
                if (!active) {
                    active = true;
                    while (accumulated.length) {
                        value = f.apply(this, accumulated.shift());
                    }
                    active = false;
                    return value;
                }
            };
        };
        var sum3 = tco(function(x, y) {
            if (y > 0) return sum3.call(null, x + 1, y - 1);
            return x;
        });
        log("tco", sum3.call(null,1, 100000));
    }

    {
        let myObject = Object.assign({}, new Object(), { myname: "self name" });
        Object.defineProperties(myObject,
            {
                property1: {
                    value: "pone",
                    enumerable: false,
                    writable: true
            }
            });
        let result = Reflect.ownKeys(myObject);
        console.log(result);

        let proto = {};
        let obj = { z: 30 };
        Object.setPrototypeOf(obj, proto);
        proto = Object.assign(proto, { x: 10, y: 20 });
        log(obj);

        let o = Object.create({ x: 1, y: 2 });
        o.z = 3;
        let {x, ...z} = o;
        log(x,z);
    }

    {
        const source = {
            set foo(value) {
                console.log(value);
            }
        };
        let target = Object.assign({}, source);
        console.log(Object.getOwnPropertyDescriptor(target, 'foo'));

        const target2 = Object.defineProperty({}, 'foo', Object.getOwnPropertyDescriptor(source, 'foo'));
        console.log(Object.getOwnPropertyDescriptor(target2, 'foo'));
    }

} 

var log = (...messages) => {
    let msgs = messages.map((x ="undefined") =>x);
    const message = msgs.join('\t');
    callbackLog(message);
    console.log(message);
}

function testBlockScope() {
    var tmp = new Date();
    function f() {
        log("testBlockScope",tmp===undefined);
        var t = 2;
        if (1==t) {
            var tmp = "hello world";
        }
    }
    f();
};
function move({x,y}={x:0,y:0}) {
    log([x,y]);
}

function saferHTML(templateData, ...rest) {
    let s = templateData[0];
    for (let i = 1; i <= rest.length; i++) {
        let arg = String(rest[i-1]);

        s += arg.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        s += templateData[i];
    }
    return s;
} 

function codePointLength(text) {
    let result = text.match(/[\s\S]/gu);
    return result ? result.length : 0;
}

function fetch(url, { method="get" }={}) {
    log("fetch:",method);
}

function factorial(n, total=1) {
    if (n === 1) return total;
    return factorial(n - 1, n * total);
}

function  curring(fn,...n) {
    return (...m) => fn(...[...m, ...n]);
}


function fibonacci(n) {
    if (n <= 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

function fibonacci2(n,ac1=1,ac2=1) {
    if (n <= 1) return ac2;
    return fibonacci2(n - 1, ac2, ac1 + ac2);
}

function sum(x,y) {
    if (y > 0) return sum(x + 1, y - 1);
    return x;
}

function sum2(x, y) {
    if (y > 0) return sum2.bind(null,x + 1, y - 1);
    return x;
}

//var xx = 1;
//function foofoo(xx:any, y=function() { xx = 2 }) {
//    var xx = 3;
//    y();
//    log("foofoo:",xx);
//}

//let xx = 1;
//function fff(yy = xx) {
//    debugger 
//    let xx = 22;
//    log(xx);
//}

//function f() { console.log("f from outside"); }

//(function () {
//    var t = 2;
//    if (1 == t) {
//        function f() { console.log("f from inside"); }
//    }
//    f();
//}());
