
import * as fromIngreso from './ingreso.actions';
import { Ingreso } from './ingreso.model';

export interface IngresoState {
    items: Ingreso[];
}

const estadoInicial: IngresoState = {
    items: []
};

export function ingresoReducer( state = estadoInicial, action:fromIngreso.acciones): IngresoState{

    switch( action.type){
        case fromIngreso.SET_ITEMS:
            return {
                items:[
                    ...action.items.map( item =>{
                        return {...item};
                    })
                ]
            };
        case fromIngreso.UNSET_ITEMS:
            return {
                items : []
            }
        default:
            return state;
    }
}