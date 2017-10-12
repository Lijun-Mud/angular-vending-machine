let callbackLog:Function;
export default function (callback) {
    callbackLog = callback;
    {
        let my = new Triangle(5, 10);
        log("Triangle",my.getArea(),my.toString(),my.constructor);
    }
} 

var log = (...messages) => {
    const message = messages.join('\t');
    callbackLog(message);
    console.log(message);
}

function Shape() {
    this.name = "shape";
    this.toString=function() {
        return this.name;
    }
}

function TwoDShape() {
    this.name = "2D shape";
}

function Triangle(side, height) {
    this.name = "triangle";
    this.side = side;
    this.height = height;
    this.getArea=function() {
        return this.side * this.height / 2;
    }
}

TwoDShape.prototype = new Shape();
TwoDShape.prototype.constructor = TwoDShape;
Triangle.prototype = new TwoDShape();
Triangle.prototype.constructor= Triangle;
