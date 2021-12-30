import { KotakAccessTokenAll } from 'serverHelper/auth/kotak_auth';
import Database from 'serverHelper/db/database';
import { KotakPremiumHandler } from 'serverHelper/serverSideFunctions/kotak/twoWheeler';

Database.Connect();

export default function handler(req, res) {
  if (req.method === 'POST') {
    PremiumHandler(req, res);
  }
}

////////////////////////////////////////////////////////////////////////////// MAIN HANDLERS  /////////////////////////////////////////////////

const PremiumHandler = async (req, res) => {
  const client_object = { ...req.body };

  // await Database.DB.query(
  //     `insert into customers_otp(full_name, mobile, email, insurance_values) values ('${client_object.full_name}', '${
  //         client_object.mobile
  //     }', '${client_object.email}', '${JSON.stringify(client_object)}')`
  // );

  const kotakResponse = await KotakAccessTokenAll(client_object, KotakPremiumHandler);
  const responseArray = [kotakResponse];

  res.status(200).send({ status: 200, data: responseArray });
};
