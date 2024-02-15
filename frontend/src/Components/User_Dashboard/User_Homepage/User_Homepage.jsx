import axios from 'axios';
import React from 'react';
import { useNotificationContext } from '../../CreatePage/NotificationContext'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import img from '../../../../public/images/logo.png'
import profile from '../../../../public/images/default-profile.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './User_Homepage.css'
const User_Homepage = () => {
    const navigate = useNavigate();
    //const { notifications, updateNotifications } = useNotificationContext();
    //const { notifications, updateNotifications } = useNotificationContext();
    // const [fetchNotifications, setFetchNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [profileInfo, setProfileInfo] = useState({});
    // const { id } = useParams();
    const id = localStorage.getItem("id")
    // const empId = localStorage.getItem("empId")
    // console.log('emp', empId)

    // const [payeeId, setPayeeId] = useState('');
    // const [payeeName, setPayeeName] = useState('');
    // const [notifications2, setNotifications2] = useState('');

    useEffect(() => {
        axios.get(`http://192.168.7.15:8081/notifications/${id}`)
            .then(res => setNotifications(res.data))
            .catch(err => console.log(err));
    }, [id]);
    useEffect(() => {
        axios.get(`http://192.168.7.15:8081/profileInfo/${id}`)
            .then(res => setProfileInfo(res.data)

            )
            .catch(err => console.log(err));
    });

    // Add a function to handle updating status
// Add a function to handle updating status
const updateStatus = (response, payeeId, currentPeriod) => {
    axios.put(`http://192.168.7.15:8081/updateStatus/${payeeId}/${currentPeriod}/${response.toLowerCase()}`)
        .then(res => {
            console.log(res.data.message);
            // Reload the page after successful update
            window.location.reload();
        })
        .catch(err => console.log(err));
};

    const handleLogout = () => {
        // Clear any user-related data from localStorage or state
        localStorage.removeItem('id');
        // Redirect to the '/' path
        navigate('/');
      }
      const autoRefresh = () => {
        // Clear any user-related data from localStorage or state
        window.location.reload();
      }


    // Modify the button click event handlers

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

<button type="button" className="btn btn-outline-warning" onClick={autoRefresh}>Refresh</button>

                        {notifications.map((item, i) => (
                            <div key={i}>
                                <p>{item.EMPLOYEE_NAME} did you receive your payment for <b>{item.CURRENT_PERIOD}</b>?</p>
                                <button type="button" className="btn btn-success" onClick={() => updateStatus('Yes', item.PAYEE_ID, item.CURRENT_PERIOD)}>Yes</button>
                                &nbsp; &nbsp;
                                <button type="button" className="btn btn-danger" onClick={() => updateStatus('No', item.PAYEE_ID, item.CURRENT_PERIOD)}>No</button>
                            </div>
                        ))}



                        {/* {console.log('notification:', notifications)} */}

                        {/* {notifications.map((item, i) => (
                            <div key={i}>
                                <h4>Notification {i + 1}</h4>
                                <p>PAYEE_ID: {item.PAYEE_ID}</p>
                                <p>PAYEE_NAME: {item.PAYEE_NAME}</p>
                                <p>NOTIFICATIONS: {item.NOTIFICATIONS}</p>
                                <p>----</p>
                            </div>
                        ))} */}

                        {/* 
                        {notifications.map((notification, i) => (
                            <div key={i}>{notification.PAYEE_ID}</div>
                        ))} */}
                        {/* 
                        <div>
                            <button onClick={handleButtonClick}>Click Me</button>
                          
                            {fetchNotifications && (
                                <div>
                                    {notifications.map((notification, i) => (
                                        <div key={i}>{notification.NOTIFICATIONS}</div>
                                    ))}
                                </div>
                            )}
                        </div> */}

                    </div>



                    <div className='col-1'>
                        <div className='right' style={{ height: '638px', width: '197px' }}>
                            <img src={profile} className='icon' alt="Bootstrap" width="30" height="24" />
                            <div className='text-light p-3 fw-bold'>
                                {console.log('profile:', profileInfo.EMPLOYEE_ID)}
                                {/* {profile_info.map((pro, i) => (
                                    <tr key={i}>
                                        <p>ID : {pro.EMPLOYEE_ID}</p>
                                        <p>Name : {pro.EMPLOYEE_NAME}</p>
                                        <p>Phone: {pro.PHONE_NUMBER}</p>

                                    </tr>
                                ))} */}

                                <p>ID : {profileInfo.EMPLOYEE_ID}</p>
                                <p>Name : {profileInfo.EMPLOYEE_NAME}</p>
                                {/* <p>Phone: {profileInfo.PHONE_NUMBER}</p> */}
                            </div>
                            <div className='logout'>
                                <button className='btn btn-success ' onClick={handleLogout} >Logout</button>
                            </div>
                        </div>




                    </div>
                </div>

            </div>
        </div >
    );
};

export default User_Homepage;