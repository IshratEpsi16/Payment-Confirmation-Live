/* Formatted on 12/4/2023 11:47:03 AM (QP5 v5.163.1008.3004) */
  SELECT a1.LOOKUP_CODE PAYEE_ID,
         a1.meaning PAYEE_NAME,
         a1.description CASH_AMOUNT,
         a1.tag MAIL_ADDRESS,
         TO_CHAR (A1.START_DATE_ACTIVE, 'DD-MON-YYYY') START_DATE,
         TO_CHAR (A1.END_DATE_ACTIVE, 'DD-MON-YYYY') END_DATE,
         (SELECT TO_CHAR (SYSDATE, 'Mon-YYYY') FROM DUAL) CURRENT_PERIOD
    FROM apps.fnd_lookup_values a1, apps.fnd_lookup_types_VL a2
   WHERE a1.lookup_type = 'SSGIL_CASH_PAYMENT_INFO'
         AND a1.lookup_type = a2.lookup_type
ORDER BY 3 ASC
--------------------sequence-------------
 select XXCRM.XXSSGIL_CASH_PAY_S.nextval from dual