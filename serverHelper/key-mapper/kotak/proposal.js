import { differenceInYears, format } from "date-fns";
import { errorResponse, splitRegistrationNumber } from "serverHelper/helperFunctions";

export let KotakTwProposalClientToServer = (client) => {
    if (!client.c_workflow_id) return errorResponse("Workflow ID is required");
    if (!client.c_quote_id) return errorResponse("Quote ID is required");

    ///////////////////////////  CUSTOMER DETAILS ////////////////////////////

    let vCustomerFirstName = "";
    let vCustomerMiddleName = "";
    let vCustomerLastName = "";
    let vCustomerEmail = "";
    let vCustomerMobile = "";
    let vCustomerDOB = "";
    let vCustomerSalutation = "";
    let vCustomerGender = "";
    let vOrganizationName = "";
    let vOrganizationContactName = "";
    let vOrganizationEmail = "";
    let vOrganizationMobile = "";
    let vOrganizationPincode = "";
    let vOrganizationAddressLine1 = "";
    let vOrganizationTANNumber = "";
    let vOrganizationGSTNumber = "";

    if (client.c_customer_type.toLowerCase() === "i") {
        if (client.c_full_name) {
            if (client.c_full_name.split(" ").length > 1) {
                vCustomerFirstName = client.c_full_name.split(" ")[0];
                vCustomerLastName = client.c_full_name.split(" ")[1];
            } else {
                vCustomerFirstName = client.c_full_name;
                vCustomerLastName = client.c_full_name;
            }
        }
        vCustomerMiddleName = "";
        vCustomerEmail = client.c_email ? client.c_email : "";
        vCustomerMobile = client.c_mobile ? client.c_mobile : "";
        vCustomerDOB = client.c_dob ? format(new Date(client.c_dob), "dd/MM/yyyy") : "";
        vCustomerSalutation = client.c_title ? client.c_title : "";
        vCustomerGender = client.c_gender ? client.c_gender : "";
    } else if (client.c_customer_type.toLowerCase() === "c") {
        vOrganizationName = "";
        vOrganizationContactName = "";
        vOrganizationEmail = "";
        vOrganizationMobile = "";
        vOrganizationPincode = "";
        vOrganizationAddressLine1 = "";
        vOrganizationTANNumber = "";
        vOrganizationGSTNumber = "";
    }

    ////////////////////////////////  SAVE PROPOSAL DETAILS   ///////////////////////////////////////

    let dBranchInwardDate = "23/04/2021";
    let vRegistrationNumber1 = "";
    let vRegistrationNumber2 = "";
    let vRegistrationNumber3 = "";
    let vRegistrationNumber4 = "";
    let vEngineNumber = "DABC564668";
    let vChassisNumber = "12349123541267811";

    dBranchInwardDate = format(new Date(), "dd/MM/yyyy");

    if (client.c_nominee_dob && differenceInYears(new Date(), new Date(client.c_nominee_dob)) < 18) {
        if (!client.c_nominee_appointee_name && !client.c_nominee_appointee_relationship) {
            return errorResponse(
                "As the nominee age is less than 18, Nominee Appointee Name and Relationship is required"
            );
        }
    }
    console.log(client.c_rollover);
    if (client.c_rollover) {
        if (client.c_registration_number) {
            if (client.c_rto_registration_code) {
                if (client.c_registration_number.toLowerCase().includes(client.c_rto_registration_code.toLowerCase())) {
                    const response = splitRegistrationNumber(client.c_registration_number);
                    vRegistrationNumber1 = response.num1;
                    vRegistrationNumber2 = response.num2;
                    vRegistrationNumber3 = response.num3;
                    vRegistrationNumber4 = response.num4;
                } else {
                    return errorResponse("Registartion Number and Registration Code doesn't match");
                }
            }
        } else {
            return errorResponse("If the policy is rollover then it must have a registration number");
        }
    } else {
        if (client.c_rto_registration_code) {
            vRegistrationNumber1 = client.c_rto_registration_code.slice(0, 2);
            vRegistrationNumber2 = client.c_rto_registration_code.slice(2, 4);
        } else {
            return errorResponse("If the policy is a new business then it must have a valid registration code");
        }
    }

    if (client.c_engine_number.length >= 8) {
        vEngineNumber = client.c_engine_number;
    } else {
        return errorResponse("EngineNumber should be at least 8 characters long");
    }

    if (client.c_rollover) {
        if (client.c_chassis_number.length >= 8) {
            vChassisNumber = client.c_chassis_number;
        } else {
            return errorResponse("ChassisNumber for rollover should be at least 8 characters long");
        }
    } else {
        if (client.c_chassis_number.length <= 17) {
            vChassisNumber = client.c_chassis_number;
        } else {
            return errorResponse("ChassisNumber for new business should be allowed only 17 characters ");
        }
    }

    ///////////////////////////////////  PAYMENT DETAILS   ///////////////////////////////

    let vPaymentNumber = "";
    let nPremiumAmount = "";
    let vInstrumentDate;
    let vInstrumentAmount;
    let vInstrumentNo;

    if (client.c_txnid) {
        vPaymentNumber = client.c_txnid;
        vInstrumentNo = client.c_txnid;
    } else {
        return errorResponse("Transaction ID is mandatory to save proposal and payment details");
    }

    if (client.c_net_premium) {
        nPremiumAmount = parseFloat(client.c_net_premium);
    } else {
        return errorResponse("Please send net premium to save proposal and payment details");
    }

    if (new Date(client.c_transaction_date)) {
        vInstrumentDate = format(new Date(client.c_transaction_date), "dd/MM/yyyy");
    } else {
        return errorResponse("Missing info of Transaction Date");
    }
    if (Number(client.c_transaction_amount)) {
        vInstrumentAmount = parseFloat(client.c_transaction_amount);
    } else {
        return errorResponse("Missing info of Transaction Amount");
    }

    const proposalAndPayment = {
        objclsPartnerTwoWheelerSaveProposal: {
            objTwoWheelerSaveProposalRequest: {
                objCustomerDetails: {
                    vCustomerId: "",
                    vCustomerType: client.c_customer_type ? client.c_customer_type : "",
                    vIDProof: "0",
                    vIDProofDetails: "",
                    vCustomerFirstName,
                    vCustomerMiddleName,
                    vCustomerLastName,
                    vCustomerEmail,
                    vCustomerMobile,
                    vCustomerDOB,
                    vCustomerSalutation,
                    vCustomerGender,
                    vOccupationCode: "1",
                    vMaritalStatus: client.c_maritial_status ? client.c_maritial_status : "",
                    vCustomerAadharNumber: client.c_aadhar_number ? client.c_aadhar_number : "",
                    vCustomerPanNumber: client.c_pan_number ? client.c_pan_number : "",
                    vCustomerPassportNumber: client.c_passport_number ? client.c_passport_number : "",
                    vCustomerVoterIdNumber: client.c_voter_id_number ? client.c_voter_id_number : "",
                    vCustomerPincode: client.c_pincode ? client.c_pincode : "",
                    vCustomerPincodeLocality: client.c_pincode_locality ? client.c_pincode_locality : "",
                    vCustomerStateCd: client.c_state_code ? client.c_state_code : "",
                    vCustomerStateName: client.c_state ? client.c_state : "",
                    vCustomerCityDistrict: client.c_district ? client.c_district : "",
                    vCustomerCityDistrictCd: client.c_district_code ? client.c_district_code : "",
                    vCustomerCity: client.c_city ? client.c_city : "",
                    vCustomerCityCd: client.c_city_code ? client.c_city_code : "",
                    vCustomerAddressLine1: client.c_address_line1 ? client.c_address_line1 : "",
                    vCustomerAddressLine2: client.c_address_line2 ? client.c_address_line2 : "",
                    vCustomerAddressLine3: client.c_address_line3 ? client.c_address_line3 : "",
                    vCustomerCRNNumber: client.c_crn ? client.c_crn : "",
                    vOrganizationName,
                    vOrganizationContactName,
                    vOrganizationEmail,
                    vOrganizationMobile,
                    vOrganizationPincode,
                    vOrganizationAddressLine1,
                    vOrganizationTANNumber,
                    vOrganizationGSTNumber,
                },
                vUserLoginId: "BP000001",
                vWorkFlowID: client.c_workflow_id ? client.c_workflow_id : "",
                vQuoteID: client.c_quote_id ? client.c_quote_id : "",
                vNomineeName: client.c_nominee_full_name ? client.c_nominee_full_name : "",
                vNomineeDOB: client.c_nominee_dob ? format(new Date(client.c_nominee_dob), "dd/MM/yyyy") : "",
                vNomineeRelationship: client.c_nominee_relation ? client.c_nominee_relation : "",
                vNomineeAppointeeName: client.c_nominee_appointee_name ? client.c_nominee_appointee_name : "",
                vNomineeAppointeeRelationship: client.c_nominee_appointee_relationship
                    ? client.c_nominee_appointee_relationship
                    : "",
                vRMCode: "",
                dBranchInwardDate,
                vBranchInwardNumber: "",
                vCustomerCRNNumber: client.c_crn ? client.c_crn : "",
                vRegistrationNumber1,
                vRegistrationNumber2,
                vRegistrationNumber3,
                vRegistrationNumber4,
                vEngineNumber,
                vChassisNumber,
                vPrevInsurerCode: "",
                vPrevInsurerExpiringPolicyNumber: client.c_prev_policy_number ? client.c_prev_policy_number : "",
                vColourOfvehicle: client.c_vehicle_colour ? client.c_vehicle_colour : "",
                vPreInspectionNumber: "",
                bIsVehicleFinanced: client.c_is_vehicle_financed ? client.c_is_vehicle_financed : false,
                vFinancierAddress: "",
                vFinancierAgreementType: "",
                vFinancierCode: "",
                vFinancierName: "",
            },
            objParaPaymentDetails: {
                vCdAccountNumber: "",
                vWorkFlowId: client.c_workflow_id ? client.c_workflow_id : "",
                vQuoteId: client.c_quote_id ? client.c_quote_id : "",
                vProposalId: "",
                vIntermediaryCode: "3169170000",
                vCustomerId: "",
                vPaymentNumber,
                nPremiumAmount,
                vTransactionFlag: "BPOS",
                vLoggedInUser: "BP000001",
                vProductInfo: "Two Wheeler Comprehensive",
                vPaymentModeCode: "PA",
                vPaymentModeDescription: "PAYMENT AGGREGATOR",
                vPayerType: "1",
                vPayerCode: "",
                vPayerName: "",
                vApplicationNumber: "",
                vBranchName: "",
                vBankCode: "0",
                vBankName: "",
                vIFSCCode: "",
                vBankAccountNo: "0411672667",
                vHouseBankBranchCode: "14851091",
                vInstrumentNo,
                vCustomerName: `${vCustomerFirstName} ${vCustomerMiddleName} ${vCustomerLastName}`,
                vHouseBankId: "",
                vInstrumentDate,
                vInstrumentAmount,
                vPaymentLinkStatus: "",
                vPaymentEntryId: "",
                vPaymentAllocationId: "",
                vPolicyNumber: client.c_prev_policy_number ? client.c_prev_policy_number : "",
                vPolicyStartDate: "",
                vProposalDate: "",
                vCustomerFullName: "",
                vIntermediaryName: "",
                vCustomerEmailId: "",
                nCustomerMobileNumber: "",
                vErrorMsg: "",
            },
        },
    };

    return proposalAndPayment;
};

export const KotakTwProposalServerToClientMapper = (server) => {
    const server_object = server.Fn_Save_Partner_Two_Wheeler_Proposal_Payment_DetailsResult;

    const server_response = {
        c_policy_number: server_object.vPolicyNumber,
        c_product_code: server_object.vProductCode,
        c_proposal_number: server_object.vProposalNumber,
        c_quote_id: server_object.vQuoteId
    };

    return server_response;
};

export const KotakPcProposalClientToServerMapper = (client) => {
    return client;
};
export const KotakPcProposalServerToClientMapper = (client) => {
    return client;
};
