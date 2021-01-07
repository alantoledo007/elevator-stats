import axios from 'axios';
import {api_url} from '../../config'; 
const BASE_URL = api_url + '/requests';

//actions
export const GET_REQUESTS = "GET_REQUESTS";
export const CREATE_REQUEST = "CREATE_REQUEST";
export const GET_REQUEST = "GET_REQUEST";
export const UPDATE_REQUEST = "UPDATE_REQUEST";
export const DELETE_REQUEST = "DELETE_REQUEST";

export const getRequests = () => {
    return dispatch => {
        return axios.get(`${BASE_URL}`)
            .then(res => res.data)
            .then(res => {
                return dispatch({type:GET_REQUESTS, payload: res.data});
            });
    }
}

export const createRequest = (data) => {
    return dispatch => {
        return axios.post(`${BASE_URL}`, data)
        .then(() => {
            return dispatch({type:CREATE_REQUEST});
        });
    }
}

export const getRequest = (id) => {
    return dispatch => {
        return axios.get(`${BASE_URL}/${id}`)
            .then(res => res.data)
            .then(res => {
                return dispatch({type:GET_REQUEST, payload: res.data});
            });
    }
}

export const updateRequest = (id, data) => {
    return dispatch => {
        return axios.put(`${BASE_URL}/${id}`, data)
        .then(() => {
            return dispatch({type: UPDATE_REQUEST});
        });
    }
}

export const deleteRequest = id => {
    return dispatch => {
        return axios.delete(`${BASE_URL}/${id}`)
        .then(() => {
            return dispatch({type: DELETE_REQUEST});
        });
    }
}