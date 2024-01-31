import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateCustomer() {
    const [header, setHeader] = useState('');
    const [remarks, setRemarks] = useState('');
    const [selectedOrganization, setSelectedOrganization] = useState('');
    const [fileLink, setFileLink] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [orderNumber, setOrderNumber] = useState('');
    const [customerGender, setCustomerGender] = useState('');
    const [orderDate, setOrderDate] = useState('');
    // const [organizationNames, setOrganizationNames] = useState([]);
    const [organizations, setOrganizations] = useState([]);




    const [selectedItemNames, setSelectedItemNames] = useState({
        'BAG CEMENT B-M(PCC)': false,
        'BAG CEMENT A-M SPECIAL(PCC)': false,
        'BAG CEMENT GOLD(OPC)': false,
    });



    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8081/organizationNames')
            .then(res => {
                setOrganizations(res.data);
            })
            .catch(err => console.log(err));
    }, []);
    const handleDropdownChange = (e) => {
        setSelectedOrganization(e.target.value);
    };

    function handleItemNameChange(event) {
        const itemName = event.target.value;
        const isChecked = event.target.checked;

        setSelectedItemNames(prevState => ({
            ...prevState,
            [itemName]: isChecked,
        }));
    }
    function handleSubmit(event) {
        event.preventDefault();


        // Convert checkbox values to 1 (true) or 0 (false)
        const bagCementBMPCC = selectedItemNames['BAG CEMENT B-M(PCC)'] ? 1 : 0;
        const bagCementAMPCC = selectedItemNames['BAG CEMENT A-M SPECIAL(PCC)'] ? 1 : 0;
        const bagCementGoldOPC = selectedItemNames['BAG CEMENT GOLD(OPC)'] ? 1 : 0;

        // Send the selected item names to the server for insertion into the database
        axios.post('http://localhost:8081/create', {
            header,
            customerName,
            orderNumber,
            customerGender,
            // organizationId,
            orderDate,
            remarks,
            organizations: selectedOrganization,
            fileLink,
            bagCementBMPCC,
            bagCementAMPCC,
            bagCementGoldOPC,
        })
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => {
                console.error("Error during POST request:", err);
            });
    }

    return (
        <div className="container bg-light text-dark">
            <h5 className='pt-2 text-center text-secondary'>Add New Customer</h5>
            <div className='container border'>
                <form onSubmit={handleSubmit}>
                    {/* ... (Rest of your form code) */}

                    {/* ... (Rest of your form code) */}

                    <div className='row'>
                        <div className="col-6">
                            <br></br>
                            <div className='p-2'>
                                <label htmlFor="" >Header</label><br></br>

                                <input type="number" onChange={e => setHeader(e.target.value)} className="border border-secondary mt-2 rounded-2  form" required />
                                <br></br>
                                <label htmlFor="">Order Number</label><br />
                                <input type="number" onChange={e => setOrderNumber(e.target.value)} className="border border-secondary mt-2 rounded-2  form" required />
                                <br></br>




                                <label htmlFor="">Order Date</label><br></br>
                                <input
                                    type="date"
                                    className="border border-secondary mt-2 rounded-2 form"
                                    id="orderDate"
                                    name="orderDate"
                                    value={orderDate}
                                    onChange={e => setOrderDate(e.target.value)}
                                />
                                <br></br>





                                <label htmlFor="">Item Type</label>

                                <br></br>
                                <input
                                    type="radio"
                                    id="BAG"
                                    name="customerGender"
                                    value="BAG"
                                    checked={customerGender === 'BAG'}
                                    onChange={e => setCustomerGender(e.target.value)}
                                />
                                <label htmlFor="BAG" className="radio-label">
                                    Bag
                                </label>
                                <br></br>
                                <input
                                    type="radio"
                                    id="BULK"
                                    name="customerGender"
                                    value="BULK"
                                    checked={customerGender === 'BULK'}
                                    onChange={e => setCustomerGender(e.target.value)}
                                />
                                <label htmlFor="BULK" className="radio-label">
                                    Bulk
                                </label><br />
                                <label htmlFor="">Item Name</label>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="itemCheckbox1"
                                        value="BAG CEMENT B-M(PCC)"
                                        checked={selectedItemNames['BAG CEMENT B-M(PCC)']}
                                        onChange={handleItemNameChange}
                                    />
                                    <label className="form-check-label" htmlFor="itemCheckbox1">
                                        BAG CEMENT B-M(PCC)
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="itemCheckbox2"
                                        value="BAG CEMENT A-M SPECIAL(PCC)"
                                        checked={selectedItemNames['BAG CEMENT A-M SPECIAL(PCC)']}
                                        onChange={handleItemNameChange}
                                    />
                                    <label className="form-check-label" htmlFor="itemCheckbox2">
                                        BAG CEMENT A-M SPECIAL(PCC)
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="itemCheckbox3"
                                        value="BAG CEMENT GOLD(OPC)"
                                        checked={selectedItemNames['BAG CEMENT GOLD(OPC)']}
                                        onChange={handleItemNameChange}
                                    />
                                    <label className="form-check-label" htmlFor="itemCheckbox3">
                                        BAG CEMENT GOLD(OPC)
                                    </label>
                                </div>


                                <br></br>

                            </div>
                        </div>
                        <div className="col-6">
                            <div className='p-2'>
                                <br></br><br></br><br></br>
                                <label htmlFor="">Customer Name</label><br></br>
                                <input type="text" onChange={e => setCustomerName(e.target.value)} required className="border border-secondary mt-2 rounded-2  form" />

                                <br></br>
                                <label htmlFor="">Remarks</label><br></br>
                                <input type="text" onChange={e => setRemarks(e.target.value)} className="border border-secondary mt-2 rounded-2  form" />
                                <br></br>
                                <label htmlFor="">Attach File Link</label><br></br>
                                <input type="text" onChange={e => setFileLink(e.target.value)} className="border border-secondary mt-2 rounded-2  form" />
                                <br></br>


                                <label htmlFor="">Organization Name</label><br></br>
                                {/* {console.log(organizations[0].ORGANIZATION_NAME)} */}
                                {organizations.map((org) => (
                                    <tr key={org.ORGANIZATION_ID}>
                                        <td>{org.ORGANIZATION_ID}</td>
                                        <td>{org.ORGANIZATION_NAME}</td>
                                    </tr>
                                ))}
                                <select value={selectedOrganization} onChange={handleDropdownChange}>
                                    <option value="">Select an Organization</option>
                                    {organizations.map((org) => (
                                        <option key={org.ORGANIZATION_ID} value={org.ORGANIZATION_NAME}>
                                            {org.ORGANIZATION_NAME}
                                        </option>
                                    ))}
                                </select>

                                <br></br><br></br>

                                {/* <select
                                    className="border border-secondary mt-2 rounded-2 form"
                                    onChange={e => setOrganizations(e.target.value)}
                                    value={selectedOrganization}
                                >
                                    <option value="">Select Organization</option>
                                    {organizations.map((org, index) => (

                                        <option key={index} value={org}>
                                            {org}
                                        </option>
                                    ))}
                                </select><br></br><br></br> */}
                                <button className='btn btn-success'>Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateCustomer;
