import Database from 'serverHelper/database';
Database.Connect();



export default function handler(req, res) {

     const { slug } = req.query;

     switch (slug) {
          case "verify-crn":
               if (req.method === "POST") {
                    VerifyCRN(req, res);
               }
               break;

          case "generate-crn":
               if (req.method === "GET") {
                    GenerateCRN(req, res);
               }
               break;

          default:
               res.status(404).send("Something went wrong")
               break;
     }
}



const VerifyCRN = async (req, res) => {

     try {
          const response = await (await Database.DB.query(`select crn from customers where txnid = '${req.body.crn}'`)).rowCount;
          const response1 = await (await Database.DB.query(`select crn from customers_otp where txnid = '${req.body.crn}'`)).rowCount;
          if (response !== 0 && response1 !== 0) {
               res.status(200).send({ error: true, message: "customer with CRN already exist" })
          } else {
               res.status(200).send({ error: false, message: "customer with CRN doesn't exist" })
          }
     } catch (error) {
          res.status(400).send({ error: true, message: `Error verifing customer CRN: ${error.message}` });
     }

}


const GenerateCRN = async (req, res) => {
     const randomNumber = Date.now("dd/MM/yyyy");
     const crn = Number(`5${randomNumber}`);

     res.status(200).send({ crn });
}

