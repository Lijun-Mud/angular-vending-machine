import { Component,OnInit } from '@angular/core';
import testObject from "./js.object";

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
        testObject(this.log);
    }

    private log = (msg) => {
        this.message = this.message+ (++this.counter) +"\t" +msg+"\n";
    }

    public incrementCounter() {
        this.currentCount++;
    }
}
