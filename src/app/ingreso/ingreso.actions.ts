import { Action } from "@ngrx/store";
import { Ingreso } from "./ingreso.model";


export const SET_ITEMS = 'Set Items';
export const UNSET_ITEMS = 'Unset Items';

export class SetItemsAction implements Action{
    readonly type = SET_ITEMS;

    constructor( public items:Ingreso[] ){}
}

export class UnSetItemsAction implements Action{
    readonly type = UNSET_ITEMS;

}

export type acciones = SetItemsAction | UnSetItemsAction;