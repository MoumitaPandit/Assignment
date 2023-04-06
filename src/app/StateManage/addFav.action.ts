import {createAction,props} from '@ngrx/store';

export const addItem=
createAction('[Add Item] Add fav to list', 
 props<
 {
    name:any,
    country:any,
    alpha_two_code:any,
    web_pages:any
}>()
);

export const removeItem=
createAction('[Remove Item] Remove from list',
props<{
    index:any
}>());

