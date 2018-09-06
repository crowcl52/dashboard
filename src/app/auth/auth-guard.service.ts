import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor( public auth:AuthService ) { }

  canActivate(){
    return this.auth.isAuth();
  }

  canLoad(){
    return this.auth.isAuth().pipe(
      take(1)
    );
  }

}
