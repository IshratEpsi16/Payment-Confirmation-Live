import React from 'react';
import './CreatePage.css'
import img from '../../../public/images/logo.png'
import { useEffect } from 'react';
import { useNotificationContext } from '../CreatePage/NotificationContext'
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const CreatePage = () => {
    // const { setFetchNotifications } = useNotificationContext();
    const { updateNotifications } = useNotificationContext();
    const [employeeId, setEmployeeId] = useState('')
    const [customer, setCustomer] = useState([]);
    const [payeeId, setPayeeId] = useState('');
    const [notify, setNotify] = useState('');
    const [payeeName, setPayeeName] = useState('');
    const [cashAmount, setCashAmount] = useState('');
    const [mailAddress, setMailAddress] = useState('');
    const [currentPeriod, setCurrentPeriod] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
    const { fetchNotifications, setFetchNotifications } = useNotificationContext();
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        
        axios.get('http://192.168.7.15:8081/')
            .then(res => setCustomer(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleDateChange = (date) => {
        setCurrentDate(date);
        setCurrentPeriod(date.toISOString()); // Save as UTC in state
    };

    const navigate = useNavigate();



    const handleSendButtonClick = (item) => {
        setSelectedRow(item);
        setFetchNotifications(true);
    };

    useEffect(() => {
        if (fetchNotifications) {
            axios.get('http://192.168.7.15:8081/notifications')
                .then(res => {
                    const notificationsData = res.data;
                    console.log('notificationsData:', notificationsData);
                    // Update notifications in context
                    setNotify(notificationsData);
                })
                .catch(err => console.error(err))
                .finally(() => setFetchNotifications(false)); // Reset the state after fetching notifications
        }
    }, [fetchNotifications]);





    // const handleSendButtonClick = (item) => {
    //     setSelectedRow(item);
    //     // Trigger the fetch and update notifications in User_Homepage
    //     axios.get('http://localhost:8081/notifications')
    //         .then(res => {
    //             const notificationsData = res.data;
    //             console.log('notificationsData:', notificationsData);
    //             // Set notifications in User_Homepage
    //             setNotify(notificationsData);
    //         })
    //         .catch(err => console.error(err));
    // };

    useEffect(() => {
        axios.get('http://192.168.7.15:8081/')
            .then(res => setCustomer(res.data))
            .catch(err => console.log(err));
    }, []);

    function handleSubmit(event) {
        event.preventDefault();

        if (!selectedRow) {
            console.error("No row selected for submission.");
            return;
        }

        const { PAYEE_ID, PAYEE_NAME, CASH_AMOUNT, MAIL_ADDRESS } = selectedRow;

        // Convert currentPeriod to local time before sending it to the server
        const localCurrentPeriod = new Date(currentPeriod).toLocaleString();

        axios.post('http://192.168.7.15:8081/create', {
            payeeId: PAYEE_ID,
            payeeName: PAYEE_NAME,
            cashAmount: CASH_AMOUNT,
            mailAddress: MAIL_ADDRESS,
            currentPeriod: localCurrentPeriod, // Send local time to the server
        })
            .then(res => {
                console.log(res);
                alert('Notification sent to user');
                navigate('/create');
            })
            .catch(err => {
                console.error("Error during POST request:", err);
            });
    }
    return (
        <div>
            <nav className="navbar bg-body-tertiary">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <img src={img} className='image' alt="Bootstrap" width="30" height="24" />
                    </a>


                    <div className='text-danger'>
                        <Link to='/home' className='text-danger'> <svg style={{ height: '35px', width: '35px' }} fill='currentcolor' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c.2 35.5-28.5 64.3-64 64.3H128.1c-35.3 0-64-28.7-64-64V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24zM352 224a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zm-96 96c-44.2 0-80 35.8-80 80c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16c0-44.2-35.8-80-80-80H256z" /></svg>
                        </Link>
                    </div>
                </div>
            </nav >
            <div className='container'>
                <h5 className='text-center m-4'>All Information</h5>
                <form onSubmit={handleSubmit}>
                    <table className='table table-striped-columns"'>
                        <thead className='table-info '>
                            <tr>
                                {/* <th>Transaction ID</th> */}
                                <th>Payee ID</th>
                                <th>Payee Name</th>
                                <th>Cash Amount</th>
                                <th>Mail</th>
                                <th>Period</th>

                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {console.log('cy', customer)}
                            {customer.map((item, i) => (
                                <tr key={i}>
                                    {/* <td>{item.TRANSACTION_ID}</td> */}

                                    <td>{item.PAYEE_ID}</td>

                                    <td>{item.PAYEE_NAME}</td>
                                    <td>{item.CASH_AMOUNT}</td>
                                    <td>{item.MAIL_ADDRESS}</td>
                                    <td>
                                        <DatePicker
                                            selected={currentDate}
                                            className='date'
                                            onChange={(date) => handleDateChange(date)}
                                            dateFormat="MMM-yy"
                                        />
                                    </td>


                                    <td><button className='btn btn-info text-light' onClick={() => handleSendButtonClick(item)} >Send</button></td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </form>
            </div>
        </div>
    );
};

export default CreatePage;