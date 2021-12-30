import axios from "axios";
import Database from "serverHelper/db/database";
import { KotakAccessTokenAll } from "serverHelper/auth/kotak_auth";
import FormData from "form-data";
import { KotakPcPremiumClientToServerMapper, KotakPcPremiumServerToClientMapper } from "server_helper/key-mapper/kotak/premium";

/////////////////////////////////////////// PRIVATE CAR - PREMIUM HANDLER  //////////////////////////////////////////

export const KotakPCPremiumMainHandler = async (req, res) => {
    const client_object = { ...req.body };

    // await Database.DB.query(
    //     `insert into customers_otp(full_name, mobile, email, insurance_values) values ('${client_object.full_name}', '${
    //         client_object.mobile
    //     }', '${client_object.email}', '${JSON.stringify(client_object)}')`
    // );`

    const kotakResponse = await KotakAccessTokenAll(client_object, KotakPCPremiumHandler);
    res.status(200).send({ status: 200, data: kotakResponse });
};

export const KotakPCPremiumHandler = async (client_object) => {
    const { token, email } = client_object.authentication;
    const header_object = {
        headers: {
            vTokenCode: token,
            "Content-Type": "application/json",
        },
    };

    const server_object = KotakPcPremiumClientToServerMapper(client_object);

    if (server_object.error) {
        return { error: true, company_name: "kotak", data: server_object.message };
    }

    const PremiumURL = `https://kgibridgeuat.kotakmahindrageneralinsurance.com/BPOS_PVTCAR_SERVICE/wsPrivateCarManagementServices.svc/Fn_Get_PrivateCar_Premium_Details_Partner/${email}`;

    try {
        const { data } = await axios.post(PremiumURL, server_object.data, header_object);
        if (data.vErrorMsg === "Success") {
            const resposeData = KotakPcPremiumServerToClientMapper(data);
            return { error: false, company: "kotak", data: resposeData };
            // return { error: false, company: "kotak", data: data };
        } else {
            return { error: true, company: "kotak", message: data.vErrorMsg };
        }
    } catch (err) {
        return { error: true, company_name: "kotak", message: err.message };
    }
};

/////////////////////////////////////////// PRIVATE CAR - PROPOSAL HANDLER  //////////////////////////////////////////

export const KotakPCProposalMainHandler = async (req, res) => {
    const client_object = { ...req.body };

    // await Database.DB.query(
    //     `insert into customers_otp(full_name, mobile, email, insurance_values) values ('${client_object.full_name}', '${
    //         client_object.mobile
    //     }', '${client_object.email}', '${JSON.stringify(client_object)}')`
    // );

    const kotakResponse = await KotakAccessTokenAll(client_object, KotakPCProposalHandler);
    res.status(200).send({ status: 200, data: kotakResponse });
};

export const KotakPCProposalHandler = async (client_object) => {
    const server_object = KotakPcPremiumClientToServerMapper(client_object);
    return server_object;
};

/////////////////////////////////////////// PRIVATE CAR - POLICY DOCUMENT HANDLER  //////////////////////////////////////////

export const KotakPCPolicyDocumentMainHandler = async (req, res) => {};

export const KotakPCPolicyDocumentHandler = async (req, res) => {};
