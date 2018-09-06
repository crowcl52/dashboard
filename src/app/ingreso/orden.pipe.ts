import { Pipe, PipeTransform } from '@angular/core';
import { Ingreso } from './ingreso.model';

@Pipe({
  name: 'orden'
})
export class OrdenPipe implements PipeTransform {

  transform(items: Ingreso[] ): Ingreso[] {
    return items.sort( (a) =>{
      if(a.tipo == 'ingreso'){
        return -1;
      }else{
        return 1;
      }
    });
  }

}
