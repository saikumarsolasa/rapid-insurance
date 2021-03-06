import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import crypto from 'crypto';
import { EncryptObject } from 'helper/hashing';
import { GenerateTransactionId, TransactionIdVerify } from 'helper/api';
import { CircularProgress } from '@mui/material';

const KotakPayNow = ({ data }) => {
  const [values, setValues] = useState({});
  const [disable, setDisable] = useState(true);

  // Merchant ID: 106955
  // Merchant Key: an7rIU
  // SALT: 8MUr8LS7
  // CardNumber: 5123456789012346
  // CVV: 123
  // Expiry: May 2025
  // OTP - 123456

  useEffect(async () => {
    const key = 'an7rIU';
    const productinfo = 'Bike';
    const salt = '8MUr8LS7';
    const hashString = '8MUr8LS7';
    let txnid;

    try {
      const response = await GenerateTransactionId();
      if (response.txnid) {
        txnid = response.txnid;
        setDisable(false);
      }
    } catch (err) {
      setDisable(false);
      alert(err);
      window.location.reload();
    }

    // const hashString = `${key}|${txnid}|${data.premium}|${productinfo}|${data.first_name}|${data.email}||||||${salt}`;
    const hashing = crypto.createHash('sha512').update(hashString).digest('hex');

    const encryptedObject = EncryptObject({ key, txnid, salt, data });
    const origin = window.location.origin;
    const surl = `${origin}/transaction/success?response=${encryptedObject}`;
    const furl = `${origin}/transaction/failure?response=${encryptedObject}`;
    const curl = `${origin}/transaction/cancel?response=${encryptedObject}`;

    const initialValues = {
      key: key,
      txnid: txnid,
      amount: data.c_net_premium,
      productinfo: productinfo,
      firstname: data.c_first_name,
      lastname: data.c_last_name,
      email: data.c_email,
      phone: data.c_mobile,
      address1: data.c_address_line1,
      address2: data.c_address_line2,
      city: data.c_city,
      state: data.c_state,
      country: 'india',
      zipcode: data.c_pincode,
      udf1: '',
      udf2: '',
      udf3: '',
      udf4: '',
      udf5: '',
      surl: surl,
      furl: furl,
      curl: curl,
      hash: hashing,
      pg: '',
      codurl: '',
      drop_category: '',
      enforce_paymethod: '',
      custom_note: '',
      note_category: '',
      api_version: '',
      shipping_firstname: '',
      shipping_lastname: '',
      shipping_address1: '',
      shipping_address2: '',
      shipping_city: '',
      shipping_state: '',
      shipping_country: '',
      shipping_zipcode: '',
      shipping_phone: '',
      offer_key: '',
      partner_hold_time: '',
      Items: '',
      Birthday: '',
      Gender: '',
      Ipurl: '',
      pre_authorize: '',
      transactionContext: '',
    };

    setValues(initialValues);
  }, []);

  return (
    <div>
      <form action="https://test.payu.in/_payment" method="post">
        <input type="hidden" name="key" value={values.key} />
        <input type="hidden" name="txnid" value={values.txnid ? values.txnid : ''} />
        <input type="hidden" name="amount" value={values.amount ? values.amount : ''} />
        <input type="hidden" name="productinfo" value={values.productinfo ? values.productinfo : ''} />
        <input type="hidden" name="firstname" value={values.firstname ? values.firstname : ''} />
        <input type="hidden" name="lastname" value={values.lastname ? values.lastname : ''} />
        <input type="hidden" name="email" value={values.email ? values.email : ''} />
        <input type="hidden" name="phone" value={values.phone ? values.phone : ''} />
        <input type="hidden" name="address1" value={values.address1 ? values.address1 : ''} />
        <input type="hidden" name="address2" value={values.address2 ? values.address2 : ''} />
        <input type="hidden" name="city" value={values.city ? values.city : ''} />
        <input type="hidden" name="state" value={values.state ? values.state : ''} />
        <input type="hidden" name="country" value={values.country ? values.country : ''} />
        <input type="hidden" name="zipcode" value={values.zipcode ? values.zipcode : ''} />
        <input type="hidden" name="udf1" value={values.udf1 ? values.udf1 : ''} />
        <input type="hidden" name="udf2" value={values.udf2 ? values.udf2 : ''} />
        <input type="hidden" name="udf3" value={values.udf3 ? values.udf3 : ''} />
        <input type="hidden" name="udf4" value={values.udf4 ? values.udf4 : ''} />
        <input type="hidden" name="udf5" value={values.udf5 ? values.udf5 : ''} />
        <input type="hidden" name="surl" value={values.surl ? values.surl : ''} />
        <input type="hidden" name="furl" value={values.furl ? values.furl : ''} />
        <input type="hidden" name="curl" value={values.curl ? values.curl : ''} />
        <input type="hidden" name="hash" value={values.hash ? values.hash : ''} />
        <input type="hidden" name="pg" value={values.pg ? values.pg : ''} />
        <input type="hidden" name="codurl" value={values.codurl ? values.codurl : ''} />
        <input type="hidden" name="drop_category" value={values.drop_category ? values.drop_category : ''} />
        <input type="hidden" name="enforce_paymethod" value={values.enforce_paymethod ? values.enforce_paymethod : ''} />
        <input type="hidden" name="custom_note" value={values.custom_note ? values.custom_note : ''} />
        <input type="hidden" name="note_category" value={values.note_category ? values.note_category : ''} />
        <input type="hidden" name="api_version" value={values.api_version ? values.api_version : ''} />
        <input type="hidden" name="shipping_firstname" value={values.shipping_firstname ? values.shipping_firstname : ''} />
        <input type="hidden" name="shipping_lastname" value={values.shipping_lastname ? values.shipping_lastname : ''} />
        <input type="hidden" name="shipping_address1" value={values.shipping_address1 ? values.shipping_address1 : ''} />
        <input type="hidden" name="shipping_address2" value={values.shipping_address2 ? values.shipping_address2 : ''} />
        <input type="hidden" name="shipping_city" value={values.shipping_city ? values.shipping_city : ''} />
        <input type="hidden" name="shipping_state" value={values.shipping_state ? values.shipping_state : ''} />
        <input type="hidden" name="shipping_country" value={values.shipping_country ? values.shipping_country : ''} />
        <input type="hidden" name="shipping_zipcode" value={values.shipping_zipcode ? values.shipping_zipcode : ''} />
        <input type="hidden" name="shipping_phone" value={values.shipping_phone ? values.shipping_phone : ''} />
        <input type="hidden" name="offer_key" value={values.offer_key ? values.offer_key : ''} />
        <input type="hidden" name="partner_hold_time" value={values.partner_hold_time ? values.partner_hold_time : ''} />
        <input type="hidden" name="items" value={values.items ? values.items : ''} />
        <input type="hidden" name="Birthday" value={values.Birthday ? values.Birthday : ''} />
        <input type="hidden" name="Gender" value={values.Gender ? values.Gender : ''} />
        <input type="hidden" name="Ipurl" value={values.Ipurl ? values.Ipurl : ''} />
        <input type="hidden" name="pre_authorize" value={values.pre_authorize ? values.pre_authorize : ''} />
        <input type="hidden" name="transactionContext" value={values.transactionContext ? values.transactionContext : ''} />
        <Button disabled={disable} type="submit">
          {disable ? <CircularProgress color="success" size={25} /> : 'Pay Now'}
        </Button>
      </form>
    </div>
  );
};

export default KotakPayNow;
