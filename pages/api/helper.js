export default function handler(req, res) {
    if (req.method == "GET") {
        GetRouteHandler(req, res);
    } else if (req.method == "POST") {
        PostRouteHandler(req, res);
    }
}

const GetRouteHandler = (req, res) => {
    let response = "No Response";

    const object = {
        vIdProof: "1",
        vIdProofDetail: "",
        vIntermediaryCode: "3169170000",
        vIntermediaryName: "DUMMY FOR TESTING",
        vManufactureCode: "1",
        vManufactureName: "HONDA",
        vModelCode: "71",
        vModelDesc: "ACCORD",
        vVariantCode: "74",
        vVariantDesc: "2.4 A/T",
        vModelSegment: "HIGH END CARS",
        vSeatingCapacity: "5",
        vFuelType: "Petrol",
        isLPGCNGChecked: true,
        vLPGCNGKitSI: "10000",
        isElectricalAccessoriesChecked: true,
        vElectricalAccessoriesSI: "10000",
        isNonElectricalAccessoriesChecked: true,
        vNonElectricalAccessoriesSI: "10000",
        vRegistrationDate: "18/04/2015",
        vRTOCode: "20903",
        vRTOStateCode: "20",
        vRegistrationCode: "MH02",
        vRTOCluster: "CATEGORY 7",
        vRegistrationZone: "Zone-A",
        vModelCluster: "CATEGORY 3",
        vCubicCapacity: "3471",
        isReturnToInvoice: false,
        isRoadSideAssistance: true,
        isEngineProtect: false,
        isDepreciationCover: false,
        nVlntryDedctbleFrDprctnCover: "0",
        isConsumableCover: false,
        isPACoverUnnamed: true,
        vPersonUnnamed: "5",
        vUnNamedSI: "100000",
        vMarketMovement: "10",
        isPACoverPaidDriver: true,
        vPACoverPaidDriver: "1",
        vSIPaidDriver: "100000",
        isIMT28: "true",
        isIMT29: "true",
        vPersonIMT28: "1",
        vPersonIMT29: "1",
        vBusinessType: "R",
        vPolicyStartDate: "",
        vPreviousPolicyEndDate: "31/12/2020",
        vProductType: "ComprehensivePolicy",
        vClaimCount: "",
        vNCBRate: "20",
        vWorkflowId: "",
        vFinalIDV: "0",
        objCustomerDetails: {
            vCustomerType: "I",
            vCustomerLoginId: "BP000001",
            vCustomerVoluntaryDeductible: "5000",
            vCustomerGender: "MALE",
        },
        objPrevInsurer: {
            vPrevInsurerCode: "OICL",
            vPrevPolicyType: "ComprehensivePolicy",
            vPrevInsurerDescription: "ORIENTAL INSURANCE",
        },
        bIsCreditScoreOpted: "0",
        bIsNewCustomer: "0",
        vCSCustomerFirstName: "",
        vCSCustomerLastName: "",
        dCSCustomerDOB: "",
        vCSCustomerMobileNo: "",
        vCSCustomerPincode: "",
        vCSCustomerIdentityProofType: "1",
        vCSCustomerIdentityProofNumber: "",
        nOfficeCode: "90002",
        vOfficeName: "MUMBAI-KALINA",
        bIsNoPrevInsurance: "0",
        vRegistrationYear: "2015",
        vPreviousYearNCB: "20",
        vPAODTenure: "1",
        vProductTypeODTP: "1011",
        vPosPanCard: "",
    };

    res.status(200).json({ message: response });
};

const PostRouteHandler = (req, res) => {
    res.status(200).json({ response: "Post Request" });
};
