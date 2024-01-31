import React from 'react';

function Validation(values) {
    //alert("")
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
    if (values.employeeName === "") {
        error.employeeName = "Name should not be empty"
    }
    else {
        error.employeeName = ''
    }

    if (values.employeePassword === "") {
        error.employeePassword = "Name should not be empty"
    }
    else if (!password_pattern.test(values.employeePassword)) {
        error.employeePassword = "Email didn't match"

    }
    else {
        error.employeePassword = ''
    }
    return error




}

export default Validation;