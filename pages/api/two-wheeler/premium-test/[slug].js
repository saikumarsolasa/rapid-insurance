import Database from "serverHelper/database";
import { KotakPremiumCtoS, KotakPremiumStoC } from "serverHelper/serverSideFunctions/kotak/test";

Database.Connect();

export default function handler(req, res) {
    const { slug } = req.query;
    switch (slug) {
        case "client-to-server":
            if (req.method === "POST") KotakPremiumCtoS(req, res);
            break;
        case "server-to-client":
            if (req.method === "POST") KotakPremiumStoC(req, res);
            break;

        default:
            res.status(404).send("Something went wrong");
            break;
    }
}