import { Component } from '@angular/core'
//import {ICoin,Dollar} from './Coin';
import * as Coins from './Coin';
import * as products from './Products';
import getProduct from './ProductFactory';

@Component({
    selector: 'vending-machine',
    styleUrls:['./machine.component.css'],
    templateUrl: './machine.component.html'
})

export class MachineComponent {
    public paid = 0;
    public acceptedCoins: Array<Coins.ICoin> = [new Coins.Dime(), new Coins.Quarter(), new Coins.Half(), new Coins.Dollar()];
    public selectedCell = new Cell(new products.Initial());
    public cells=[];

    public acceptCoin = (coin: Coins.ICoin) => {
        console.log(coin.value);
        this.paid += coin.value;
    }

    constructor() { 
        let soda: products.Product = new products.CocaCola();
        console.log(soda.name+soda.category.getImageUrl());
        //let coin = new Dollar();
        //console.log(coin.value+coin.getImageUrl());
        this.size = VendingMachineSize.Large;
    }

    selected=(cell: Cell) => {
        this.selectedCell = cell;
        console.log("selected "+cell.product.name);
    }
    canPay=():boolean => {
        return this.selectedCell != null &&
            this.selectedCell.product.price > 0 &&
            this.selectedCell.product.price <= this.paid;
    }

    pay=() => {
        let cell = this.selectedCell;
        if (cell.stock < 1) {
            alert("out of stock");
            return;
        }
        this.paid =Math.round(this.paid - cell.product.price);
        cell.stock = cell.stock - 1;
        cell.sold = true;
    }

    set size(size: VendingMachineSize) {
        this.cells = [];
        for (let i = 0; i < size; i++) {
            this.cells.push(new Cell(getProduct()));
        }
    }
}

enum VendingMachineSize {
    Small = 6,
    Medium = 9,
    Large = 12
}

class Cell {
    constructor(public product: products.Product) {

    }
    public stock = 3;
    public sold = false;
}