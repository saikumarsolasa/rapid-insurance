const insurance_fields = require("serverHelper/db/general_field.json");

export default function handler(req, res) {
    if(req.method == 'GET'){
        GetInsuranceDetails(req, res);
    }
}

const GetInsuranceDetails = (req, res) => {

    res.send({ status: 200, data: insurance_fields })
}