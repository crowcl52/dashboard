import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../auth/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoService } from '../../ingreso/ingreso.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  
  user:any;
  subscription: Subscription = new Subscription();

  constructor( private auth:AuthService,private store: Store<AppState>, private ingresoService: IngresoService ) { }

  ngOnInit() {
    this.subscription = this.store.select('auth')
    .pipe(
      filter( auth => auth.user != null)
    ).subscribe( auth=>{
      this.user = auth.user.nombre;
    } )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  logout(){
    this.auth.logout();
    this.ingresoService.cancelarSubscriptions();
  }

}
