import React from 'react';
import { useDispatch } from 'react-redux';
import { loginUserAction } from '../../actions/user';
import { loginApi } from '../../api/userApi';
import LoginForm from './LoginForm';
import { saveToken } from './loginSlice';

function Login(props) {

    const dispatch = useDispatch();

    const handleSubmit = async (data) => {
        const response = await loginApi(data);
        if (response && response.status === 200) {
            const action = loginUserAction(response.data);
            dispatch(action);
            saveToken(response.data);
            return true;
        }
        else {
            return response.message;
        }
    }

    return (
        <div>
            <LoginForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Login;