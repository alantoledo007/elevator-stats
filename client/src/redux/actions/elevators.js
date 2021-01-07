export const SET_ELEVATORS = "SET_ELEVATORS";

export const setElevators = (quantity) => {
    return dispatch => {
        return dispatch({type: SET_ELEVATORS, payload: quantity});
    }
}