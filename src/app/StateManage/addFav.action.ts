import {createAction,props} from '@ngrx/store';

export const addItem=
createAction('[Add Item]', 
// props<universityName:string>()
);

export const removeItem=
createAction('Remove Item');

