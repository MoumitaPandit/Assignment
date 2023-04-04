import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'roundUp'})
export class RoundUpPipe implements PipeTransform {
  /**
   *
   * @param value - some number
  
   */
  transform(value: number): number {
      
      return Math.ceil(value);
  }
}
