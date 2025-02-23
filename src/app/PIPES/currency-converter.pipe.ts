import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyConverter',
  standalone: true
})
export class CurrencyConverterPipe implements PipeTransform {
  private exchangeRate = 2.74;

  transform(value: any, ...args: any[]): any {
    if (typeof value !== 'number' || isNaN(value)) {
      return value; 
    }
    return "₾" + (value * this.exchangeRate).toFixed(2); 
  }
}
