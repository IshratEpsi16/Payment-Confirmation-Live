CREATE TABLE XXCRM.NOTIFICATIONS (
    PAYEE_ID varchar(255),
    PAYEE_NAME varchar(255),
   Notifications varchar(255)

)
commit
select * from  XXCRM.NOTIFICATIONS
INSERT INTO XXCRM.NOTIFICATIONS 
VALUES (76,'Masudur Rahman','did you receive your payment for ')
commit
select * from XXCRM.ADMIN_TABLE
where EMAIL= ? and Employee_Password = ?

SELECT * from XXCRM.ADMIN_TABLE Where EMAIL = ? and Employee_Password = ?

SELECT * FROM XXCRM.ADMIN_TABLE WHERE EMAIL = :email AND Employee_Password = :password
select * from XXCRM.ADMIN_TABLE

ALTER TABLE  XXCRM.ADMIN_TABLE
ADD COLUMN phone_number VARCHAR(15)
-------------
CREATE TABLE XXCRM.ADMIN_SIGNUP_TABLE (
    Employee_ID varchar(255),
    Employee_Name varchar(255),
    Phone_Number varchar(2555),
    Email varchar(255),
    Employee_Password varchar(255),
   Confirm_Password varchar(255)

)
DROP TABLE  XXCRM.NOTIFICATIONS
commit
SELECT * FROM XXCRM.ADMIN_SIGNUP_TABLE WHERE Employee_ID = :employee_id AND Employee_Password = :employee_password
INSERT INTO XXCRM.ADMIN_SIGNUP_TABLE
VALUES (6930,'Ishrat Jahan Epsi','01531741539','ishrat.j@sevenringscement.com','Epsi69#@','Epsi69#@')
commit
 Employee_ID,Employee_Name,Phone_Number,Email,Employee_Password, Confirm_Password
select * from  XXCRM.ADMIN_SIGNUP_TABLE

 DELETE FROM XXCRM.ADMIN_SIGNUP_TABLE
WHERE EMPLOYEE_ID in ('2','5','4','6930')
--lookup query
SELECT 
a1.LOOKUP_CODE PAYEE_ID,
       a1.meaning PAYEE_NAME,
       a1.description CASH_AMOUNT,
       a1.tag MAIL_ADDRESS,
TO_CHAR(A1.START_DATE_ACTIVE,'DD-MON-YYYY') START_DATE,
TO_CHAR(A1.END_DATE_ACTIVE,'DD-MON-YYYY') END_DATE
  FROM apps.fnd_lookup_values a1, apps.fnd_lookup_types_VL a2
 WHERE a1.lookup_type = 'SSGIL_CASH_PAYMENT_INFO'
 AND a1.lookup_type = a2.lookup_type
 order by  3  asc
 
 -----details custom table
 select * from XXSSGIL_CASH_PAY_DET
 
 -- Assume you have a table named "your_table" with a column named "old_column_name"
ALTER TABLE XXSSGIL_CASH_PAY_DET
RENAME COLUMN  CURRENT_PERIOD1  TO   CURRENT_PERIOD

-- Assume you have a table named "your_table" and you want to add a new column named "new_column" with the data type INT
ALTER TABLE XXSSGIL_CASH_PAY_DET
ADD Acknowledgement varchar(200)
------main table------------
select * from  XXSSGIL_CASH_PAY_DET
INSERT INTO XXCRM.XXSSGIL_CASH_PAY_DET(
 
            TRANSACTION_ID, PAYEE_ID, PAYEE_NAME, CASH_AMOUNT, MAIL_ADDRESS, CURRENT_PERIOD, CREATION_DATE)
 
            VALUES (xxcrm.XXSSGIL_CASH_PAY_S.nextval, :payee_id, :payee_name, :cash_amount, :mail_address,
 
            to_char(:current_period,'MON-YY'), FROM_TZ(CAST(SYSDATE AS TIMESTAMP), 'UTC') AT TIME ZONE 'Asia/Dhaka')
--adding role column in XXCRM.ADMIN_SIGNUP_TABLE --------------
ALTER TABLE XXCRM.ADMIN_SIGNUP_TABLE
ADD Role VARCHAR(255)

select * from XXCRM.ADMIN_SIGNUP_TABLE where ROLE is null

