import { getToken } from "../features/Login/loginSlice";

const localStorageToken = getToken();

const initialState = {
    token: localStorageToken,
}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN': {
            return {
                ...state,
                token: action.payload,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                token: "",
            }
        }
        default:
            return state;
    }
};
export default userReducer;