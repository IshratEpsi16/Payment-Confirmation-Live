import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateCustomer() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [fileLink, setFileLink] = useState('');
    const [header, setHeader] = useState('');
    const [remarks, setRemarks] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [orderNumber, setOrderNumber] = useState('');
    const [customerGender, setCustomerGender] = useState('');
    const [orderDate, setOrderDate] = useState('');
    const [selectedOrganization, setSelectedOrganization] = useState('');
    const [organizationNames, setOrganizationNames] = useState([]);
    const [bagCementBMPCC, setBagCementBMPCC] = useState(false); // Checkbox state
    const [bagCementAMPCC, setBagCementAMPCC] = useState(false); // Checkbox state
    const [bagCementGoldOPC, setBagCementGoldOPC] = useState(false);

    const [values, setValues] = useState({
        id: id,

        header: '',
        remarks: '',
        customerName: '',
        orderNumber: '',
        customerGender: '',
        fileLink: '',
        orderDate: '',
        selectedOrganization: '',
        organizationNames: '',
        bagCementBMPCC: false,
        bagCementAMPCC: false,
        bagCementGoldOPC: false

    })
    useEffect(() => {
        axios.get('http://localhost:8081/organizationNames')
            .then(res => {
                setOrganizationNames(res.data);
            })
            .catch(err => console.log(err));

        axios.get(`http://localhost:8081/edit/${id}`)
            .then(res => {

                //console.log('res', res)
                setValues({
                    ...values,
                    header: res.data[0],
                    customerName: res.data[4],
                    fileLink: res.data[11],
                    remarks: res.data[3],

                    orderNumber: res.data[1],
                    customerGender: res.data[6],
                    //orderDate: res.data[2],
                    selectedOrganization: res.data[8],
                    organizationNames: res.data[8],

                    bagCementBMPCC: res.data[14],
                    bagCementAMPCC: res.data[15],
                    bagCementGoldOPC: res.data[16]
                    // bagCementBMPCC: '',
                    // bagCementAMPCC: '',
                    // bagCementGoldOPC: '' 
                })

            })
            .catch(err => console.log(err))


    }, [])
    function handleCheckboxChange(e) {
        const { name, checked } = e.target;
        setValues({
            ...values,
            [name]: checked,
        });
    }


    function handleSubmit(e) {
        e.preventDefault();

        // Check if the header is empty


        axios
            .put(`http://localhost:8081/update/${id}`, values
                // header,
                // remarks,
                // customerName,
                // customerGender,
                // orderDate,
                // orderNumber,
                //  organization_name: selectedOrganization,
                // fileLink, // Ensure consistency with backend field name
                // bagCementBMPCC, // Include checkbox values in the request
                // bagCementAMPCC,
                // bagCementGoldOPC
            )
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err));
    }


    return (
        <div className="container bg-light text-dark">
            <h5 className='pt-2 text-center text-secondary'>Update Customer Information</h5>
            <div className='container border'>
                <form onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className="col-6">
                            <br></br>
                            <div className='p-2'>
                                <label htmlFor="" >Header</label><br></br>
                                <input type="number" required value={values.header}
                                    onChange={e => setValues({ ...values, header: e.target.value })} className="border border-secondary mt-2 rounded-2  form" />
                                <br></br>

                                <label htmlFor="">Order Number</label><br />
                                <input type="number" required onChange={e => setValues({ ...values, orderNumber: e.target.value })} value={values.orderNumber}
                                    className="border border-secondary mt-2 rounded-2  form" />
                                <br></br>




                                <label htmlFor="">Order Date</label><br></br>
                                <input
                                    type="date"
                                    className="border border-secondary mt-2 rounded-2 form"
                                    id="orderDate"
                                    name="orderDate"
                                    // value={values.orderDate}
                                    // onChange={e => setValues({ ...values, orderDate: e.target.value })}
                                    //value={orderDate}
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
                                    checked={values.customerGender === 'BAG'}
                                    // onChange={e => setValues({ ...values, customerGender: e.target.value })}
                                    // value={values.customerGender}
                                    onChange={e => setValues({ ...values, customerGender: e.target.value })}
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
                                    checked={values.customerGender === 'BULK'}
                                    // onChange={e => setValues({ ...values, customerGender: e.target.value })}
                                    // value={values.customerGender}
                                    onChange={e => setValues({ ...values, customerGender: e.target.value })}
                                />
                                <label htmlFor="BULK" className="radio-label">
                                    Bulk
                                </label>


                                <br></br>
                                <label htmlFor="">Item Type</label><br />
                                <input
                                    type="checkbox"
                                    checked={values.bagCementBMPCC}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="">BAG CEMENT B-M(PCC)</label>
                                <br />
                                <input
                                    type="checkbox"
                                    checked={values.bagCementAMPCC}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="">BAG CEMENT A-M SPECIAL(PCC)</label>
                                <br />
                                <input
                                    type="checkbox"
                                    checked={values.bagCementGoldOPC}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="">BAG CEMENT GOLD(OPC)</label>
                                <br />







                            </div>
                        </div>
                        <div className="col-6">
                            <div className='p-2'>
                                <br></br><br></br><br></br>
                                <label htmlFor="">Customer Name</label><br></br>
                                <input type="text" required onChange={e => setValues({ ...values, customerName: e.target.value })} value={values.customerName}
                                    className="border border-secondary mt-2 rounded-2  form" />

                                <br></br>
                                <label htmlFor="">Remarks</label><br></br>
                                <input type="text" onChange={e => setValues({ ...values, remarks: e.target.value })} value={values.remarks}
                                    className="border border-secondary mt-2 rounded-2  form" />
                                <br></br>
                                <label htmlFor="">Attach File Link</label><br></br>
                                <input type="text" value={values.fileLink} onChange={e => setFileLink(e.target.value)} className="border border-secondary mt-2 rounded-2  form" />
                                <br></br>

                                <label htmlFor="">Organization Name</label><br></br>
                                <select
                                    className="border border-secondary mt-2 rounded-2 form"
                                    onChange={e => setValues({ ...values, selectedOrganization: e.target.value })}
                                    value={values.selectedOrganization}
                                >
                                    <option value="">Select Organization</option>
                                    {organizationNames.map((orgName, index) => (
                                        <option key={index} value={orgName}>
                                            {orgName}
                                        </option>
                                    ))}
                                </select><br></br><br></br>
                                <button className='btn btn-success' type="submit">Update</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>




















    );
}

export default UpdateCustomer;