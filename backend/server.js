const express = require('express');
const util = require('util');
const oracledb = require('oracledb');
const bcrypt = require('bcrypt');
require('dotenv').config();
const getConnectionAsync = util.promisify(oracledb.getConnection);
const cors = require('cors');
const app = express();
const queries = require('./sqlQueries');
oracledb.initOracleClient({ libDir: 'C:\\instantclient_19_19' });
const dbConfig = require('./dbConfig');
app.use(cors());
app.use(express.json());

// const dbConfig = {
//     user: 'XXCRM',
//     password: 'xxcrm#mrc',
//     connectionString: '10.27.1.174:1531/ebs_SSGPROD',
// };


app.get('/', (req, res) => {
    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            return;
        }

        const sql = queries.getAllData;
        connection.execute(sql, (err, result) => {
            if (err) {
                console.error('Error executing query:', err.message);
                connection.close();
                return;
            }

            // Get column names dynamically
            const columnNames = result.metaData.map(meta => meta.name);

            // Convert the result rows to JSON format dynamically
            const jsonData = result.rows.map(row => {
                const rowObject = {};
                columnNames.forEach((columnName, index) => {
                    rowObject[columnName] = row[index];
                });
                return rowObject;
            });

            // Send the JSON response
            res.json(jsonData);

            connection.close();
        });
    });
});

app.get('/customTableData', (req, res) => {
    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            return;
        }

        const sql = queries.getCustomTableData;
        connection.execute(sql, (err, result) => {
            if (err) {
                console.error('Error executing query:', err.message);
                connection.close();
                return;
            }

            // Get column names dynamically
            const columnNames = result.metaData.map(meta => meta.name);

            // Convert the result rows to JSON format dynamically
            const jsonData = result.rows.map(row => {
                const rowObject = {};
                columnNames.forEach((columnName, index) => {
                    rowObject[columnName] = row[index];
                });
                return rowObject;
            });

            // Send the JSON response
            res.json(jsonData);

            connection.close();
        });
    });
});





// app.get('/notifications', (req, res) => {
//     oracledb.getConnection(dbConfig, (err, connection) => {
//         if (err) {
//             console.error('Error connecting to the database:', err.message);
//             return;
//         }

//         const sql = "select * from  XXCRM.NOTIFICATIONS"
//         connection.execute(sql, (err, result) => {
//             if (err) {
//                 console.error('Error executing query:', err.message);
//                 connection.close();
//                 return;
//             }

//             // Get column names dynamically
//             const columnNames = result.metaData.map(meta => meta.name);

//             // Convert the result rows to JSON format dynamically
//             const jsonData = result.rows.map(row => {
//                 const rowObject = {};
//                 columnNames.forEach((columnName, index) => {
//                     rowObject[columnName] = row[index];
//                 });
//                 return rowObject;
//             });

//             // Send the JSON response
//             res.json(jsonData);

//             connection.close();
//         });
//     });
// });





app.get('/notifications/:id', (req, res) => {
    const id = req.params.id;
    // console.log('Route hit:', req.url);
    // console.log('id', id);

    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const sql = queries.getNotificationsById;



        connection.execute(sql, [id], { outFormat: oracledb.OUT_FORMAT_OBJECT }, (err, result) => {
            if (err) {
                console.error('Error executing query:', err.message);
                res.status(500).json({ error: 'Internal Server Error' });
                connection.close();
                return;
            }

            if (result.rows.length === 0) {
                res.status(404).json({ error: 'ID not found' });
            } else {
                res.json(result.rows);
            }

            connection.close();
        });
    });
});

