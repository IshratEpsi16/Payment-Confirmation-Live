import { useState } from 'react';
import axios from 'axios'
import img from '../../../public/images/logo.png'
//import Validation from './SignUpValidation';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
//import './SignUpStyle.css'
import '../Login/Forgetpass.css'
const ForgetPass = () => {
    const [employeeId, setEmployeeId] = useState('')
    const [nidNo, setNidNo] = useState('')

    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://192.168.7.15:8081/forgetpassword', {
                employeeId,
                nidNo
            });
    
            if (response.data.navigate) {
                // Navigate to authenticated page with the employeeId as a parameter
                navigate(`/authenticated/${employeeId}`);
            } else {
                alert("Unauthorized. Invalid employee ID or NID number.");
            }
        } catch (error) {
            console.error("Error during password reset:", error);
            alert("Error resetting password. Please try again later.");
        }
    };
    


    // const handleInput = (event) => {
    //     setvalues((prev) => ({ ...prev, [event.target.name]: event.target.value }))

    // }
    return (
        <div className='d-flex justify-content-center align-items-center ForgetPassPage' >
            <div className='ForgetPassForm'>
                <div className=" mt-4 center-container-pass">
                    <img src={img} className='img' alt="Description of the image" />
                </div>
                <h2 className='m-2 text-color text-center'>Reset Password</h2>


                <form action='' onSubmit={handleSubmit}>
                <div className="m-3 text-color1">
                        <label htmlFor="employeeID" className="form-label">Employee ID</label>

                        <input type="text" maxlength="10" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} className="form-control" id="employeeID" required />

                    </div>
                    <div className="m-3 text-color1">
                        <label htmlFor="phoneNumber" className="form-label">NID No.</label>
                        <input type="number"  onChange={e => setNidNo(e.target.value)} className="form-control" id="phoneNumber" required />


                    </div>

                    <button type="submit" className="m-3 button btn btn-primary">Submit</button>
                    <p className='m-3 sign'>&nbsp;<Link to='/'>Log in</Link></p>
                    <p className='m-3 sign'>&nbsp;<Link to='/authenticated'>Try</Link></p>

                </form>

            </div>

        </div>

    );
};

export default ForgetPass;