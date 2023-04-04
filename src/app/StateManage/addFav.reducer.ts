import { createReducer, on, Action } from '@ngrx/store';
import { addItem, removeItem } from './addFav.action';
import { favStatus } from '../app.component';


export interface State {
    favStatus: favStatus;
}

const initialState: State = {
    favStatus: {
        status: 'Marked',
        favUniversityList: []
    }
};

const favStatusre = createReducer(
    initialState,
    on(addItem, (state, action) => ({
        ...state,
        favStatus: {
            ...state.favStatus,
            favUniversityList: [
                ...state.favStatus.favUniversityList,
                {
                    name: action.name,
                    country: action.country,
                    alpha_two_code: action.alpha_two_code,
                    web_pages: action.web_pages
                }
            ]
        }
    })
    )
);

export function reducer(state:State|undefined, action:Action){
    return favStatusre(state,action);
}

