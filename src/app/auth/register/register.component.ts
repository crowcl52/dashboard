import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor( public auth:AuthService, public store: Store<AppState> ) { }

  loading: boolean = false;
  subscription: Subscription;

  ngOnInit() {
   this.subscription = this.store.select('ui').subscribe(ui =>{
     this.loading = ui.isLoading;
    })
  }

  onSubmit( data ){
    this.auth.crearUsuario(data.nombre,data.mail,data.password);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
