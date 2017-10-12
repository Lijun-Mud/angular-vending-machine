import { Component,OnInit } from '@angular/core';
//import runTest from "./js.prototype";
import runTest from "./js.inherit";

@Component({
    selector: 'counter',
    templateUrl: './counter.component.html',
    styles: [`
    .angular-with-newlines {
    white-space: pre-wrap;
    }`]
})
export class CounterComponent implements OnInit {
    public currentCount = 0;
    public message = "";
    private counter=0;

    ngOnInit(): void {
        runTest(this.log);
    }

    private log = (msg) => {
        this.message = this.message+ (++this.counter) +"\t" +msg+"\n";
    }

    public incrementCounter() {
        this.currentCount++;
    }
}
