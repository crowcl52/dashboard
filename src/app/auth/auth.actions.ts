import { Action } from "@ngrx/store";
import { User } from "./user.model";



export const SET_USER = 'USER';
export const UNSET_USER = 'UNSETUSER';

export class SetUSerAction implements Action{
    readonly type = SET_USER;

    constructor( public user:User ){}
}

export class UnSetUSerAction implements Action{
    readonly type = UNSET_USER;
}

export type actions =   SetUSerAction | UnSetUSerAction;