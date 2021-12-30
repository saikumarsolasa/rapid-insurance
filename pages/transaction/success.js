import { useEffect, useState } from "react";
import { DecryptObject } from "helper/hashing";
import SuccessPage from "components/TransactionStatus/PaymentSuccess";
import { SavePaymentAndGetDetails } from "serverHelper/serverSideFunctions/kotak/payment";

const TransactionSuccess = ({ userDetails, transactionDetails, errorMessage }) => {

    useEffect(() => {}, []);

    return (
        <div>
            <SuccessPage userDetails={userDetails} transactionDetails={transactionDetails} errorMessage={errorMessage} />
        </div>
    );
};

export default TransactionSuccess;

export async function getServerSideProps(context) {
    const encryptedString = context.req.__NEXT_INIT_QUERY.response;
    const jsonObject = DecryptObject(encryptedString);

    if (jsonObject.data.c_company_name === "kotak") {
        const response = await SavePaymentAndGetDetails(jsonObject, "success");
        return {
            props: {
                userDetails: jsonObject,
                transactionDetails: response,
            },
        };
    }

    return {
        props: {
            userDetails: jsonObject,
        },
    };
}
