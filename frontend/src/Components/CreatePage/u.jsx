import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import img from '../../../../public/images/logo.png'
import profile from '../../../../public/images/default-profile.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './User_Homepage.css'
const User_Homepage = () => {
    const [notifications, setNotifications] = useState([]);
    const [payeeId, setPayeeId] = useState('');
    const [payeeName, setPayeeName] = useState('');
    const [notifications2, setNotifications2] = useState('');
    useEffect(() => {
        axios.get('http://localhost:8081/notifications')
            .then(res => setNotifications2(res.data))
            .catch(err => console.log(err));
    }, []);


    useEffect(() => {
        axios.get('http://localhost:8081/notifications')
            .then(res => setNotifications(res.data))
            .catch(err => console.log(err));
    }, []);


    return (
        <div>
            <nav className="navbar bg-body-tertiary">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <img src={img} className='image' alt="Bootstrap" width="30" height="24" />
                    </a>

                    <div className='text-danger' >

                        <svg style={{ height: '28px', width: '28px' }} fill='currentcolor' xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" /></svg>

                    </div>
                </div>
            </nav >
            <div className='container'>

                <div className='row'>


                    <div className='col-11'>

                        <h3 className='text-center p-5 text-primary'>Welcome to User Homepage</h3>

                        {/* 
                        {console.log('notification:', notifications)}
                        {notifications2.map((item, i) => (
                            <tr key={i}>
                                <h4>From get method</h4>
                                <p>  {item.PAYEE_ID}</p>
                                <p>  {item.PAYEE_NAME}</p>
                                <p>{item.NOTIFICATIONS}</p>
                                <p>----</p>
                            </tr>
                        ))} */}
                        <h5>after click on send</h5>
                        {console.log('notification:', notifications)}
                        {notifications.map((item, i) => (
                            <div key={i}>
                                <h4>Notification {i + 1}</h4>
                                <p>PAYEE_ID: {item.PAYEE_ID}</p>
                                <p>PAYEE_NAME: {item.PAYEE_NAME}</p>
                                <p>NOTIFICATIONS: {item.NOTIFICATIONS}</p>
                                <p>----</p>
                            </div>
                        ))}

                    </div>

                    <div className='col-1'>
                        <div className='right' style={{ height: '638px', width: '197px' }}>
                            <img src={profile} className='icon' alt="Bootstrap" width="30" height="24" />
                            <div className='text-light p-3 fw-bold'>
                                <p>ID :</p>
                                <p>Name :</p>
                                <p>Phone:</p>
                                <p>Mail :</p>
                            </div>
                            <div className='logout'>
                                <button className='btn btn-success ' >Logout</button>
                            </div>
                        </div>




                    </div>
                </div>

            </div>
        </div >
    );
};

export default User_Homepage;