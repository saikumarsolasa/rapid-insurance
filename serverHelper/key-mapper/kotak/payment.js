export const VerifyPaymentClientToServer = (server_object, txnid) => {
    const transaction_details = server_object.transaction_details[txnid];

    const client_object = {
        c_mih_pay_id: transaction_details.mihpayid || null,
        c_transaction_amount: transaction_details.amt || null,
        c_txnid: transaction_details.txnid || null,
        c_additional_charges: transaction_details.additional_charges || null,
        c_product_info: transaction_details.productinfo || null,
        c_bank_code: transaction_details.bankcode || null,
        c_transaction_date: transaction_details.addedon || null,
        c_payment_source: transaction_details.payment_source || null,
        c_card_type: transaction_details.card_type || null,
    };

    return client_object;
};
