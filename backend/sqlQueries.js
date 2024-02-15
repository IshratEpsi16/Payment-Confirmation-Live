// sqlQueries.js

const queries = {
  getCustomTableData:
    `select * from XXSSGIL_CASH_PAY_DET
    order by CREATION_DATE desc`,
  getAllData: `
      SELECT a1.LOOKUP_CODE PAYEE_ID, a1.meaning PAYEE_NAME, a1.description CASH_AMOUNT, 
             a1.tag MAIL_ADDRESS, TO_CHAR(A1.START_DATE_ACTIVE, 'DD-MON-YYYY') START_DATE, 
             TO_CHAR(A1.END_DATE_ACTIVE, 'DD-MON-YYYY') END_DATE,
             (SELECT TO_CHAR(SYSDATE, 'Mon-YYYY') FROM DUAL) CURRENT_PERIOD
      FROM apps.fnd_lookup_values a1, apps.fnd_lookup_types_VL a2
      WHERE a1.lookup_type = 'SSGIL_CASH_PAYMENT_INFO' AND a1.lookup_type = a2.lookup_type
      ORDER BY 3 ASC
    `,
  getNotificationsById: `
    select * 
    from XXCRM.ADMIN_SIGNUP_TABLE XAST,
     XXSSGIL_CASH_PAY_DET XCPD
     where 1=1
     and XAST.EMPLOYEE_ID = XCPD.PAYEE_ID
     AND  XCPD.STATUS = 'Sent' 
     AND XAST.EMPLOYEE_ID = :id
    `,
  getProfileInfoById: `
      SELECT * FROM XXCRM.ADMIN_SIGNUP_TABLE WHERE EMPLOYEE_ID = :empId
    `,
  updateStatus: `
  UPDATE XXCRM.XXSSGIL_CASH_PAY_DET
  SET STATUS = :newStatus,
      LAST_UPDATE_DATE = FROM_TZ(CAST(SYSDATE AS TIMESTAMP), 'UTC') AT TIME ZONE 'Asia/Dhaka'
  WHERE 1=1
  AND PAYEE_ID = :payeeId
  AND CURRENT_PERIOD = :currentPeriod
  AND STATUS = 'Sent'
`
  ,
  login: `
  SELECT EMPLOYEE_ID, EMPLOYEE_PASSWORD, ROLE, EMPLOYEE_NAME, PHONE_NUMBER, EMAIL
  FROM XXCRM.ADMIN_SIGNUP_TABLE
  WHERE EMPLOYEE_ID = :employee_id AND EMPLOYEE_PASSWORD = STANDARD_HASH(:employee_password)
    `,
  signup: `
  INSERT INTO XXCRM.ADMIN_SIGNUP_TABLE(Employee_ID, Employee_Name,NID_NO, Phone_Number, Email, Employee_Password, Confirm_Password)
  VALUES (:employee_id, :employee_name, :nid_no, :phone_number, :email,STANDARD_HASH(:employee_password) , STANDARD_HASH(:confirm_password))
    `,
  createRecord: `
      INSERT INTO XXCRM.XXSSGIL_CASH_PAY_DET(
        TRANSACTION_ID, PAYEE_ID, PAYEE_NAME, CASH_AMOUNT, STATUS, MAIL_ADDRESS, CURRENT_PERIOD, CREATION_DATE
      )
      VALUES (
        xxcrm.XXSSGIL_CASH_PAY_S.nextval, :payee_id, :payee_name, :cash_amount, 'Sent', :mail_address,
        TO_CHAR(TO_DATE(:current_period, 'MM/DD/YYYY HH:MI:SS AM'), 'Mon-YY'),
        FROM_TZ(CAST(SYSDATE AS TIMESTAMP), 'UTC') AT TIME ZONE 'Asia/Dhaka'
      )
    `,
    checkIdExists: `
    SELECT * FROM XXCRM.ADMIN_SIGNUP_TABLE WHERE Employee_ID = :employee_id
`,

    forgetpassword:`SELECT * FROM XXCRM.ADMIN_SIGNUP_TABLE WHERE EMPLOYEE_ID = :empId AND NID_NO = :nid`,
    updatepassword:`UPDATE XXCRM.ADMIN_SIGNUP_TABLE SET EMPLOYEE_PASSWORD = STANDARD_HASH(:newPassword), CONFIRM_PASSWORD = STANDARD_HASH(:confirmPassword) WHERE EMPLOYEE_ID = :empId`,
};

module.exports = queries;