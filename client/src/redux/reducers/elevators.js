import { SET_ELEVATORS } from "../actions/elevators";

const initialState = {
    elevators: 3
}

export default function elevatorsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ELEVATORS:
            return {
                ...state,
                elevators:action.payload
            }
        default:
            return state;
    }
}