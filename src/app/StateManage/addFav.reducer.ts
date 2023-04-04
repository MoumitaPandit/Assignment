import {createReducer, on, Action} from '@ngrx/store';
import { addItem,removeItem } from './addFav.action';

export const initialState:any=[];

export const counterReducer=
createReducer(
    initialState,
    on(addItem, (state,)=>initialState.push(state)
    )
);