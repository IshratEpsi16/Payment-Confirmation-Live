import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


function Customer() {

    const [customer, setCustomer] = useState([])


    //  console.log('Customer array', customer)
    useEffect(() => {
        axios.get('http://localhost:8081/')
            .then(res => setCustomer(res.data))
            .catch(err => console.log(err)); // Use catch to handle errors
    }, [])

    return (
        <div>
            <h5>Customer Page</h5>
            <table className='table table-striped-columns"'>
                <thead className='table-info '>
                    <tr>
                        <th>Employee ID</th>
                        <th>Email</th>
                        <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                    {console.log('cy', customer)}
                    {customer.map((item, i) => (
                        <tr key={i}>
                            <td>{item.EMPLOYEE_ID}</td>

                            <td>{item[1]}</td>
                            <td>{item[2]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Customer;
