import { Component } from '@angular/core';
import testObject from "./js.object";

@Component({
    selector: 'counter',
    templateUrl: './counter.component.html'
})
export class CounterComponent {
    public currentCount = 0;

    public incrementCounter() {
        this.currentCount++;
    }
    constructor() {
        testObject();
    }
}
