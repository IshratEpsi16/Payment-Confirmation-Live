import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import logo from './assets/src-logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { Users } from './users'

import axios from 'axios';
import Table from './Table';

function Customer() {
    const [count, setCount] = useState(0)
    const [customer, setCustomer] = useState([])
    const [query, setQuery] = useState('')
    //  console.log('Customer array', customer)
    useEffect(() => {
        axios.get('http://localhost:8081/')
            .then(res => setCustomer(res.data))
            .then(err => console.log(err))

    }, [])
    const formatDate = (dateString) => {
        if (!dateString) {
            return ''; // Return blank if dateString is empty
        }

        const options = {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        };

        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString(undefined, options);

        return formattedDate;
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete('http://localhost:8081/customer/' + id)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }
    const search = (customer) => {
        return customer.filter(item =>
            item[4].toLowerCase().includes(query) || item[8].toLowerCase().includes(query) || item[6].toLowerCase().includes(query)
            || item[3].toLowerCase().includes(query)




        )
    }

    //console.log('query', query)
    //console.log(Users.filter(user => user.cust_name.toLowerCase().includes("m")))

    return (
        <div className="container bg-light text-dark">
            <nav class="navbar p-3 mb-2 bg-danger-subtle text-emphasis-danger">
                <div>
                    <a class="navbar-brand" href="#">
                        &nbsp;&nbsp;    <img src={logo} alt="Logo" width="300px" height="60px" class="d-inline-block align-text-top" />
                    </a>
                </div>
                <div>



                    {/* <input type='text' placeholder='search' value={query} className='search' onChange={(e) => setQuery(e.target.value)} /> */}
                    <div class="input-group mb-2 ">
                        &nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;
                        <span class="input-group-text" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" fill='blue' height="1em" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg></span>

                        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} class="form-control" placeholder="search here" aria-label="Username" aria-describedby="basic-addon1" />

                        &nbsp;&nbsp;


                        <Link
                            to='/create'
                            className=" btn btn-outline-danger fw-bold"


                        >


                            Add Customer
                        </Link>

                    </div>

                    {/* <ul className='list'>
                        {Users.filter((user) =>
                            user.cust_name.toLowerCase().includes(query)


                        ).map((user) => (
                            <li key={user.id} className='listItem'>{user.cust_name}</li>

                        ))}


                    </ul> */}
                    {/* <Table data={search(Users)} /> */}



                </div>
                &nbsp;
            </nav>
            <h5 className='pt-2 text-center text-secondary'>Customer All Information</h5>


            <div className='container'>

                <br></br><br></br>
                <div className='text-center'>
                    <table className='table table-striped-columns"'>
                        <thead className='table-info ' >
                            <tr>
                                <th>Sequence Number</th>
                                <th>Header</th>
                                <th>Org Name</th>
                                <th>Order No</th>
                                <th>Order Date</th>
                                <th>Customer Name</th>
                                <th>Item Type</th>
                                <th>Remarks</th>
                                <th>Photo</th>
                                <th>File</th>
                                <th>Customer No</th>
                                <th>Org ID</th>
                                <th>BM</th> {/* Add these columns */}
                                <th>AM</th>
                                <th>GOLD</th>
                                <th>File Link</th>

                                <th></th>
                                <th></th>

                            </tr>
                        </thead>
                        {console.log('cy', customer)}
                        {/* {console.log('cy', customer)} */}

                        {customer.filter((item) => item[4]?.toLowerCase().includes(query) ||
                            item[3]?.toLowerCase().includes(query) ||
                            item[6]?.toLowerCase().includes(query) ||
                            item[8]?.toLowerCase().includes(query)

                        ).map((item, i) => (
                            <tbody key={i}>
                                <tr>
                                    {/* {console.log('item4', item[4])} */}
                                    <td>{item[17]}</td>
                                    <td>{item[0]}</td>
                                    <td>{item[8]}</td>
                                    <td>{item[1]}</td>
                                    <td>{formatDate(item[2])}</td>
                                    <td>{item[4]}</td>
                                    <td>{item[6]}</td>
                                    <td>{item[3]}</td>
                                    <td>{item[5]}</td>
                                    <td>{item[7]}</td>
                                    <td>{item[9]}</td>
                                    <td>{item[12]}</td>

                                    <td>{parseInt(item[14]) === 1 ? <svg xmlns="http://www.w3.org/2000/svg" fill='green' height="1em" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" fill='red' height="1em" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" /></svg>}</td>
                                    <td>{parseInt(item[15]) === 1 ? <svg xmlns="http://www.w3.org/2000/svg" fill='green' height="1em" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" fill='red' height="1em" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" /></svg>}</td>
                                    <td>{parseInt(item[16]) === 1 ? <svg xmlns="http://www.w3.org/2000/svg" fill='green' height="1em" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" fill='red' height="1em" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" /></svg>}</td>







                                    <td>
                                        <a href={item[11]} target="_blank">
                                            <button
                                                className="btn btn-outline-primary"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill='currentcolor' height="1em" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" /></svg>
                                            </button>
                                        </a>
                                    </td>
                                    <td>
                                        <Link to={`update/${item[0]}`} className="btn btn-secondary">
                                            Update
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={() => handleDelete(item[0])}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill='currentcolor' height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                                        </button>
                                    </td>
                                    {/* Display "Yes" or "No" based on checkbox values */}

                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
            <div>
                <div class='row'>
                    <p className="text-center text-muted mt-4">&copy;Seven Rings Cement. All Right Reserved</p>
                </div>
                <hr />
            </div>
        </div>
    )
}

export default Customer