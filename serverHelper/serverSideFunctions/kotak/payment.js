require("dotenv").config();
import crypto from "crypto";
import { URLSearchParams } from "url";
import fetch from "node-fetch";
import { VerifyPaymentClientToServer } from "serverHelper/key-mapper/kotak/payment";




export const PayUKotakPayment = (req, res) => {
    
    const encodedParams = new URLSearchParams();
    encodedParams.set("key", "JP***g");
    encodedParams.set("amount", "10.00");
    encodedParams.set("txnid", "xuBn5aNoDubwhe");
    encodedParams.set("firstname", "PayU User");
    encodedParams.set("email", "test@gmail.com");
    encodedParams.set("phone", "9876543210");
    encodedParams.set("productinfo", "iPhone");
    encodedParams.set("surl", "https://apiplayground-response.herokuapp.com/");
    encodedParams.set("furl", "https://apiplayground-response.herokuapp.com/");
    encodedParams.set("pg", "");
    encodedParams.set("bankcode", "");
    encodedParams.set("ccnum", "");
    encodedParams.set("ccexpmon", "");
    encodedParams.set("ccexpyr", "");
    encodedParams.set("ccvv", "");
    encodedParams.set("ccname", "");
    encodedParams.set("txn_s2s_flow", "");
    encodedParams.set(
        "hash",
        "bebfaaa500f9f8375de3ba147e95c69f8759d89536158553a95aa7d408e0afa105fe3167aa1d39deac9dc4722b69c574dfe17f3cc1678cc6b9551c8b86099b73"
    );
    const url = "https://test.payu.in/merchant/_payment";
    const options = {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/x-www-form-urlencoded" },
        body: encodedParams,
    };
    fetch(url, options)
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch((err) => console.error("error:" + err));
};




export const VerifyPaymentWithTxnid = async (req, res) => {
    const key = process.env.PAYU_KEY;
    const salt = process.env.PAYU_SALT;
    const var1 = req.body.txnid;
    const command = "verify_payment";

    const hashString = `${key}|${command}|${var1}|${salt}`;
    const hash = crypto.createHash("sha512").update(hashString).digest("hex");

    const encodedParams = new URLSearchParams();
    encodedParams.set("key", key);
    encodedParams.set("command", command);
    encodedParams.set("var1", var1);
    encodedParams.set("hash", hash);
    const url = "https://test.payu.in/merchant/postservice?form=2";
    const options = {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/x-www-form-urlencoded" },
        body: encodedParams,
    };

    const response = await fetch(url, options);
    const response_data = await response.json();

    if (response_data?.status === 1) {
        const client_object = VerifyPaymentClientToServer(response_data, var1);
        res.status(200).send({ error: false, transaction_details: response_data, client_object: client_object });
    } else {
        res.status(200).send({ error: true, message: response_data?.msg });
    }
};




export const SavePaymentAndGetDetails = async (jsonObject, status) => {
    const key = jsonObject.key;
    const var1 = jsonObject.txnid;
    const salt = jsonObject.salt;
    const crn = jsonObject?.data?.c_crn || 5668545;
    const command = "verify_payment";

    const hashString = `${key}|${command}|${var1}|${salt}`;
    const hash = crypto.createHash("sha512").update(hashString).digest("hex");

    const encodedParams = new URLSearchParams();
    encodedParams.set("key", key);
    encodedParams.set("command", command);
    encodedParams.set("var1", var1);
    encodedParams.set("hash", hash);
    const url = "https://test.payu.in/merchant/postservice?form=2";
    const options = {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/x-www-form-urlencoded" },
        body: encodedParams,
    };

    const response = await fetch(url, options);
    const response_data = await response.json();

    const store_transaction = {
        txnid: var1,
        crn: jsonObject.data.c_crn || null,
        customer_name: jsonObject.data.c_full_name || null,
        customer_mobile: jsonObject.data.c_mobile || null,
        company_name: jsonObject.data.c_company_name || null,
        status: status,
        plan_name: jsonObject.data.c_plan_name || null,
        transaction_response: JSON.stringify(response_data),
        customer_response: JSON.stringify(jsonObject.data),
    };

    const store_customer = {
        crn: jsonObject.data.c_crn || 5668545,
        txnid: var1,
        full_name: jsonObject.data.c_full_name || null,
        mobile: jsonObject.data.c_mobile || null,
        email: jsonObject.data.c_email || null,
        customer_response: JSON.stringify(jsonObject.data),
    };

    let valueIndex = (store_object) => {
        return Object.values(store_object)
            .map((item, index) => `$${index + 1}`)
            .join(", ");
    };

    try {
        const verify_transaction_id = await (
            await Database.DB.query(`select txnid from payment_transactions where txnid = ${var1}`)
        ).rowCount;
        if (verify_transaction_id === 0) {
            const transaction_response = await (
                await Database.DB.query(
                    `INSERT INTO payment_transactions(${Object.keys(store_transaction).join(
                        ", "
                    )}) VALUES (${valueIndex(store_transaction)})`,
                    Object.values(store_transaction)
                )
            ).rowCount;
            if (transaction_response) {
                console.log("Transaction Added Successfully");
            } else {
                console.log("Something went wrong while adding transaction");
            }
        } else {
            console.log("Transaction already exist");
        }
    } catch (error) {
        console.log("Something went wrong while validation or inserting transaction data in database");
    }

    try {
        const verify_crn = await (await Database.DB.query(`select crn from customers where crn = ${crn}`)).rowCount;
        if (verify_crn === 0) {
            const customer_response = await (
                await Database.DB.query(
                    `INSERT INTO customers(${Object.keys(store_customer).join(", ")}) VALUES (${valueIndex(
                        store_customer
                    )})`,
                    Object.values(store_customer)
                )
            ).rowCount;
            if (customer_response) {
                console.log("Customer Added Successfully");
            } else {
                console.log("Something went wrong while adding customer");
            }
        } else {
            console.log("Customer already exisit");
        }
    } catch (error) {
        console.log("Something went wrong while validation or inserting customer data in database");
    }

    const response_transaction = VerifyPaymentClientToServer(response_data, var1);

    return { error: false, message: "Success", transaction_details: response_transaction };
};
