let callbackLog:Function;
export default function (callback) {
    callbackLog = callback;
    {
        let my = new Triangle(5, 10);
        log("Triangle",my.getArea(),my.toString());
    }
} 

var log = (...messages) => {
    const message = messages.join('\t');
    callbackLog(message);
    console.log(message);
}

function Shape() { }
Shape.prototype.name = "shape";
Shape.prototype.toString = function () {
    let result = [];
    //if (this.constructor.uber) {
    //    result[result.length] = this.constructor.uber.toString();
    //}
    if (this.uber) {
        result[result.length] = this.uber.toString();
    }
    result[result.length] = this.name;
    return result.join(', ');
};

function TwoDShape() {
    //this.constructor.uber = Shape.prototype;
};
var F = function () { };
F.prototype = Shape.prototype;
TwoDShape.prototype = new F();
TwoDShape.prototype.constructor = TwoDShape;
TwoDShape.prototype.uber = Shape.prototype;
TwoDShape.prototype.name= "2D shape";

function Triangle(side, height) {
    //this.constructor.uber = TwoDShape.prototype;
    this.side = side;
    this.height = height;
}
var F = function () { };
F.prototype = TwoDShape.prototype;
Triangle.prototype = new F();
Triangle.prototype.constructor = Triangle;
Triangle.prototype.uber = TwoDShape.prototype;
Triangle.prototype.name = "triangle";

Triangle.prototype.getArea = function() {
    return this.side * this.height / 2;
};
