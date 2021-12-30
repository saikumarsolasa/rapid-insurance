import Database from "serverHelper/database";
import {
    KotakPolicyDocumentMainHandler,
    KotakPremiumMainHandler,
    KotakSaveProposalAndPaymentMainHandler,
} from "serverHelper/serverSideFunctions/kotak/twoWheeler";
import {
    KotakPremiumCtoS,
    KotakPremiumStoC,
    KotakSavePaymentAndProposalCtoS,
    KotakSavePaymentAndProposalStoC,
} from "serverHelper/serverSideFunctions/kotak/test";

Database.Connect();

export default function handler(req, res) {
    const { slug } = req.query;
    switch (slug) {
        case "premium":
            if (req.method === "POST") KotakPremiumMainHandler(req, res);
            break;
        case "save-proposal-and-payment":
            if (req.method === "POST") KotakSaveProposalAndPaymentMainHandler(req, res);
            break;
        case "policy-document":
            if (req.method === "POST") KotakPolicyDocumentMainHandler(req, res);
            break;
        case "premium-client-to-server":
            if (req.method === "POST") KotakPremiumCtoS(req, res);
            break;
        case "premium-server-to-client":
            if (req.method === "POST") KotakPremiumStoC(req, res);
            break;
        case "save-proposal-and-payment-client-to-server":
            if (req.method === "POST") KotakSavePaymentAndProposalCtoS(req, res);
            break;
        case "save-proposal-and-payment-server-to-client":
            if (req.method === "POST") KotakSavePaymentAndProposalStoC(req, res);
            break;

        default:
            res.status(404).send("Something went wrong");
            break;
    }
}
