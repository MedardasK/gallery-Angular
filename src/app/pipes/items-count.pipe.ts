import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'itemsCount'
})
export class ItemsCountPipe implements PipeTransform {

  transform(value: number): string {
    if (value < 10 ) {
      return 'less than 10';
    } else if (value >= 10 && value < 20) {
      return '10+';
    } else if (value >= 20 && value < 30) {
      return '20+';
    } else if (value >= 30 && value < 40) {
      return '30+';
    } else {
      return value + '';
    }
  }
}
