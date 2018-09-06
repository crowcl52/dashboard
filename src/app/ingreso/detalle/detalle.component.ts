import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Ingreso } from '../ingreso.model';
import { Subscription } from 'rxjs';
import { IngresoService } from '../ingreso.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit,OnDestroy {

  items:Ingreso[];
  subscription: Subscription = new Subscription();

  constructor( private store:Store<AppState>, private ingresoService:IngresoService ) { }

  ngOnInit() {
    this.subscription = this.store.select('ingreso').subscribe( items =>{
      this.items = items.items;
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  borrarItem(uid:string){
    this.ingresoService.borrarIngreso(uid);
  }

}
