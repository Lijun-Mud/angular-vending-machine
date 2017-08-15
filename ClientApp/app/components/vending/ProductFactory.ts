import * as products from './Products';
export default function getProduct(): products.Product {
    let random = Math.floor(Math.random() * 6);
    switch (random) {
    case 0:
        return new products.CocaCola();
    case 1:
        return new products.Fanta();  
    case 2:
        return new products.Mints();
    case 3:
        return new products.Peanuts();
    case 4:
        return new products.Plain();
    case 5:
        return new products.CandyBar();
    default:
        return new products.Sprite();
    }
}
