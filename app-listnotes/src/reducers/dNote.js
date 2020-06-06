import { ACTION_TYPES } from "../actions/dNote";

const initialState = {
    list: []
}
export const dNote = (state = initialState, action) =>{

    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL:
            return{
                ...state,
                list:[...action.payload]
            }

        default:
            return state
    }
}