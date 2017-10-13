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
    }

    {
        let sender = '<script>alert("hacker")</script>';
        let message = saferHTML`<p>${sender} has sent you a message.s</p>`;
        log(message);
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
}

function move({x,y}={x:0,y:0}) {
    log([x,y]);
}

function saferHTML(templateData,...rest) {
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

//function f() { console.log("f from outside"); }

//(function () {
//    var t = 2;
//    if (1 == t) {
//        function f() { console.log("f from inside"); }
//    }
//    f();
//}());
