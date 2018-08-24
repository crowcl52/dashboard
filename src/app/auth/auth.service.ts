import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

import * as FB from 'firebase';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private fireAuth:AngularFireAuth, private router: Router, private afDB:AngularFirestore ) { }

  initAuthListener(){
    this.fireAuth.authState.subscribe((fbUser: FB.User) =>{
      console.log(fbUser);
    })
  }

  crearUsuario( nombre: string,email: string,password: string ){

    this.fireAuth.auth.createUserWithEmailAndPassword(email,password).then( resp =>{
      // console.log(resp);
      const user: User = {
        uid:resp.user.uid,
        nombre: nombre,
        email: resp.user.email
      };

      this.afDB.doc(`${user.uid}/usuario`).set( user )
      .then( ()=> this.router.navigate(['/'])
      .catch( err => Swal('Error en el login', err.message, 'error')));

      
    }).catch(err =>{
      Swal('Error en el login', err.message, 'error');
    })
  }

  login(email:string ,password:string){
    this.fireAuth.auth.signInWithEmailAndPassword(email,password).then(resp =>{
      this.router.navigate(['/']);
    }).catch(err=>{
      Swal('Error en el login', err.message, 'error');
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
