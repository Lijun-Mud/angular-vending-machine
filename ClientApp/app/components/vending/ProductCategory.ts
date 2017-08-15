interface ProductCategory {
    name: string;
    getImageUrl(): string ;
}

const basePath = "/img/";

class SodaCategory implements ProductCategory {
    name="Soda";
    getImageUrl(): string { return basePath + "sodacan.png"; }
  }

class NutsCategory implements ProductCategory {
    name="Nuts";
    getImageUrl(): string { return basePath + "nuts.png"; }
}

class ChipsCategory implements ProductCategory {
    name="Potato Chips";
    getImageUrl(): string { return basePath + "chips.png";}
}

class CandyCategory implements ProductCategory{
    name="Candy";
    getImageUrl(): string { return basePath + "candy.png";}
}

class CandyBarCategory implements ProductCategory {
    name="Candy Bar";
    getImageUrl(): string { return basePath + "candybar.png"; }
}

export { ProductCategory, SodaCategory, NutsCategory, ChipsCategory, CandyCategory, CandyBarCategory }

