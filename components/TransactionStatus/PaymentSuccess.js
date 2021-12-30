import styles from "./TransactionDetails.module.scss";
import { motion } from "framer-motion";
import { BsPatchCheckFill } from "react-icons/bs";
import TransactionDetails from "./TransactionDetails";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { KotakDownloadPolicyDocument, KotakSaveProposalAndPayment } from "helper/api";
const transactionAlertsVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.2,
            duration: 5,
            type: "spring",
            stiffness: 30,
        },
    },
};

const SuccessPage = ({ userDetails, transactionDetails, errorMessage }) => {
    const [document, setDocument] = useState("");
    const [documentLoading, setDocumentLoading] = useState(true);
    const [proposalLoading, setProposalLoading] = useState(true);

    const details = {
        companyName: userDetails?.data?.c_plan_name || null,
        transaction_id: userDetails?.txnid || null,
        bikeModel: userDetails?.data?.c_make_model || null,
        rto: userDetails?.data?.c_place_of_registration || null,
        idv: userDetails?.data?.c_idv || null,
        crn: userDetails?.data?.c_crn || null,
        basic_od: userDetails?.data?.c_basic_od_premium || null,
        third_party_premium: userDetails?.data?.c_basic_tp_premium || null,
        ncb_discount: userDetails?.data?.c_ncb_discount || null,
        gst_amount: userDetails?.data?.c_gst || null,
        net_premium: userDetails?.data?.c_net_premium || null,
    };

    useEffect(async () => { 
        const paymentAndProposal = {
            ...userDetails.data,
            ...transactionDetails.transaction_details,
        };
        try {
            setProposalLoading(true);
            const response = await KotakSaveProposalAndPayment(paymentAndProposal);
            console.log(response);
            if (!response.data.error) {
                setProposalLoading(false);
                const downloadDoc = await KotakDownloadPolicyDocument(response.data.data);
                console.log(downloadDoc);
                setDocumentLoading(false);
                setDocument(downloadDoc.data);
            } else {
                alert("Something went wrong...|, Please reload the page");
            }
        } catch (error) {
            alert("Something went wrong...|, Please reload the page");
        }

        // console.log(paymentAndProposal);
        // console.log(JSON.stringify(paymentAndProposal));
    }, []);

    return (
        <motion.div variants={transactionAlertsVariants} initial="hidden" animate="visible">
            <div className={styles.savePolicyAndDownload}>
                <div className={styles.savePolicy}>
                    {proposalLoading ? (
                        <CircularProgress color="success" />
                    ) : (
                        <div>
                            <h2>Proposal Saved Successfully</h2>
                            <div className={styles.download}>
                                {documentLoading ? (
                                    <CircularProgress color="success" />
                                ) : (
                                    <button>
                                        <a
                                            download="Policy Document"
                                            href={`data:application/pdf;base64,${document}`}
                                            title="Download pdf document"
                                        >
                                            Policy Document
                                        </a>
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.successPageWrapper}>
                <div className={styles.successMsgWrapper}>
                    <h1 className={styles.successIcon}>
                        <BsPatchCheckFill size="1em" color="green" />
                    </h1>
                    <h2 className="text-success p-2" style={{ textAlign: "center" }}>
                        Transaction Success
                    </h2>
                    <TransactionDetails details={details} />
                </div>
            </div>
        </motion.div>
    );
};

export default SuccessPage;
