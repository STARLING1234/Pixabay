import React, { useState } from 'react'
import './auth.css'
import { auth } from '../../Services/firebaseAuthService';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../UIComponents/PasswordToggleInput';

const Login = () => {

    const [value, setValue] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })

        // remove error while typing
        setErrors({
            ...errors,
            [e.target.name]: ''
        });
    }

    // Form Validation
    const validateForm = () => {

        let newErrors = {};

        if (!value.email) {
            newErrors.email = "Email is required";
        }
        else if (!/\S+@\S+\.\S+/.test(value.email)) {
            newErrors.email = "Enter valid email";
        }

        if (!value.password) {
            newErrors.password = "Password is required";
        }
        else if (value.password.length < 6) {
            newErrors.password = "Password must be minimum 6 characters";
        }
        else if (!/(?=.*[A-Z])/.test(value.password)) {
            newErrors.password = "Password must include one uppercase letter";
        }
        else if (!/(?=.*[a-z])/.test(value.password)) {
            newErrors.password = "Password must include one lowercase letter";
        }
        else if (!/(?=.*[0-9])/.test(value.password)) {
            newErrors.password = "Password must include one number";
        }
        else if (!/(?=.*[!@#$%^&*])/.test(value.password)) {
            newErrors.password = "Password must include one special character";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }


    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, value.email, value.password)
            const accessToken = userCredential.user.accessToken;
            console.log(userCredential.user)
            localStorage.setItem('accessToken', accessToken)
            alert("Logged in Successfully");
            navigate('/home');
            setValue({ email: '', password: '' });
        } catch (error) {
            alert('You have entered wrong credentials');
        }
    }
    return (
        <div className='login'>
            <form onSubmit={handleLogin}>
                <div className="auth-logo">
                    <img src="/logo.png" alt="Logo" />
                </div>
                <h1>Login Here</h1>

                <label>Username</label>
                <input
                    type="text"
                    placeholder="Enter Username"
                    name='email'
                    onChange={handleChange}
                    value={value.email}
                />

                {
                    errors.email &&
                    <p className="error">
                        {errors.email}
                    </p>
                }

                <label>Password</label>
                <PasswordInput
                    name="password"
                    value={value.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                />

                {
                    errors.password &&
                    <p className="error">
                        {errors.password}
                    </p>
                }

                <button type="submit">Login</button>
                <div className="auth-footer">
                    Don't have an account? <Link to='/signup'>Sign Up</Link>
                </div>
            </form>
        </div>
    )
}

export default Login
