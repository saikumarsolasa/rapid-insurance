import axios from "axios";
import Database from "serverHelper/db/database";
import { KotakAccessTokenAll } from "serverHelper/auth/kotak_auth";
import FormData from "form-data";
import {
    KotakTwProposalClientToServer,
    KotakTwProposalServerToClientMapper,
} from "serverHelper/key-mapper/kotak/proposal";
import { KotakTwPremiumClientToServerMapper, KotakTwPremiumServerToClientMapper } from "serverHelper/key-mapper/kotak/premium";

/////////////////////////////////////////// TWO WHEELER -  PREMIUM HANDLER  //////////////////////////////////////////

export const KotakPremiumMainHandler = async (req, res) => {
    const client_object = { ...req.body };

    // await Database.DB.query(
    //     `insert into customers_otp(full_name, mobile, email, insurance_values) values ('${client_object.full_name}', '${
    //         client_object.mobile
    //     }', '${client_object.email}', '${JSON.stringify(client_object)}')`
    // );`

    const kotakResponse = await KotakAccessTokenAll(client_object, KotakPremiumHandler);

    res.status(200).send({ status: 200, data: kotakResponse });
};

export const KotakPremiumHandler = async (client_object) => {
    const { token } = client_object.authentication;
    const header_object = {
        headers: {
            vTokenCode: token,
            "Content-Type": "application/json",
        },
    };

    const server_object = KotakTwPremiumClientToServerMapper(client_object);

    if (server_object.error) {
        return { error: true, company_name: "kotak", data: server_object.message };
    }

    try {
        const { data } = await axios.post(process.env.KOTAK_TW_PREMIUM, server_object.data, header_object);
        if (data.ErrorMessage === null) {
            const clientData = KotakTwPremiumServerToClientMapper(data.TwoWheelerResponseWithCover);
            console.log(clientData);
            return { error: false, company_name: "kotak", data: clientData };
        } else {
            return { error: true, company_name: "kotak", message: data.ErrorMessage };
        }
    } catch (err) {
        return { error: true, company_name: "kotak", message: err.message };
    }
};

/////////////////////////////////////////// TWO WHEELER - PROPOSAL HANDLER  //////////////////////////////////////////

export const KotakSaveProposalAndPaymentMainHandler = async (req, res) => {
    const client_object = { ...req.body };

    // await Database.DB.query(
    //     `insert into customers_otp(full_name, mobile, email, insurance_values) values ('${client_object.full_name}', '${
    //         client_object.mobile
    //     }', '${client_object.email}', '${JSON.stringify(client_object)}')`
    // );

    const kotakResponse = await KotakAccessTokenAll(client_object, KotakSaveProposalAndPaymentHandler);

    res.status(200).send({ status: 200, data: kotakResponse });
};

export const KotakSaveProposalAndPaymentHandler = async (client_object) => {
    const { token } = client_object.authentication;
    const header_object = {
        headers: {
            vTokenCode: token,
            "Content-Type": "application/json",
        },
    };

    const server_object = KotakTwProposalClientToServer(client_object);

    if (server_object.error) {
        return { error: true, company_name: "kotak", data: server_object.message };
    }

    try {
        const { data } = await axios.post(process.env.KOTAK_TW_PROPOSAL_PAYMENT_UAT, server_object, header_object);

        if (data.Fn_Save_Partner_Two_Wheeler_Proposal_Payment_DetailsResult.vErrorMessage.length === 0) {
            const resposeData = KotakTwProposalServerToClientMapper(data);
            return { error: false, company: "kotak", data: resposeData };
        } else {
            return {
                error: true,
                company: "kotak",
                message: data.Fn_Save_Partner_Two_Wheeler_Proposal_Payment_DetailsResult.vErrorMessage,
            };
        }
    } catch (err) {
        return { error: true, company_name: "kotak", message: err.message };
    }
};

/////////////////////////////////////////// TWO WHEELER - POLICY DOCUMENT HANDLER  ///////////////////////////////////////////

export const KotakPolicyDocumentMainHandler = async (req, res) => {
    const client_object = { ...req.body };

    // await Database.DB.query(
    //     `insert into customers_otp(full_name, mobile, email, insurance_values) values ('${client_object.full_name}', '${
    //         client_object.mobile
    //     }', '${client_object.email}', '${JSON.stringify(client_object)}')`
    // );

    const kotakResponse = await KotakAccessTokenAll(client_object, KotakPolicyDocumentHandler);
    res.status(200).send({ status: 200, data: kotakResponse });
};

export const KotakPolicyDocumentHandler = async (client_object) => {
    const { token, email } = client_object.authentication;
    const data = new FormData();
    const header_object = {
        headers: {
            vTokenCode: token,
            "Content-Type": "application/json",
        },
    };

    const { c_proposal_number, c_policy_number, c_product_code } = client_object;

    const URL = `${process.env.KOTAK_POLICY_DOCUMENT}/${c_proposal_number}/${c_policy_number}/${c_product_code}/${email}`;
    // const URL = `${process.env.KOTAK_POLICY_DOCUMENT}/202109150002055/1039764700/3191/${email}`;
    try {
        const { data } = await axios.get(URL, header_object);
        return data;
    } catch (err) {
        return err.message;
    }
};

