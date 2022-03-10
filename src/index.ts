interface StockOptions {
    date: Date;
    price: number;
}

interface ProfitObject {
    profit: number;
    annualizedReturn: string;
}

class PortfolioSimple {
    _stocks: StockOptions[] = [];
    constructor() {
            this._stocks = [{
          date: new Date("2019-09-31"),
          price: 10
      },
      {
          date: new Date("2020-09-31"),
          price: 20
      }];
    }
    //esto lo puse acá ya que me hacia más sentido que dentro de una clase Stock, ya que cada Stock debiese ser conciente de si mismo y no de los otros stocks.
    priceByDate(date: Date): number {
      return this._stocks.find(stock => stock.date.getTime() === date.getTime()).price;
    }
    
     profit(dateFrom: Date, dateTo: Date): ProfitObject {
         const initialPrice = this.priceByDate(dateFrom);
         const terminalPrice = this.priceByDate(dateTo);
         const profit = terminalPrice - initialPrice;
         const periodReturn = profit / initialPrice;
         return {
             profit,
             annualizedReturn: this.calcAnnualizedReturn(dateFrom, dateTo, periodReturn)
         };
     }

     calcAnnualizedReturn(dateFrom: Date, dateTo: Date, periodReturn: number): string {
        const periodInDays = this.calcPeriodInDays(dateFrom, dateTo);
        const numbeOfYears = (365/ periodInDays);
        return ((1 + periodReturn)**(numbeOfYears) - 1).toFixed(5);
     }

     calcPeriodInDays(dateFrom: Date, dateTo: Date): number{
        const diff = dateTo.getTime() - dateFrom.getTime();
        return Math.round(diff / (1000 * 60 * 60 * 24));
     }
  }
  
  const portfolio = new PortfolioSimple();
  console.log(portfolio.profit(new Date("2019-09-31"), new Date("2020-09-31")));