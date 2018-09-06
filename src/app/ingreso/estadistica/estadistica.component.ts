import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingreso } from '../ingreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  ingresos: number;
  egresos: number;

  nIngresos: number;
  nEgresos: number;

  subscription : Subscription = new Subscription();

  public doughnutChartLabels:string[] = ['Egresos', 'Ingresos'];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';

  constructor( private store: Store<AppState> ) { }

  ngOnInit() {
    this.subscription = this.store.select('ingreso').subscribe(items =>{
      this.contarIngresoEgresos(items.items);
    });
  }

  contarIngresoEgresos(items: Ingreso[]){
    this.ingresos = 0;
    this.egresos = 0;

    this.nIngresos = 0;
    this.nEgresos = 0;

    items.forEach( item =>{
      if ( item.tipo == 'ingreso'){
        this.nIngresos++;
        this.ingresos += item.monto;
      }else{
        this.nEgresos++;
        this.egresos += item.monto;
      }
    });

    this.doughnutChartData = [this.egresos,this.ingresos]
  }


}
