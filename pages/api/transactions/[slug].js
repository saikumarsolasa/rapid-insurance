import Database from 'serverHelper/database';
Database.Connect();



export default function handler(req, res) {

     const { slug } = req.query;

     switch (slug) {
          case "txnid-verify":
               if (req.method === "POST") {
                    TransactionIdVerify(req, res);
               }
               break;

          case "generate-txnid":
               if (req.method === "GET") {
                    GenerateTransactionId(req, res);
               }
               break;

          default:
               res.status(404).send("Something went wrong")
               break;
     }
}


const GenerateTransactionId = async (req, res) => {
     const randomNumber = Date.now();
     const txnid = Number(`9${randomNumber}`);

     res.status(200).send({ txnid });
}





const TransactionIdVerify = async (req, res) => {

     try {
          const response = await (await Database.DB.query(`select txnid from payment_transactions where txnid = '${req.body.txnid}'`)).rowCount;
          res.status(200).send({ data: response })
     } catch (error) {
          console.log(error)
          res.status(400).send({ data: error.message });
     }

}