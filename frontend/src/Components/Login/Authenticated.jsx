import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import img from '../../../public/images/logo.png'
//import Validation from './SignUpValidation';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import './Authenticated.css'
const Authenticated = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [employeePassword, setEmployeePassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [nidNo, setNidNo] = useState('')
    const navigate = useNavigate();
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    }
    useEffect(() => {
        // Cleanup function to reset form fields
        return () => {
            setEmployeeId('');
            setEmployeePassword('');
            setConfirmPassword('');
            setNidNo('');
            setShowPassword(false);
        };
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            alert("New Password and Confirm Password do not match");
            return;
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

        if (!passwordRegex.test(newPassword)) {
            alert("Password does not meet the required conditions.\n Conditions:\n 1.First letter should be uppercase.\n 2.Must conatin at least one digit.\n 3.Must conatin at least one special character. \n 4. Password length should not be less than 8 characters");
            return;
        }

        try {
            const response = await axios.put(`http://192.168.7.15:8081/updatepassword/${employeeId}`, {
                employeeId,
                newPassword,
                confirmPassword
            });
            console.log(response.data);
            navigate('/'); // Log the response from the backend
            // Handle success
        } catch (error) {
            console.error('Error updating password:', error);
            // Handle error
        }
    };

    
    
    return (
        <div className='d-flex justify-content-center align-items-center authenticatedPage'>
            <div className='authenticatedForm'>
                <div className=" mt-4 authenticated-center-container">
                    <img src={img} className='img' alt="Description of the image" />
                </div>
                <h2 className='m-2 text-color text-center'>Reset Password Now</h2>
                <form onSubmit={handleSubmit}>
                    <div className="m-3 text-color1">
                        <label htmlFor="employeeID" className="form-label">Employee ID</label>
                        <input type="text" maxLength="10" onChange={e => setEmployeeId(e.target.value)} className="form-control" id="employeeID" required />
                    </div>
                    <div className="m-3 text-color1">
                        <label htmlFor="exampleInputPassword1" className="form-label">New Password</label>
                        <input onChange={e => setNewPassword(e.target.value)} type={showPassword ? 'text' : 'password'}  className="form-control" id="exampleInputPassword1" required />
                    </div>
                    {showPassword}
                        <div className='eyeiconAuth'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" style={{ fill: '#808080' }} viewBox="0 0 576 512" onClick={handleTogglePassword}><path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" /></svg>
                        </div>
                    <div className="m-3 text-color1">
                        <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
                        <input onChange={e => setConfirmPassword(e.target.value)} type={showPassword ? 'text' : 'password'} className="form-control" id="exampleInputPassword2" required />
                    </div>
                    {showPassword}
                        <div className='eyeiconAuth'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" style={{ fill: '#808080' }} viewBox="0 0 576 512" onClick={handleTogglePassword}><path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" /></svg>
                        </div>
                        <button type="submit" className="m-3 button btn btn-primary">Reset</button>
                    <p className='back'><Link to='/'>Back</Link></p> 
                </form>
            </div>
        </div>
    );
};

export default Authenticated;