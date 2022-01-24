import React from 'react';
import { useHistory } from 'react-router-dom';
import { registerApi } from '../../api/userApi';
import RegisterForm from './RegisterForm';

function Register(props) {

    const history = useHistory();

    const handleSubmit = async (data) => {
        const response = await registerApi(data);
        if (response && response.status === 201) {
            history.push("login");
            return true;
        }
        else {
            return response.message;
        }
    }

    return (
        <div>
            <RegisterForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Register;