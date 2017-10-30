import { ADD_USER, REMOVE_USER } from '../actions/types';


const users = (state = [], action) => {
    switch (action.type) {
        case ADD_USER:
            return [
                ...state,
                {
                    id: action.id,
                    name: action.user.name,
                    phone: action.user.phone,
                    email: action.user.email,
                }
            ];
        case REMOVE_USER:
            return state.filter(user => user.id !== action.id);
        default:
            return state
    }
};

export default users;