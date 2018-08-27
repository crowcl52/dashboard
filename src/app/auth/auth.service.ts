import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

import * as FB from 'firebase';
import { User } from './user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction,DesactivarLoadingAction } from '../shared/ui.actions';
import { SetUSerAction } from './auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription = new Subscription();

  constructor( private fireAuth:AngularFireAuth, 
               private router: Router, 
               private afDB:AngularFirestore,
               private store:Store<AppState> ) { }

  initAuthListener(){
    this.fireAuth.authState.subscribe((fbUser: FB.User) =>{
      if(fbUser){
        this.userSubscription = this.afDB.doc(`${fbUser.uid}/usuario`).valueChanges().subscribe( (user:any) =>{
          const newUser: User = new User(user);
          this.store.dispatch(new SetUSerAction(newUser));
        })
      } else{
        this.userSubscription.unsubscribe();
      }
    })
  }

  crearUsuario( nombre: string,email: string,password: string ){

    this.store.dispatch( new ActivarLoadingAction() );

    this.fireAuth.auth.createUserWithEmailAndPassword(email,password).then( resp =>{
      // console.log(resp);
      const user: User = {
        uid:resp.user.uid,
        nombre: nombre,
        email: resp.user.email
      };

      this.afDB.doc(`${user.uid}/usuario`).set( user ).then( () => {
        this.router.navigate(['/']);
        this.store.dispatch( new DesactivarLoadingAction() );
      });

      
    }).catch(err =>{
      Swal('Error en el login', err.message, 'error');
      this.store.dispatch( new DesactivarLoadingAction() );

    })
  }

  login(email:string ,password:string){
    this.store.dispatch( new ActivarLoadingAction() );
    this.fireAuth.auth.signInWithEmailAndPassword(email,password).then(resp =>{
      this.store.dispatch( new DesactivarLoadingAction() );
      this.router.navigate(['/']);
    }).catch(err=>{
      Swal('Error en el login', err.message, 'error');
      this.store.dispatch( new DesactivarLoadingAction() );
    })
  }

  logout(){
    this.router.navigate(['/login']);
    this.fireAuth.auth.signOut();
  }

  isAuth(){
    return this.fireAuth.authState.pipe(
      map( fbUser => {
        if( fbUser === null )
          this.router.navigate(['/login']);
        return fbUser != null
      })
    );
  }

}
