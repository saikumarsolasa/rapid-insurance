import axios from "axios";
import { KotakAccessTokenAll } from "serverHelper/auth/kotak_auth";
import { KotakPcPremiumClientToServerMapper, KotakPremiumClientToServer } from "serverHelper/key-mapper/kotak/premium";
import {
    KotakPcProposalClientToServerMapper,
    KotakSavePaymentAndProposal,
    KotakSavePaymentAndProposalClientToServer,
} from "serverHelper/key-mapper/kotak/proposal";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////// PRIVATE CAR - PREMIUM  /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const KotakPcPremiumCtoS = async (req, res) => {
    const client_object = { ...req.body };

    const PcPremiumClientToServer = async (client_object) => {
        const server_object = KotakPcPremiumClientToServerMapper(client_object);
        return server_object;
    };

    const response = await KotakAccessTokenAll(client_object, PcPremiumClientToServer);
    res.status(200).send({ response });
};

export const KotakPcPremiumStoC = async (req, res) => {
    const client_object = { ...req.body };

    const PcPremiumServerToClient = async (client_object) => {
        const { token, email } = client_object.authentication;
        const header_object = {
            headers: {
                "vTokenCode": token,
                "Content-Type": "application/json",
            },
        };

        delete client_object.authentication;

        const PremiumURL = `https://kgibridgeuat.kotakmahindrageneralinsurance.com/BPOS_PVTCAR_SERVICE/wsPrivateCarManagementServices.svc/Fn_Get_PrivateCar_Premium_Details_Partner/${email}`;

        try {
            const { data } = await axios.post(PremiumURL, client_object, header_object);
            return data;
            // if (data.vErrorMsg === "Success") {
            //     return { error: false, company: "kotak", data: data };
            // } else {
            //     return { error: true, company: "kotak", message: data.vErrorMsg };
            // }
        } catch (err) {
            return { error: true, company: "kotak", message: err.message };
        }
    };
    const response = await KotakAccessTokenAll(client_object, PcPremiumServerToClient);
    res.status(200).send({ response });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////// PRIVATE CAR - PROPOSAL  /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const KotakPcProposalCtoS = async (req, res) => {
    const client_object = { ...req.body };

    const PcProposalClientToServer = async (client_object) => {
        const server_object = KotakPcProposalClientToServerMapper(client_object);
        return server_object;
    };

    const response = await KotakAccessTokenAll(client_object, PcProposalClientToServer);

    res.status(200).send({ response });
};

export const KotakPcProposalStoC = async (req, res) => {
    const client_object = { ...req.body };

    const PcProposalServerToClient = async (client_object) => {
        const { token } = client_object.authentication;
        const header_object = {
            headers: {
                vTokenCode: token,
                "Content-Type": "application/json",
            },
        };

        delete client_object.authentication;

        const URL =
            "https://kgibridgeuat.kotakmahindrageneralinsurance.com/BPOS_PVTCAR_SERVICE/wsPrivateCarManagementServices.svc/Fn_Save_Partner_Private_Car_Proposal_Payment_Details/QPVTUI000475/BP000001";

        try {
            const { data } = await axios.post(URL, client_object, header_object);
            return data;
            // if (data.vErrorMsg === "Success") {
            //     return { error: false, company: "kotak", data: data };
            // } else {
            //     return { error: true, company: "kotak", message: data.vErrorMsg };
            // }
        } catch (err) {
            return { error: true, company: "kotak", message: err.message };
        }
    };

    const response = await KotakAccessTokenAll(client_object, PcProposalServerToClient);

    res.status(200).send({ response });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////// TWO WHEELER - PREMIUM  //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const KotakPremiumCtoS = async (req, res) => {
    const client_object = { ...req.body };

    const TwPremiumClientToServer = async (client_object) => {
        const server_object = KotakPremiumClientToServer(client_object);
        return server_object;
    };

    const response = await KotakAccessTokenAll(client_object, TwPremiumClientToServer);

    res.status(200).send({ response });
};

export const KotakPremiumStoC = async (req, res) => {
    const client_object = { ...req.body };

    const TwPremiumServerToClient = async (client_object) => {
        const { token } = client_object.authentication;
        const header_object = {
            headers: {
                vTokenCode: token,
                "Content-Type": "application/json",
            },
        };

        delete client_object.authentication;

        try {
            const { data } = await axios.post(process.env.KOTAK_TW_PREMIUM, client_object, header_object);
            if (data.ErrorMessage === null) {
                return { error: false, company: "kotak", data: data };
            } else {
                return { error: true, company: "kotak", message: data.ErrorMessage };
            }
        } catch (err) {
            return { error: true, company: "kotak", message: err.message };
        }
    };

    const response = await KotakAccessTokenAll(client_object, TwPremiumServerToClient);

    res.status(200).send({ response });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////// TWO WHEELER - PROPOSAL  //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const KotakSavePaymentAndProposalCtoS = async (req, res) => {
    const client_object = { ...req.body };

    const ProposalClientToServerHandler = async (client_object) => {
        const server_object = KotakSavePaymentAndProposalClientToServer(client_object);
        return server_object;
    };

    const response = await KotakAccessTokenAll(client_object, ProposalClientToServerHandler);

    res.status(200).send({ response });
};

export const KotakSavePaymentAndProposalStoC = async (req, res) => {
    const client_object = { ...req.body };

    const ProposalServerToClientHandler = async (client_object) => {
        const { token } = client_object.authentication;
        const header_object = {
            headers: {
                vTokenCode: token,
                "Content-Type": "application/json",
            },
        };

        delete client_object.authentication;

        try {
            const { data } = await axios.post(process.env.KOTAK_TW_PROPOSAL_PAYMENT_UAT, client_object, header_object);
            if (data.Fn_Save_Partner_Two_Wheeler_Proposal_Payment_DetailsResult.vErrorMessage.length === 0) {
                return { error: false, company: "kotak", data: data };
            } else {
                return {
                    error: true,
                    company: "kotak",
                    message: data.Fn_Save_Partner_Two_Wheeler_Proposal_Payment_DetailsResult.vErrorMessage,
                };
            }
        } catch (err) {
            return { error: true, company: "kotak", message: err.message };
        }
    };

    const response = await KotakAccessTokenAll(client_object, ProposalServerToClientHandler);

    res.status(200).send({ response });
};