UPDATE XXCRM.NOTIFICATIONS
SET  notifications= 'did you receive your payment for '
WHERE PAYEE_ID = '178'
commit
--------------
select * from   XXSSGIL_CASH_PAY_DET
DELETE NOTIFICATIONS FROM  XXSSGIL_CASH_PAY_DET
WHERE status = 'Sent' 
ALTER TABLE  XXSSGIL_CASH_PAY_DET
DROP COLUMN NOTIFICATIONS 
commit
DELETE FROM  XXCRM.XXSSGIL_CASH_PAY_DET
WHERE status = 'Sent' 
commit
select * from  XXSSGIL_CASH_PAY_DET
ALTER TABLE  XXSSGIL_CASH_PAY_DET
RENAME COLUMN ATTRIBUTE1 TO Notifications
UPDATE XXSSGIL_CASH_PAY_DET
SET Notifications = 'Did you receive your payment?'
WHERE PAYEE_ID = '76'


select XCPD.PAYEE_ID,XAST.EMPLOYEE_ID
from XXSSGIL_CASH_PAY_DET XCPD,
 XXCRM.ADMIN_SIGNUP_TABLE XAST
 where 1=1
 and XCPD.PAYEE_ID=XAST.EMPLOYEE_ID

select XCPD.PAYEE_ID,XCPD.PAYEE_NAME,XAST.EMPLOYEE_ID,XN.NOTIFICATIONS from XXSSGIL_CASH_PAY_DET XCPD, XXCRM.ADMIN_SIGNUP_TABLE XAST, XXCRM.NOTIFICATIONS XN where 1=1 and XCPD.PAYEE_ID=XAST.EMPLOYEE_ID and  XCPD.PAYEE_ID = XN.PAYEE_ID and XAST.EMPLOYEE_ID = XN.PAYEE_ID and XCPD.STATUS = 'Sent' and xast.employee_id = :P_employee_id
select * from wf_notifications 
 where SUBJECT like  '%345369%'
 
 
 
 and ITEM_KEY= '345369-13638'
 
 
 select XCPD.PAYEE_ID,XCPD.PAYEE_NAME,XAST.EMPLOYEE_ID,XN.NOTIFICATIONS 
 from XXSSGIL_CASH_PAY_DET XCPD,
  XXCRM.ADMIN_SIGNUP_TABLE XAST, 
  XXCRM.NOTIFICATIONS XN 
 where 1=1 
 and XCPD.PAYEE_ID=XAST.EMPLOYEE_ID 
 and  XCPD.PAYEE_ID = XN.PAYEE_ID 
 and XAST.EMPLOYEE_ID = XN.PAYEE_ID 
 and XCPD.STATUS = 'Sent'
 and XAST.EMPLOYEE_ID = :P_EMPLOYEE_ID 
 DELETE FROM XXCRM.ADMIN_SIGNUP_TABLE
select * from XXSSGIL_CASH_PAY_DET
 
 insert into login_form (user_name,encrypted_password) values (:user_name,STANDARD_HASH(:passwordd))
 
 INSERT INTO XXCRM.ADMIN_SIGNUP_TABLE(Employee_ID, Employee_Name, Phone_Number, Email, Employee_Password, Confirm_Password)
      VALUES (:employee_id, :employee_name, :phone_number, :email,STANDARD_HASH(:employee_password) , STANDARD_HASH(:confirm_password))
      
      select * from XXCRM.ADMIN_SIGNUP_TABLE
      
      SELECT EMPLOYEE_ID, EMPLOYEE_PASSWORD, ROLE, EMPLOYEE_NAME, PHONE_NUMBER, EMAIL
      FROM XXCRM.ADMIN_SIGNUP_TABLE
      WHERE EMPLOYEE_ID = :employee_id AND EMPLOYEE_PASSWORD = STANDARD_HASH(:employee_password)
      
      UPDATE XXCRM.ADMIN_SIGNUP_TABLE
SET ROLE = 'admin'
WHERE EMPLOYEE_ID = '6930'
commit
select * from  XXCRM.ADMIN_SIGNUP_TABLE
DELETE FROM  XXCRM.ADMIN_SIGNUP_TABLE
WHERE EMPLOYEE_ID in( '178','12345678998888888' ,'1234567890','1111111112','9898','121','23222','222','218')
commit
--password Salim98#, Masud98#@

    UPDATE XXCRM.XXSSGIL_CASH_PAY_DET
    SET STATUS = :newStatus
    WHERE CURRENT_PERIOD = :currentPeriod AND STATUS = 'Sent'
    and PAYEE_ID = :payeeId
    
    
DELETE FROM  XXCRM.XXSSGIL_CASH_PAY_DET
WHERE STATUS = 'sent'
commit
-------------forget password------------
UPDATE  XXCRM.ADMIN_SIGNUP_TABLE 
SET  EMPLOYEE_PASSWORD= '12345'
WHERE EMPLOYEE_ID = '222'
commit