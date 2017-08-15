import * as categories from './ProductCategory';
//import { ProductCategory, SodaCategory, NutsCategory, ChipsCategory, CandyCategory, CandyBarCategory} from './ProductCategory';

export interface Product {
    name: string;
    price: number;
    category?:categories.ProductCategory;
}

export class Initial implements Product {
    name="Please select a proudct";
    price=0;
}

export class CocaCola implements Product {
    name = "Coca-Cola";
    price = 2.3;
    category =new categories.SodaCategory();
}

export class Sprite implements Product {
    name = "Sprite";
    price = 1.9;
    category = new categories.SodaCategory();
}

export class Fanta implements Product {
    name = "Fanta";
    price = 1.8;
    category = new categories.SodaCategory();
}

export class Peanuts implements Product {
    name = "Peanuts";
    price = 1.5;
    category = new categories.NutsCategory();
}

export class Plain implements Product {
    name = "Plain";
    price = 0.6;
    category = new categories.ChipsCategory();
}

export class Mints implements Product {
    name = "Mints";
    price = 1.3;
    category = new categories.CandyCategory();
}

export class CandyBar implements Product {
    name = "CandyBar";
    price = 2;
    category = new categories.CandyBarCategory();
}