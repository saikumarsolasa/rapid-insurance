
export default function handler(req, res) {
     if (req.method == "GET") {
         GetRouteHandler(req, res);
     } else if (req.method == "POST") {
         SavePaymentAndProposal(req, res);
     }
 }
 
 const GetRouteHandler = (req, res) => {
 
     res.status(200).json({ message: "No help" });
 };
 

 const SavePaymentAndProposal = (req, res) => {


     

 }