app.get('/profileInfo/:empId', (req, res) => {
    const empId = req.params.empId;
    // console.log('Route hit:', req.url);
    // console.log('emp_id', empId);

    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const sql = queries.getProfileInfoById;



        connection.execute(sql, [empId], { outFormat: oracledb.OUT_FORMAT_OBJECT }, (err, result) => {
            if (err) {
                console.error('Error executing query:', err.message);
                res.status(500).json({ error: 'Internal Server Error' });
                connection.close();
                return;
            }

            if (result.rows.length === 0) {
                res.status(404).json({ error: 'ID not found' });
            } else {

                res.json(result.rows[0]);

            }
            // console.log('Profile Info:', result.rows[0])

            connection.close();
        });
    });
});
app.put('/updateStatus/:payeeId/:currentPeriod/:response', (req, res) => {
    const payeeId = req.params.payeeId;
    const currentPeriod = req.params.currentPeriod;
    const response = req.params.response;

    oracledb.getConnection(dbConfig, async (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        let newStatus;
        if (response.toLowerCase() === 'yes') {
            newStatus = 'closed';
        } else if (response.toLowerCase() === 'no') {
            newStatus = 'no';
        } else {
            res.status(400).json({ error: 'Invalid response value. Use "yes" or "no".' });
            connection.close();
            return;
        }

        const bindParams = {
            newStatus: newStatus,
            payeeId: payeeId,
            currentPeriod: currentPeriod
        };
        const sql = queries.updateStatus;
        try {
            const result = await connection.execute(sql, bindParams, { autoCommit: true });

            if (result.rowsAffected === 0) {
                res.status(404).json({ error: 'No matching record found for the given PAYEE_ID and status "Sent".' });
            } else {
                res.json({ message: 'Status updated successfully' });
            }
        } catch (error) {
            console.error('Error updating status:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            connection.close();
        }
    });
});




app.post('/login', (req, res) => {
    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            return res.status(500).json({ error: 'Database connection error' });
        }

        const sql = queries.login;

        const bindParams = {
            employee_id: req.body.employeeId,
            employee_password: req.body.employeePassword,

        };


        connection.execute(sql, bindParams, { autoCommit: true }, (err, result) => {
            if (err) {
                console.error('Error executing query:', err.message);
                connection.close();
                return res.status(500).json({ error: 'Error executing query', details: err.message });
            }

            // Log the entire result object to inspect its structure
            //  console.log('result:', result);

            if (result.rows.length > 0) {
                const user1 = result.rows[0];

                // Check if the ROLE information exists in the user1 array
                const role = user1[2]; // Assuming ROLE is in the third position (index 2)
                // console.log('password', user1[1])
                // console.log('role', user1[2])
                // console.log('name', user1[3])
                // console.log('phone number', user1[4])
                // console.log('ID', user1[0])
                // console.log('mail', user1[5])
                // console.log('role:', role); // Log the role to check its value

                if (role === 'admin') {
                    connection.close();
                    return res.json({ status: 'success', role: 'admin' });
                } else if (role == null) {
                    connection.close();
                    return res.json({ status: 'success', role: null });
                } else {
                    connection.close();
                    return res.status(401).json({ error: 'Invalid role' });
                }
            } else {
                // Invalid ID or password
                connection.close();
                return res.status(401).json({ error: 'Invalid ID or password' });
            }

        });
    });
});





app.post('/signup', (req, res) => {
    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            return res.status(500).json({ error: 'Database connection error' });
        }

        const sql = queries.signup;

        const bindVars = {
            employee_id: req.body.employeeId,
            employee_name: req.body.employeeName,
            nid_no: req.body.nidNo,
            phone_number: req.body.phoneNumber,
            email: req.body.email,
            employee_password: req.body.employeePassword,
            confirm_password: req.body.confirmPassword
        };

        connection.execute(sql, bindVars, { autoCommit: true }, (err, result) => {
            if (err) {
                console.error('Error executing query:', err.message);
                connection.close();
                return res.status(500).json({ error: 'Database query error' });
            }

            res.json({ message: 'Record created successfully' });

            connection.close();
        });
    });
});





app.post('/create', (req, res) => {
    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            return res.status(500).json({ error: 'Database connection error' });
        }
        //co
        const payee_id = req.body.payeeId;
        const payee_name = req.body.payeeName;
        const cash_amount = req.body.cashAmount;
        const mail_address = req.body.mailAddress;
        const current_period = req.body.currentPeriod;

        const sql = queries.createRecord;

        const bindVars = {
            payee_id: payee_id,
            payee_name: payee_name,
            cash_amount: cash_amount,
            mail_address: mail_address,
            current_period: current_period
        };

        connection.execute(sql, bindVars, { autoCommit: true }, (err, result) => {
            if (err) {
                console.error('Error executing query:', err.message);
                connection.close();
                return res.status(500).json({ error: 'Database query error' });
            }

            res.json({ message: 'Record created successfully' });

            connection.close();
        });
    });
});


// backend code
// Add this route to handle password reset
app.post('/forgetpassword', async (req, res) => {
    const { employeeId, nidNo } = req.body;
    
    // Query the database to check if the provided employee ID and NID exist
    const sql = queries.forgetpassword;
    const bindParams = { empId: employeeId, nid: nidNo };
    
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(sql, bindParams);
        
        if (result.rows.length > 0) {
            // If the user exists, navigate to '/authenticated'
            res.json({ message: 'User found. Password can be reset.', navigate: true });
        } else {
            // If the user does not exist, return unauthorized
            res.status(401).json({ error: 'Unauthorized. Invalid employee ID or NID number.', navigate: false });
        }
        
        connection.close();
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// Add a new route to update the user's password
// Add a new route to update the user's password
app.put('/updatepassword/:id', async (req, res) => {
    const { employeeId, newPassword, confirmPassword } = req.body;

    // Check if newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: "New password and confirm password do not match" });
    }

    // Update the password in the database using bind variables
    
    const sql = queries.updatepassword;
    const bindParams = { newPassword, confirmPassword, empId: employeeId };

    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(sql, bindParams, { autoCommit: true });

        // Check if the update was successful
        if (result.rowsAffected > 0) {
            res.json({ message: 'Password updated successfully' });
        } else {
            res.status(500).json({ error: 'Failed to update password' });
        }

        connection.close();
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});






app.listen(8081, () => {
    console.log('listening');
});