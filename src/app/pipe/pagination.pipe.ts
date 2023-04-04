import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(value: any, ...args: any): any {

    if(!value)return null;
    if(!args)return value;

    let currentPage=args[0][0];
    let rowCount=args[0][1];
    if(currentPage>1)
    {
      let data=[];
      let deduct=rowCount * (currentPage-1);
      let length=deduct-1+rowCount>value.length?value.length:deduct-1+rowCount;
      for(let i=deduct-1;i<length;i++)
      {
        data.push(value[i]);
      }
      return data;
    }
    else 
    {
      return value;
    }
   

    
  }

}
