const axios = require('axios');



export default function handler(req, res) {

     if(req.method == 'POST'){
          PostHandler(req, res)
     }
}


const PostHandler = async (req, res) => {
     console.log(req.body)
     // res.redirect("https://test.payu.in/_payment")
     res.status(200).send({message: "Hit"})
}


const payment_object = {
     key: 'an7rIU',
     txnid: "123467541",
     amount: "",
     productinfo: "",
     firstname: "",
     email: "",
     phone: "",
     lastname: "",
     address1: "",
     address2: "",
     city: "",
     state: "",
     country: "",
     zipcode: "",
     udf1: "",
     udf2: "",
     udf3: "",
     udf4: "",
     udf5: "",
     surl: "",
     furl: "",
     curl: "",
     hash: "",
     pg: "",
     codurl: "",
     drop_category: "",
     enforce_paymethod: "",
     custom_note: "",
     note_category: "",
     api_version: "",
     shipping_firstname: "",
     shipping_lastname: "",
     shipping_address1: "",
     shipping_address2: "",
     shipping_city: "",
     shipping_state: "",
     shipping_country: "",
     shipping_zipcode: "",
     shipping_phone: "",
     offer_key: "",
     partner_hold_time: "",
     items: "",
     Birthday: "",
     Gender: "",
     Ipurl: "",
     pre_authorize: "",
     transactionContext: "",
}
