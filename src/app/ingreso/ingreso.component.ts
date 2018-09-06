import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ingreso } from './ingreso.model';
import { IngresoService } from './ingreso.service';
import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';


@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styles: []
})
export class IngresoComponent implements OnInit, OnDestroy {

  forma: FormGroup;
  tipo = 'ingreso';
  loadingSubs: Subscription = new Subscription();
  cargando: boolean;

  constructor( public ingresoService: IngresoService,  private store:Store<AppState> ) { }

  ngOnInit() {

    this.store.select('ui').subscribe(ui =>{
      this.cargando = ui.isLoading;
    });

    this.forma = new FormGroup({ 
      'descripcion': new FormControl('',Validators.required),
      'monto': new FormControl(1, Validators.min(1))
    })
  }

  ngOnDestroy(){
    this.loadingSubs.unsubscribe();
  }

  crearIngreso(){
    this.store.dispatch( new ActivarLoadingAction());
    const ingreso = new Ingreso({...this.forma.value, tipo: this.tipo});

    this.ingresoService.crearIngreso(ingreso).then( ()=>{
    this.store.dispatch( new DesactivarLoadingAction());
      Swal('Creado',ingreso.descripcion, 'success');
      this.forma.reset({ monto:1});
    })
    
  }

}
