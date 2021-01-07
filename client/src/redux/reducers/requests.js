import { GET_REQUESTS, GET_REQUEST } from "../actions/requests";

const initialState = {
    requests: [],
    request:{}
}

export default function requestsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_REQUESTS:
            return {
                ...state,
                requests:action.payload
            }
        case GET_REQUEST:
            return {
                ...state,
                request:action.payload
            }
        default:
            return state;
    }
}