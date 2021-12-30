import { format } from "date-fns";
import getYear from "date-fns/getYear";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import getDate from "date-fns/getDate";
import differenceInMonths from "date-fns/differenceInMonths";
import uatTwRtoArray from "../../db/UAT/tw_rto.json";
import uatTwModelArray from "../../db/UAT/tw_model.json";
import uatPcRtoArray from "../../db/UAT/pc_rto.json";
import uatPcModelArray from "../../db/UAT/pc_model.json";
import { errorResponse, splitRegistrationNumber } from "serverHelper/helperFunctions";
import { constants } from "serverHelper/constants";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////// PRIVATE CAR - PREMIUM  /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const KotakPcPremiumClientToServerMapper = (client) => {
    ///////////////////////////////////////////////////// Make, Model, RTO //////////////////////////////////////////

    if(!client.c_rollover){
        if(client.c_ncb){
            return errorResponse("Their should not be NCB for New Car");
        }
    }

    if (Number(client.c_request_idv)) {
        if (Number(client.c_system_idv) > 5000000) {
            return errorResponse("Maximum IDV allowed is 50 Lakhs. Quote should not be shown for IDV > 50 Lakhs");
        }
        if (Number(client.c_system_idv)) {
            let minLimit = Number(client.c_system_idv) * 0.1;
            let maxLimit = Number(client.c_system_idv) * 0.15;
            let minimum = Number(client.c_system_idv) - minLimit;
            let maximum = Number(client.c_system_idv) + maxLimit;

            if (Number(client.c_request_idv) >= minimum && Number(client.c_request_idv) <= maximum) {
                nRequestIDV = Number(client.c_request_idv);
            } else {
                return errorResponse("Request IDV must be 10% greater or less than system idv");
            }
        } else {
            return errorResponse("System IDV is not valid, Please enter your details fetch the quote again");
        }
    }

    if (client.c_engine_number && client.c_engine_number.toString().length < 8) {
        return errorResponse("Engine number should be minimun 8 characters");
    }

    if (client.rollover) {
        if (client.c_chassis_number && client.c_chassis_number.toString().length < 8) {
            return errorResponse("Chassis number should be minimun 8 characters for rollover");
        }
    } else {
        if (client.c_chassis_number && client.c_chassis_number.toString().length > 17) {
            return errorResponse("Chassis number should be below or only 17 characters for new business");
        }
    }

    let vManufactureCode,
        vManufactureName,
        vModelCode,
        vModelDesc,
        vVariantCode,
        vVariantDesc,
        vModelSegment,
        vSeatingCapacity,
        vFuelType,
        vModelCluster,
        vCubicCapacity,
        vRTOCode,
        vRTOStateCode,
        vRegistrationCode,
        vRTOCluster,
        vRegistrationZone,
        vRegistrationYear;
    let isEngineProtect = true;

    if (client.c_registration_number) {
        vManufactureCode = client.c_make_code || null;
        vManufactureName = client.c_make || null;
        vModelCode = client.c_model_code || null;
        vModelDesc = client.c_model || null;
        vVariantCode = client.c_variant_code || null;
        vVariantDesc = client.c_variant || null;
        vSeatingCapacity = client.c_seat_capacity || null;
        vModelSegment = client.c_model_segment || null;
        vFuelType = client.c_fuel_type || null;
        vModelCluster = client.c_model_cluster || null;
        vCubicCapacity = client.c_cubic_capacity;

        vRTOCode = client.c_rto_location_code || null;
        vRTOStateCode = client.c_rto_state_code || null;
        vRegistrationCode = client.c_rto_registration_code || null;
        vRegistrationZone = client.c_rto_registartion_zone || null;
        vRTOCluster = client.c_rto_cluster || null;
        // vSelectedRTOAuthorityLocation = client.c_rto_location || null;
    } else {
        uatPcModelArray.map((model) => {
            if (model.variant_code === Number(client.c_variant_code)) {
                vManufactureCode = model.manufacturer_code || null;
                vManufactureName = model.manufacturer || null;
                vModelCode = model.model_code || null;
                vModelDesc = model.model || null;
                vVariantCode = model.variant_code || null;
                vVariantDesc = model.variant || null;
                vSeatingCapacity = model.seat_capacity || null;
                vModelCluster = model.model_cluster || null;
                vCubicCapacity = model.cubic_capacity;
                vModelSegment = model.segment_type || null;
                vFuelType = model.fuel_type || null;
            }
        });

        uatPcRtoArray.map((rto) => {
            if (rto.rto_location_code === Number(client.c_rto_location_code)) {
                vRTOCode = rto.rto_location_code || null;
                vRegistrationCode = rto.rto_registration_code || null;
                vRTOCluster = rto.rto_cluster || null;
                vRegistrationZone = rto.rto_registration_zone || null;
                vRTOStateCode = rto.rto_state_code || null;
                // vSelectedRTOAuthorityLocation = rto.rto_location || null;
            }
        });
    }

    let vRegistrationDate = format(new Date(client.c_registration_date), "dd/MM/yyyy");
    if (client.c_registration_date) {
        vRegistrationYear = getYear(new Date(client.c_registration_date));
    } else {
        return errorResponse("Registration Date is required");
    }

    if (client.c_engine_protect) {
        isEngineProtect = client.c_engine_protect;
    }

    ///////////////////////////////////////////////////// Addons  //////////////////////////////////////////
    let isPACoverUnnamed = false;
    let vPersonUnnamed = 0;
    let vUnNamedSI = 0;
    let isPACoverPaidDriver = false;
    let vPACoverPaidDriver = 0;
    let vSIPaidDriver = 0;

    if (Number(client.c_unnamed_passenger)) {
        isPACoverUnnamed = true;
        vPersonUnnamed = vSeatingCapacity;
        if (Number(client.c_unnamed_passenger) >= 10000 && Number(client.c_unnamed_passenger) <= 200000) {
            if (Number.isInteger(Number(client.c_unnamed_passenger) / 10000)) {
                vUnNamedSI = Number(client.c_unnamed_passenger);
            } else {
                return errorResponse(
                    "Unnamed Passenger value should be any value of 10000 - 200000 with the interval of 10000"
                );
            }
        } else {
            return errorResponse("Unnamed Passenger value should be between 10000 and 200000");
        }
    }

    if (Number(client.c_pa_cover_owner_driver)) {
        isPACoverPaidDriver = true;
        vPACoverPaidDriver = vSeatingCapacity;
        if (Number(client.c_pa_cover_owner_driver) >= 10000 && Number(client.c_pa_cover_owner_driver) <= 200000) {
            if (Number.isInteger(Number(client.c_pa_cover_owner_driver) / 10000)) {
                vSIPaidDriver = Number(client.c_pa_cover_owner_driver);
            } else {
                return errorResponse(
                    "Personal Accident Cover for Paid Driver value should be any value of 10000 - 200000 with the interval of 10000"
                );
            }
        } else {
            return errorResponse("Personal Accident Cover for Paid Driver value should be between 10000 and 200000");
        }
    }

    ///////////////////////////////////////////////////// Policy Details  //////////////////////////////////////////
    let vPolicyStartDate = "";
    let vPreviousPolicyEndDate;
    let vProductType = "ComprehensivePolicy";
    let vClaimCount = "";
    let vNCBRate = 0;
    let vPreviousYearNCB = 0;
    let NcbArray = [0, 20, 25, 35, 45, 50];

    if (client.c_prev_policy_expire_date) {
        vPreviousPolicyEndDate = format(new Date(client.c_prev_policy_expire_date), "dd/MM/yyyy");
    } else {
        return errorResponse("Please give a valid Previous Policy End Date");
    }

    if (Number(client.c_ncb)) {
        if (NcbArray.includes(Number(client.c_ncb))) {
            vClaimCount = "1 OD Claim";
            vNCBRate = Number(client.c_ncb);
            vPreviousYearNCB = Number(client.c_ncb);
        } else {
            return errorResponse("No Claim Bonus must be one of  0 | 20 | 25 | 35 | 45 | 50");
        }
    }

    ///////////////////////////////////////////////////// Customer Details  //////////////////////////////////////////
    let vCustomerType = "I";
    let vCustomerLoginId = "BP000001";
    let vCustomerVoluntaryDeductible = "0";
    let vCustomerGender = client.c_gender ? client.c_gender : "";
    let voluntryExcess = [0, 2500, 5000, 7500, 15000];

    if (client.c_customer_type) {
        vCustomerType = client.c_customer_type;
    }
    if (Number(client.c_voluntry_excess)) {
        if (voluntryExcess.includes(Number(client.c_voluntry_excess))) {
            vCustomerVoluntaryDeductible = Number(client.c_voluntry_excess);
        } else {
            return errorResponse("Voluntry Excess must be one of  0 | 2500 | 5000 | 7500 | 15000");
        }
    }

    ///////////////////////////////////////////////////// Previous Policy Details  //////////////////////////////////////////
    let vPrevInsurerCode = "OICL";
    let vPrevInsurerDescription = "ORIENTAL INSURANCE";
    let vPrevPolicyType = "ComprehensivePolicy"; // Any one of the following: "ComprehensivePolicy" or "LiabilityOnlyPolicy"
    let bIsCreditScoreOpted = "0";
    let bIsNoPrevInsurance;
    let vPAODTenure;
    let vProductTypeODTP;

    if (client.c_prev_previous_insurer && client.c_prev_previous_insurer_code) {
        vPrevInsurerCode = client.c_prev_previous_insurer_code;
        vPrevInsurerDescription = client.c_prev_previous_insurer;
    } else {
        return errorResponse("Previous Insurer Desc or Code are mandatory for rollover");
    }

    if (client.c_credit_score_required && client.c_customer_type === "I") {
        bIsCreditScoreOpted = "1";
    }

    if (client.c_rollover) {
        if (client.c_prev_previous_insurer && client.c_prev_previous_insurer_code) {
            bIsNoPrevInsurance = 0;
        } else {
            bIsNoPrevInsurance = 1;
        }
    } else {
        bIsNoPrevInsurance = 1;
    }

    if (client.c_pa_cover_owner_driver) {
        if (client.c_rollover) {
            vPAODTenure = 1;
        } else {
            if (client.c_plan) {
                if (Number(client.c_plan.slice(-1)) === 1) {
                    vPAODTenure = 1;
                } else if (Number(client.c_plan.slice(-1)) === 3) {
                    vPAODTenure = 3;
                }
            }
        }
    } else {
        vPAODTenure = 0;
    }

    if (client.c_rollover) {
        vProductTypeODTP = 1011;
    } else {
        if (client.c_plan) {
            if (Number(client.c_plan.slice(-1)) === 1) {
                vProductTypeODTP = 1063;
            } else if (Number(client.c_plan.slice(-1)) === 3) {
                vProductTypeODTP = 1062;
            }
        }
    }

    ///////////////////////////////////////////////////// Customer Details  /////////////////////////////////////////////

    let vCSCustomerFirstName = "";
    let vCSCustomerLastName = "";
    let dCSCustomerDOB = "";
    let vCSCustomerMobileNo = "";
    let vCSCustomerPincode = "";
    let vCSCustomerIdentityProofType = "1";
    let vCSCustomerIdentityProofNumber = "";

    if (client.c_customer_type === "I" && client.c_credit_score_required) {
        if (client.c_first_name && client.c_dob && client.c_mobile) {
            vCSCustomerFirstName = client.c_first_name ? client.c_first_name : "";
            vCSCustomerLastName = client.c_last_name ? client.c_last_name : "";
            dCSCustomerDOB = client.c_dob ? client.c_dob : "";
            vCSCustomerMobileNo = client.c_mobile ? client.c_mobile : "";
            vCSCustomerPincode = client.c_pincode ? client.c_pincode : "";
        } else {
            return errorResponse("If customer type is individual, then we required customer details");
        }
    }

    const pc_premium = {
        vIdProof: "1",
        vIdProofDetail: client.c_pan_number ? client.c_pan_number : "",
        vIntermediaryCode: constants.kotak.intermediate_code,
        vIntermediaryName: constants.kotak.intermediate_name,
        vManufactureCode,
        vManufactureName,
        vModelCode,
        vModelDesc,
        vVariantCode,
        vVariantDesc,
        vModelSegment,
        vSeatingCapacity,
        vFuelType,
        vModelCluster,
        vCubicCapacity,
        vRTOCode,
        vRTOStateCode,
        vRegistrationCode,
        vRTOCluster,
        vRegistrationZone,
        isLPGCNGChecked: Number(client.c_lpg_cng_si) ? true : false,
        vLPGCNGKitSI: Number(client.c_lpg_cng_si) ? Number(client.c_lpg_cng_si) : 0,
        isElectricalAccessoriesChecked: Number(client.c_electrical_accessories) ? true : false,
        vElectricalAccessoriesSI: Number(client.c_electrical_accessories) ? Number(client.c_electrical_accessories) : 0,
        isNonElectricalAccessoriesChecked: Number(client.c_non_electrical_accessories) ? true : false,
        vNonElectricalAccessoriesSI: Number(client.c_non_electrical_accessories)
            ? Number(client.c_non_electrical_accessories)
            : 0,
        vRegistrationDate,
        isReturnToInvoice: client.c_return_to_invoice ? client.c_return_to_invoice : false,
        isRoadSideAssistance: client.c_road_side_assistance ? client.c_road_side_assistance : false,
        isEngineProtect,
        isDepreciationCover: Number(client.c_depreciation_cover) ? true : false,
        nVlntryDedctbleFrDprctnCover: Number(client.c_depreciation_cover) ? Number(client.c_depreciation_cover) : 0,
        isConsumableCover: client.c_consumable_cover ? client.c_consumable_cover : false,
        isPACoverUnnamed,
        vPersonUnnamed,
        vUnNamedSI,
        vMarketMovement: "10",
        isPACoverPaidDriver,
        vPACoverPaidDriver,
        vSIPaidDriver,
        isIMT28: client.c_imt_28 ? client.c_imt_28 : false,
        isIMT29: client.c_imt_29 ? client.c_imt_29 : false,
        vPersonIMT28: client.c_imt_28 ? 1 : 0,
        vPersonIMT29: client.c_imt_28 ? 1 : 0,
        vBusinessType: client.c_rollover ? "R" : "N",
        vPolicyStartDate,
        vPreviousPolicyEndDate,
        vProductType,
        vClaimCount,
        vNCBRate,
        vPreviousYearNCB,
        vClaimAmount: "0",
        vWorkflowId: "",
        vFinalIDV: "0",
        objCustomerDetails: {
            vCustomerType,
            vCustomerLoginId,
            vCustomerVoluntaryDeductible,
            vCustomerGender,
        },
        objPrevInsurer: {
            vPrevInsurerCode,
            vPrevPolicyType,
            vPrevInsurerDescription,
        },
        bIsCreditScoreOpted,
        bIsNewCustomer: "0",
        vCSCustomerFirstName,
        vCSCustomerLastName,
        dCSCustomerDOB,
        vCSCustomerMobileNo,
        vCSCustomerPincode,
        vCSCustomerIdentityProofType,
        vCSCustomerIdentityProofNumber,
        nOfficeCode: "90002",
        vOfficeName: "MUMBAI-KALINA",
        bIsNoPrevInsurance,
        vRegistrationYear,
        vPAODTenure,
        vProductTypeODTP,
        vPosPanCard: "",
    };

    return {
        error: false,
        data: pc_premium,
    };
};

