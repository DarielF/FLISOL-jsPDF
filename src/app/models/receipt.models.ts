export class Receipt {
    constructor(data: any) {
      this.cashier = new Cashier(data.cashier);
      this.total = data.total;
      this.date = new Date(data.date);
      this.items = data.items.map((item: any) => new Product(item));
      this.storeDetails = new Store(data.storeDetails);
    }
  
    cashier: Cashier;
    total: number;
    date: Date;
    items: Product[];
    storeDetails: Store;
  }
  
  export class Product {
    constructor(data: any) {
      this.name = data.name;
      this.qty = data.qty;
      this.code = data.code;
      this.price = data.price;
      this.currency = new Currency(data.currency);
    }
  
    name: string;
    qty: number;
    code: string;
    price: number;
    currency: Currency;
  }
  
  export class Currency {
    constructor(data: any) {
      this.name = data.name;
      this.symbol = data.symbol;
      this.short = data.short;
      this.rate = data.rate;
    }
  
    name: string;
    symbol: string;
    short: string;
    rate: number;
  }
  
  export class Store {
    constructor(data: any) {
      this.name = data.name;
      this.location = data.location;
      this.phone = data.phone;
    }
  
    name: string;
    location: string;
    phone: string;
  }
  
  export class Cashier {
    constructor(data: any) {
      this.name = data.name;
      this.id = data.id;
    }
  
    name: string;
    id: string;
  }
  