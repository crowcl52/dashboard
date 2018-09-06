import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Ingreso } from './ingreso.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction } from './ingreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {

  private ingresoListenerSusciption: Subscription = new Subscription();
  private ingresoItemsSusciption: Subscription = new Subscription();

  constructor( private afDB: AngularFirestore, private auth:AuthService, private store:Store<AppState> ) { }

  crearIngreso( ingreso: Ingreso ){
    const user = this.auth.getUSer();
    return this.afDB.doc(`${user.uid}/ingreso`).collection('items').add({...ingreso});
  }

  initIngresoListener(){
    this.ingresoListenerSusciption = this.store.select('auth').pipe(
      filter( auth => auth.user != null)
    )
    .subscribe(auth =>{
      this.ingresoItems(auth.user.uid);
    })
  }

  private ingresoItems(uid: string){
    this.ingresoItemsSusciption = this.afDB.collection(`${ uid }/ingreso/items`)
    .snapshotChanges()
    .pipe(
      map( docData=>{
        return docData.map( doc =>{
          return {
            uid: doc.payload.doc.id,
            ...doc.payload.doc.data()
          };
        });
      })
    )
    .subscribe( (docData: any[]) =>{
      this.store.dispatch(new SetItemsAction(docData))
    })
  }

  borrarIngreso(uid: string){
    const user = this.auth.getUSer();
    return this.afDB.doc(`${user.uid}/ingreso/items/${uid}`).delete();
  }

  cancelarSubscriptions(){
    this.ingresoItemsSusciption.unsubscribe();
    this.ingresoListenerSusciption.unsubscribe();
  }

}
