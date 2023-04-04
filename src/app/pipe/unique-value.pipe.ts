import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uniqueValue'
})
export class UniqueValuePipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if(!value)return null;

let data:any= new Set();
let result=[];
for (let x of value) {
  data.add(x.country);
}
result=[...data].sort();
  return result;
}

}