export const KotakPcPremiumServerToClientMapper = (server) => {
    let makeModelDetails = `${server.vMake} ${server.vModel} ${server.vVariant} ${server.vFuelType}`;
    let rtoDetails = `${server.vRTO}`;

    let return_server_object = {
        c_net_premium: server.vTotalPremium,
        c_idv: server.vFinalIDV,
        c_system_idv: server.vSystemIDV,
        c_gst: server.vGSTAmount,
        c_gst_percent: server.vGSTRate,
        c_ncb: server.vNCBPercentage,
        c_ncb_discount: server.vNCB,
        c_basic_od_premium: server.vOwnDamagePremium,
        c_basic_tp_premium: server.vBasicTPPremium,
        c_make_model_details: makeModelDetails,
        c_rto_details: rtoDetails,
        c_unnamed_passenger: server.vPAUnnamedPassengerSI,
        c_unnamed_passenger_premium: server.vPAForUnnamedPassengerPremium,
        c_is_credit_score_opted: server.vCreditScore,
        c_quote_id: server.vQuoteId,
        c_workflow_id: server.vWorkFlowID,
        c_prev_policy_expire_date: server.vPolicyEndDate,
        c_prev_policy_start_date: server.vPolicyStartDate,
        c_company_name: "kotak",
        c_plan_name: "Kotak General Insurance",
    };

    return return_server_object;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////// TWO WHEELER - PREMIUM  //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export let KotakTwPremiumClientToServerMapper = (client) => {
    if (client.c_manufacture_year_month && client.c_registration_date) {
        const days = differenceInCalendarDays(
            new Date(client.c_registration_date),
            new Date(client.c_manufacture_year_month)
        );
        if (days < 0) return errorResponse("Manufacture Date should not be lesser than the registration date");
    }

    if (differenceInMonths(new Date(), new Date(client.c_manufacture_year_month)) / 12 > 9.99) {
        return errorResponse("Vehicle age must be below 9.5 years");
    }

    if (client.c_engine_number && client.c_engine_number.toString().length < 8) {
        return errorResponse("Engine number should be minimun 8 characters");
    }

    if (client.rollover) {
        if (client.c_chassis_number && client.c_chassis_number.toString().length < 8) {
            return errorResponse("Chassis number should be minimun 8 characters for rollover");
        }
    } else {
        if (client.c_chassis_number && client.c_chassis_number.toString().length > 17) {
            return errorResponse("Chassis number should be below or only 17 characters for new business");
        }
    }

    if (!client.c_rollover) {
        if (client.c_registration_date) {
            const dateDiff = differenceInMonths(new Date(), new Date(client.c_registration_date));
            if (dateDiff > 6) {
                return errorResponse("Bike must be registered between 6 months from today");
            } else if (dateDiff === 6) {
                if (getDate(new Date(client.c_registration_date)) < getDate(new Date())) {
                    return errorResponse("Bike must be registered before 6 months on same date");
                }
            }
        } else {
            return errorResponse("Registration Date is mandatory for new business");
        }
    }

    let nSelectedMakeCode;
    let vSelectedMakeDesc;
    let nSelectedModelCode;
    let vSelectedModelDesc;
    let nSelectedVariantCode;
    let vSelectedVariantDesc;
    let nSelectedVariantSeatingCapacity;
    let vSelectedVariantModelCluster;
    let nSelectedVariantCubicCapacity;
    let vSelectedModelSegment;
    let vSelectedFuelTypeDescription;

    let vRTOStateCode;
    let nSelectedRTOCode;
    let vSelectedRegistrationCode;
    let vSelectedRTOCluster;
    let vSelectedRTOZone;
    let vSelectedRTOAuthorityLocation;

    // if (client.c_registration_number) {
    //     nSelectedMakeCode = client.c_make_code || null;
    //     vSelectedMakeDesc = client.c_make || null;
    //     nSelectedModelCode = client.c_model_code || null;
    //     vSelectedModelDesc = client.c_model || null;
    //     nSelectedVariantCode = client.c_variant_code || null;
    //     vSelectedVariantDesc = client.c_variant || null;
    //     nSelectedVariantSeatingCapacity = client.c_seat_capacity || null;
    //     vSelectedVariantModelCluster = client.c_model_cluster || null;
    //     nSelectedVariantCubicCapacity = client.c_cubic_capacity;
    //     vSelectedModelSegment = client.c_model_segment || null;
    //     vSelectedFuelTypeDescription = client.c_fuel_type || null;

    //     nSelectedRTOCode = client.c_rto_location_code || null;
    //     vSelectedRegistrationCode = client.c_rto_registration_code || null;
    //     vSelectedRTOCluster = client.c_rto_cluster || null;
    //     vSelectedRTOZone = client.c_rto_registartion_zone || null;
    //     vSelectedRTOAuthorityLocation = client.c_rto_location || null;
    // } else {
    uatTwModelArray.map((model) => {
        if (model.variant_code === Number(client.c_variant_code)) {
            nSelectedMakeCode = model.manufacturer_code || null;
            vSelectedMakeDesc = model.manufacturer || null;
            nSelectedModelCode = model.model_code || null;
            vSelectedModelDesc = model.model || null;
            nSelectedVariantCode = model.variant_code || null;
            vSelectedVariantDesc = model.variant || null;
            nSelectedVariantSeatingCapacity = model.seat_capacity || null;
            vSelectedVariantModelCluster = model.model_cluster || null;
            nSelectedVariantCubicCapacity = model.cubic_capacity;
            vSelectedModelSegment = model.segment_type || null;
            vSelectedFuelTypeDescription = model.fuel_type || null;
        }
    });

    uatTwRtoArray.map((rto) => {
        if (rto.rto_location_code === Number(client.c_rto_location_code)) {
            nSelectedRTOCode = rto.rto_location_code || null;
            vSelectedRegistrationCode = rto.rto_registration_code || null;
            vSelectedRTOCluster = rto.rto_cluster || null;
            vSelectedRTOZone = rto.rto_registration_zone || null;
            vSelectedRTOAuthorityLocation = rto.rto_location || null;
            vRTOStateCode = rto.rto_state_code || null;
        }
    });
    // }

    if (!vSelectedMakeDesc || !vSelectedModelDesc) {
        return errorResponse("The Manfacturer or Model of vehicle number you have entered is not available");
    }

    if (!vSelectedRegistrationCode || !nSelectedRTOCode) {
        return errorResponse("The RTO code or registration code of vehicle number you have entered is not available");
    }

    if (
        vSelectedModelSegment.toLowerCase() === "motor cycle" &&
        vSelectedRegistrationCode.toLowerCase().includes("gj")
    ) {
        return errorResponse("Motorcycle Segment to be blocked for (Gujarat - GJ) and Scooter segment to be kept open");
    }

    /////////////////////// DATES

    let dSelectedRegDate = format(new Date(client.c_registration_date), "dd/MM/yyyy");
    let dSelectedPreviousPolicyExpiryDate = format(new Date(client.c_prev_policy_expire_date), "dd/MM/yyyy");
    let nManufactureYear = getYear(new Date(client.c_manufacture_year_month));

    if (!dSelectedRegDate) return errorResponse("Registartion date should not be null or invalid format");
    if (!dSelectedPreviousPolicyExpiryDate)
        return errorResponse("Previous Policy date should not be null or invalid format");
    if (!nManufactureYear) return errorResponse("Manufacture Year should not be null or invalid format");

    //////////////////// ADD ONS

    let bIsNonElectAccessReq = Number(client.c_non_electrical_accessories) ? true : false;
    let nNonElectAccessSumInsured = Number(client.c_non_electrical_accessories)
        ? Number(client.c_non_electrical_accessories)
        : 0;

    let bIsElectAccessReq = Number(client.c_electrical_accessories) ? true : false;
    let nElectAccessSumInsured = Number(client.c_electrical_accessories) ? Number(client.c_electrical_accessories) : 0;

    let bIsPACoverForUnnamed = Number(client.c_unnamed_passenger) ? true : false;
    let nPACoverForUnnamedSumInsured = Number(client.c_unnamed_passenger) ? Number(client.c_unnamed_passenger) : 0;

    let bIsLossAccessoriesReq = false;
    let nLossAccessSumInsured = 0;

    if (Number(client.c_loss_accessories)) {
        bIsLossAccessoriesReq = true;
        nLossAccessSumInsured = client.c_loss_accessories;
    }

    let vProductTypeODTP = client.c_rollover ? 1022 : 1066;
    let bIsNewCustomer = client.c_new_customer ? true : false;
    let bIsCompulsoryPAWithOwnerDriver = client.c_pa_cover_owner_driver ? true : false;
    let nRequestIDV = 0;
    if (Number(client.c_request_idv)) {
        if (Number(client.c_system_idv)) {
            let IdvLimit = Number(client.c_system_idv) * 0.1;
            let minimum = Number(client.c_system_idv) - IdvLimit;
            let maximum = Number(client.c_system_idv) + IdvLimit;

            if (Number(client.c_request_idv) >= minimum && Number(client.c_request_idv) <= maximum) {
                nRequestIDV = Number(client.c_request_idv);
            } else {
                return errorResponse("Request IDV must be 10% greater or less than system idv");
            }
        } else {
            return errorResponse("System IDV is not valid, Please enter your details fetch the quote again");
        }
    }

    /////////// POLICY TENURE

    let nSelectedRequiredPolicyTerm;

    if (!client.c_rollover) {
        if (![0, 1].includes(Number(client.c_own_damage))) {
            return errorResponse("Request policy term should be 1 or 0, in case of new business");
        } else {
            nSelectedRequiredPolicyTerm = client.c_own_damage;
        }
    } else {
        if (client.c_own_damage <= 0 || client.c_own_damage >= 4) {
            return errorResponse("Policy Term should be between or equal 1 to 3");
        } else {
            nSelectedRequiredPolicyTerm = client.c_own_damage;
        }
    }

    let vPAODTenure;
    if (client.c_pa_cover_owner_driver) {
        if (client.c_rollover) {
            vPAODTenure = 1;
        } else {
            vPAODTenure = 5;
        }
    } else {
        vPAODTenure = 0;
    }

    ////////////////  CUSTOMER DETAILS //////////////////

    let vCSCustomerFirstName = "";
    let vCSCustomerLastName = "";
    let vCSCustomerMobileNo = "";

    if (client.c_full_name) {
        if (client.c_full_name.split(" ").length > 1) {
            vCSCustomerFirstName = client.c_full_name.split(" ")[0];
            vCSCustomerLastName = client.c_full_name.split(" ")[1];
        } else {
            vCSCustomerFirstName = client.c_full_name;
            vCSCustomerLastName = client.c_full_name;
        }
    }
    if (Number(client.c_mobile) && client.c_mobile.length == 10) {
        vCSCustomerMobileNo = client.c_mobile;
    } else {
        return errorResponse("Please enter 10 digits mobile number");
    }

    //////////////////////////////// PREV INSURER

    let bIsNoPrevInsurance;
    let vSelectedPrevInsurerDesc = "";
    let vSelectedPrevInsurerCode = "";
    let vSelectedPrevPolicyType = "";
    let nTotalClaimCount = 0;
    let nClaimCount1Year = 0;
    let nClaimCount2Year = 0;
    let nClaimCount3Year = 0;
    let nSelectedPreviousPolicyTerm = 0;

    if (client.c_rollover) {
        if (client.c_claim_last_year) {
            nTotalClaimCount = 1;
        }

        if (Number(nTotalClaimCount) === 1) {
            nClaimCount1Year = 0;
        }
        if (Number(nTotalClaimCount) === 2) {
            nClaimCount2Year = 0;
        }
        if (Number(nTotalClaimCount) === 3) {
            nClaimCount3Year = 0;
        }
        if (client.c_prev_previous_insurer && client.c_prev_previous_insurer_code) {
            vSelectedPrevInsurerDesc = client.c_prev_previous_insurer;
            vSelectedPrevInsurerCode = client.c_prev_previous_insurer_code;
        } else {
            return errorResponse("Previous Insurer Desc or Code are mandatory for rollover");
        }
        nSelectedPreviousPolicyTerm = 1;
    }

    nTotalClaimCount = client.c_claim_last_year ? 1 : 0;
    vSelectedPrevPolicyType = client.c_rollover ? "Comprehensive" : "";
    if (client.c_rollover) {
        if (client.c_prev_previous_insurer && client.c_prev_previous_insurer_code) {
            bIsNoPrevInsurance = false;
        } else {
            bIsNoPrevInsurance = true;
        }
    } else {
        bIsNoPrevInsurance = true;
    }

    ///////////////////////////////// Registartion Number

    let vRegistrationNumber1 = null;
    let vRegistrationNumber2 = null;
    let vRegistrationNumber3 = null;
    let vRegistrationNumber4 = null;

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
        // if (client.c_rto_registration_code) {
        //     vRegistrationNumber1= client.c_rto_registration_code.slice(0, 2).toUpperCase();
        //     vRegistrationNumber2 = client.c_rto_registration_code.slice(2, 4);
        // }
    }

    let two_wheeler_premium = {
        IsPartnerRequest: true,
        vWorkFlowID: null,
        vUserLoginId: "BP000001",
        vIntermediaryCode: "3169170000",
        nSelectedMakeCode,
        vSelectedMakeDesc,
        nSelectedModelCode,
        vSelectedModelDesc,
        nSelectedVariantCode,
        vSelectedVariantDesc,
        nSelectedVariantSeatingCapacity,
        vSelectedVariantModelCluster,
        nSelectedVariantCubicCapacity,
        vSelectedModelSegment,
        vSelectedFuelTypeDescription,
        nSelectedRTOCode,
        vSelectedRegistrationCode,
        vSelectedRTOCluster,
        vSelectedRTOZone,
        vSelectedRTOAuthorityLocation,
        vRegistrationNumber1,
        vRegistrationNumber2,
        vRegistrationNumber3,
        vRegistrationNumber4,
        vEngineNumber: client.c_engine_number ? client.c_engine_number : null,
        vChassisNumber: client.c_chassis_number ? client.c_chassis_number : null,
        dSelectedRegDate,
        dSelectedPreviousPolicyExpiryDate,
        dPreviousPolicyStartDate: "/Date(-62135596800000)/",
        vSelectedPrevInsurerCode,
        vSelectedPrevInsurerDesc,
        vSelectedPrevPolicyType,
        nTotalClaimCount,
        nClaimCount1Year,
        nClaimCount2Year,
        nClaimCount3Year,
        nClaimFreeYears: 0,
        bIsNoPrevInsurance,
        nSelectedNCBRate: Number(client.c_ncb) >= 0 ? Number(client.c_ncb) : 0,
        nSelectedPreviousPolicyTerm,
        nSelectedRequiredPolicyTerm,
        bIsNonElectAccessReq,
        bIsElectAccessReq,
        bIsSideCar: false,
        bIsPACoverForUnnamed,
        nNonElectAccessSumInsured,
        nElectAccessSumInsured,
        nSideCarSumInsured: 0,
        nPACoverForUnnamedSumInsured,
        vIntermediaryName: null,
        vIntermediaryType: null,
        vBusineeChanneltype: null,
        nOfficeCode: 90002,
        vOfficeName: "MUMBAI-KALINA",
        nPrimaryMOCode: 0,
        vPrimaryMOName: null,
        dApplicationDate: "/Date(-62135596800000)/",
        vPropProductName: null,
        nRequestIDV,
        nManufactureYear,
        vCustomerType: client.c_customer_type,
        nMarketMovement: -35,
        nResponseCreditScore: 0,
        bIsFlaProcessActive: false,
        vRTOStateCode,
        bIsCreditScoreOpted: false,
        vCSCustomerFirstName,
        vCSCustomerLastName,
        dCSCustomerDOB: "22/04/2021",
        nCSCustomerGender: 0,
        vCSCustomerPANNumber: null,
        vCSCustomerMobileNo,
        vCSCustomerPincode: "",
        vCSCustomerIdentityProofType: "1",
        vCSCustomerIdentityProofNumber: "",
        bIsNewCustomer,
        bIsRollOver: client.c_rollover ? true : false,
        vProductTypeODTP,
        vPAODTenure,
        bIsCompulsoryPAWithOwnerDriver,
        bIsLossAccessoriesReq,
        nLossAccessSumInsured,
        vAPICustomerId: "",
        vCustomerFullName: null,
        vPosPanCard: "",
        vSPID: "SP0000000039",
        IsRenewal: false,
    };

    return {
        error: false,
        data: two_wheeler_premium,
    };
};

