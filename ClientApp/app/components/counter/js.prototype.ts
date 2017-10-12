let callbackLog:Function;
export default function (callback) {
   callbackLog = callback;
   log("foo @@@", foo.length, foo.prototype, foo.constructor);

    {
        let gadget = new Gadget("webcam", "black");
        log("Gadget @@@", gadget.whatAreYou(), gadget.getInfo(), gadget.constructor);
        log(gadget.constructor.prototype, "@", gadget.rating);
        log(gadget.constructor.prototype.constructor, "@", gadget.constructor.prototype.constructor.prototype);
        log(gadget.constructor.prototype.constructor.prototype.constructor.prototype);
        log("gadget.constructor.prototype.constructor.propertyIsEnumerable",
            gadget.constructor.prototype.constructor.propertyIsEnumerable('price'));
    }
    {
        Gadget.prototype.name = "new name";
        let gadget = new Gadget("old name for Gadget", "black");
        log("prototype.name  @@@", gadget.name);
        delete gadget.name;
        log("prototype.name after delete  @@@", gadget.name);
        gadget.name = "self name";
        //for (let i in gadget) {
        //    log("IsEnumerable",gadget.propertyIsEnumerable(i), "hasOwnProperty", gadget.hasOwnProperty(i), i, gadget[i]);
        //}

        log(gadget.__proto__);
    }

    {
        //String.prototype.reverse=function() {
        //    Array.prototype.reverse.apply(this.split('')).join('');
        //}
        //log("I'm from China".reverse());
    }
} 

var log = (...messages) => {
    const message = messages.join('\t');
    callbackLog(message);
    console.log(message);
}

function foo(a, b) { return a * b }

function Gadget(name, color) {
    this.name = name;
    this.color = color;
    this.whatAreYou = () => {
        return `I am a ${this.name} ${this.color}`;
    }
}

Gadget.prototype = {
    price: 100,
    rating: 3,
    getInfo: function () {
        return `Rating: ${this.price} price: ${this.rating}`;
    }
};
Gadget.prototype.constructor = Gadget;
