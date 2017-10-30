import { ADD_USER, REMOVE_USER } from './types';

let nextUserId = 0;

export const addUser = (user) => {
    return {
        type: ADD_USER,
        id: nextUserId ++,
        user
    }
};

export const removeUser = (id) => ({
    type: REMOVE_USER,
    id
});


