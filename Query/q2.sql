select * from  XXSSGIL_CASH_PAY_DET
select * from XXCRM.NOTIFICATIONS
PAYEE_ID

select * from  XXCRM.ADMIN_SIGNUP_TABLE
EMPLOYEE_ID

select XCPD.PAYEE_ID,XCPD.PAYEE_NAME,XAST.EMPLOYEE_ID,XN.NOTIFICATIONS,XCPD.CURRENT_PERIOD
from XXSSGIL_CASH_PAY_DET XCPD,
 XXCRM.ADMIN_SIGNUP_TABLE XAST,
 XXCRM.NOTIFICATIONS XN
 where 1=1
 and XCPD.PAYEE_ID=XAST.EMPLOYEE_ID
 and  XCPD.PAYEE_ID = XN.PAYEE_ID
 and XAST.EMPLOYEE_ID =XN.PAYEE_ID
 --and XAST.EMPLOYEE_ID = :p_employee_id
 and XCPD.STATUS = 'Sent'
 
 
and   XCPD.CURRENT_PERIOD = :current_period



select * from 
XXSSGIL_CASH_PAY_DET XCPD,
 XXCRM.ADMIN_SIGNUP_TABLE XAST
where STATUS = 'Sent'
  and XCPD.PAYEE_ID=XAST.EMPLOYEE_ID
  
  
  select XCPD.PAYEE_ID,XCPD.PAYEE_NAME,XAST.EMPLOYEE_ID,XN.NOTIFICATIONS from XXSSGIL_CASH_PAY_DET XCPD, XXCRM.ADMIN_SIGNUP_TABLE XAST, XXCRM.NOTIFICATIONS XN where 1=1 and XCPD.PAYEE_ID=XAST.EMPLOYEE_ID and  XCPD.PAYEE_ID = XN.PAYEE_ID and XAST.EMPLOYEE_ID = XN.PAYEE_ID and XCPD.STATUS = 'Sent'
  
  
  SELECT XCPD.PAYEE_ID, XCPD.PAYEE_NAME, XAST.EMPLOYEE_ID, XN.NOTIFICATIONS FROM XXSSGIL_CASH_PAY_DET XCPD, XXCRM.ADMIN_SIGNUP_TABLE XAST, XXCRM.NOTIFICATIONS XN WHERE 1=1 AND XCPD.PAYEE_ID=XAST.EMPLOYEE_ID AND XCPD.PAYEE_ID = XN.PAYEE_ID AND XAST.EMPLOYEE_ID = XN.PAYEE_ID AND XCPD.STATUS = 'Sent' AND XAST.EMPLOYEE_ID = :p_employee_id
  
  
  select  XAST.EMPLOYEE_ID, XAST.EMPLOYEE_NAME, XAST.PHONE_NUMBER, XAST.EMAIL from  XXCRM.ADMIN_SIGNUP_TABLE XAST, XXSSGIL_CASH_PAY_DET XCPD where 1=1 and XCPD.PAYEE_ID=XAST.EMPLOYEE_ID and XAST.EMPLOYEE_ID = :P_EMPLOYEE_ID and XAST.ROLE = 'user'
  
  