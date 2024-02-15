import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img from '../../../public/images/logo.png'
import profile from '../../../public/images/default-profile.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './Home.css'
const Home = () => {
    const [profileInfo, setProfileInfo] = useState({});
    const [customdata, setCustomData] = useState([]);
    const navigate = useNavigate();
    const [query, setQuery] = useState('')
    const id = localStorage.getItem("id")
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [searchButtonClicked, setSearchButtonClicked] = useState(false);
    useEffect(() => {
        setCustomData([]); // Clear the customdata state
    }, [query]);

    useEffect(() => {
        axios.get(`http://192.168.7.15:8081/profileInfo/${id}`)
            .then(res => setProfileInfo(res.data)

            )
            .catch(err => console.log(err));
    }, [id]);
    useEffect(() => {
        axios.get(`http://192.168.7.15:8081/customTableData`)
            .then(res => setCustomData(res.data)

            )
            .catch(err => console.log(err));
    });
    const formatDate = (dateString) => {
        const options = {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };

        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));

        return formattedDate;
    };



    const handleSearchButtonClick = (e) => {
        e.preventDefault();
        setSearchButtonClicked(true);
        setLoading(true);
        // Perform the search here based on the current value of the query
        const results = customdata.filter(item =>
            item.CURRENT_PERIOD && item.CURRENT_PERIOD.toLowerCase().includes(query.toLowerCase()) ||
            item.PAYEE_NAME && item.PAYEE_NAME.toLowerCase().includes(query.toLowerCase())
            ||
            item.STATUS && item.STATUS.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(results);
        setLoading(false);
        setNotFound(results.length === 0);
    };
    const handleLogout = () => {
        // Clear any user-related data from localStorage or state
        localStorage.removeItem('id');
        // Redirect to the '/' path
        navigate('/');
      };

    return (
        <div>

            <nav className="navbar bg-body-tertiary">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <img src={img} className='image' alt="Bootstrap" width="30" height="24" />
                    </a>

                    <div className='nav'>
                    
                        <Link to='/create' style={{ textDecoration: 'none' }}><button type="button" className="btn btn-success">Send Notification</button></Link>&nbsp;&nbsp;&nbsp;&nbsp;
                        
                        {/* <a href="#" style={{ textDecoration: 'none' }}>Update</a> */}
                    </div>
                    <div className='text-danger' >

                        <svg fill='currentcolor' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" /></svg>
                        &nbsp; &nbsp;<button className='btn btn-outline-danger' onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </nav >

            <div className='container'>

                <div className='row'>


                    <div className='col-11'>

                        <div className='search'>
                            <form className="d-flex search2" role="search" onSubmit={handleSearchButtonClick}>
                                <input
                                    style={{ width: '40%', fontSize: '14px' }}
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="search through name,period,status"
                                    aria-label="Search"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <button className="btn btn-outline-primary" type="submit">Search</button>
                            </form>
                        </div>
                        {loading && <p>Loading...</p>}
                        {notFound && <p>Not Found</p>}
                        {query && searchButtonClicked && !loading && !notFound && (
                            <table className='table tableclass table-striped-columns"'>
                                <thead className='table-info '>
                                    <tr>
                                        <th>Transaction ID</th>
                                        <th>Payee ID</th>
                                        <th>Payee Name</th>
                                        <th>Cash Amount</th>
                                        <th>PERIOD</th>
                                        <th>CREATION DATE</th>
                                        <th>STATUS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchResults.map((item, i) => (
                                        <tr key={i}>
                                            <td>{item.TRANSACTION_ID}</td>
                                            <td>{item.PAYEE_ID}</td>
                                            <td>{item.PAYEE_NAME}</td>
                                            <td>{item.CASH_AMOUNT}</td>
                                            <td>{item.CURRENT_PERIOD}</td>
                                            <td>{formatDate(item.CREATION_DATE)}</td>
                                            <td>{item.STATUS}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}










                    </div>
                    <div className='col-1'>
                        <div className='right' style={{ height: '638px', width: '197px' }}>
                            <img src={profile} className='icon' alt="Bootstrap" width="30" height="24" />
                            <div className='text-light p-3 fw-bold'>
                                <p>ID : {profileInfo.EMPLOYEE_ID}</p>
                                {/* <p>ID : {profileInfo.EMPLOYEE_ID}</p> */}
                                <p>Name : {profileInfo.EMPLOYEE_NAME}</p>
                                {/* <p>Phone: {profileInfo.PHONE_NUMBER}</p> */}

                            </div>
                        </div>




                    </div>
                </div>

            </div>
        </div >
    );
};

export default Home;