export let KotakTwPremiumServerToClientMapper = (server) => {
    let makeModelDetails = `${server.vManufacturer} ${server.vModel} ${server.vVariant} ${server.vFuelType}`;
    let rtoDetails = `${server.vRTOAuthorityLocation}`;

    let return_server_object = {
        c_net_premium: server.nTotalPremium,
        c_idv: server.nFinalIDV,
        c_gst: server.nGSTAmount,
        c_gst_percent: server.nGSTPercent,
        c_ncb: server.nNoClaimBonusPercentageApplicable,
        c_ncb_discount: server.nNoClaimBonusDiscount,
        c_basic_od_premium: server.nOwnDamagePremium,
        c_basic_tp_premium: server.nBasicTPPremium,
        c_make_model_details: makeModelDetails,
        c_rto_details: rtoDetails,
        c_unnamed_passenger: server.nPACoverForUnnamedSumInsured,
        c_unnamed_passenger_premium: server.nPAtoUnnamedHirerPillionPassngrPremium,
        c_system_idv: server.nSystemIDV,
        c_is_credit_score_opted: server.nResponseCreditScore,
        c_quote_id: server.vQuoteID,
        c_workflow_id: server.vWorkFlowID,
        c_company_name: "kotak",
        c_plan_name: "Kotak General Insurance",
    };

    return return_server_object;
};
