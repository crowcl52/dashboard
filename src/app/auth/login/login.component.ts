import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor( private auth:AuthService, public store: Store<AppState> ) { }

  loading: boolean = false;
  subscription: Subscription = new Subscription();

  ngOnInit() {
    this.subscription = this.store.select('ui').subscribe(
      data=>{
        this.loading = data.isLoading;
      }
    )
  }

  onSubmit(data){
    this.auth.login(data.email,data.password);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
