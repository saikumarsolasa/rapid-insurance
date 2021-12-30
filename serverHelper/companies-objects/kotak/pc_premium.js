

const pcPremiumFunction = (data) => {


    const pcPremiumObject = {
        vIdProof: '1',
        vIdProofDetail: '',
        vIntermediaryCode: '3169170000',
        vIntermediaryName: 'DUMMY FOR TESTING',
        vManufactureCode: data.manufacturer_code,
        vManufactureName: data.manufacture,
        vModelCode: data.model_code,
        vModelDesc: data.model,
        vVariantCode: data.varient_code,
        vVariantDesc: data.varient,
        vModelSegment:data.segment_type,
        vSeatingCapacity: data.seat_capacity,
        vFuelType: data.fuel_type,
        vModelCluster: data.model_cluster,
        vCubicCapacity: data.cubic_capacity,
        isLPGCNGChecked: true,
        vLPGCNGKitSI: '10000',
        isElectricalAccessoriesChecked: true,
        vElectricalAccessoriesSI: '10000',
        isNonElectricalAccessoriesChecked: true,
        vNonElectricalAccessoriesSI: '10000',
        vRegistrationDate: '17/09/2015',
        vRTOCode: data.manufacture_code,
        vRTOStateCode: data.manufacture_code,
        vRegistrationCode: data.manufacture_code,
        vRTOCluster:data.manufacture_code,
        vRegistrationZone: data.manufacture_code,
        isReturnToInvoice: false,
        isRoadSideAssistance: true,
        isEngineProtect: false,
        isDepreciationCover: false,
        nVlntryDedctbleFrDprctnCover: '0',
        isConsumableCover: false,
        isPACoverUnnamed: true,
        vPersonUnnamed: '5',
        vUnNamedSI: '100000',
        vMarketMovement: '10',
        isPACoverPaidDriver: true,
        vPACoverPaidDriver: '1',
        vSIPaidDriver: '100000',
        isIMT28: 'true',
        isIMT29: 'true',
        vPersonIMT28: '1',
        vPersonIMT29: '1',
        vBusinessType: 'R',
        vPolicyStartDate: '',
        vPreviousPolicyEndDate: data.manufacture_code,
        vProductType: 'ComprehensivePolicy',
        vClaimCount: '',
        vNCBRate: data.manufacture_code,
        vWorkflowId: '',
        vFinalIDV: '0',
        objCustomerDetails: {
          vCustomerType: data.manufacture_code,
          vCustomerLoginId: data.manufacture_code,
          vCustomerVoluntaryDeductible: '5000',
          vCustomerGender: 'MALE'
        },
        objPrevInsurer: {
          vPrevPolicyType: 'ComprehensivePolicy',
          vPrevInsurerCode: data.manufacture_code,
          vPrevInsurerDescription: data.manufacture_code
        },
        bIsCreditScoreOpted: '0',
        bIsNewCustomer: '0',
        vCSCustomerFirstName: '',
        vCSCustomerLastName: '',
        dCSCustomerDOB: '',
        vCSCustomerMobileNo: '',
        vCSCustomerPincode: '',
        vCSCustomerIdentityProofType: '1',
        vCSCustomerIdentityProofNumber: '',
        nOfficeCode: '90002',
        vOfficeName: 'MUMBAI-KALINA',
        bIsNoPrevInsurance: '0',
        vRegistrationYear: data.manufacture_code,
        vPreviousYearNCB: data.manufacture_code,
        vPAODTenure: data.manufacture_code,
        vProductTypeODTP: data.manufacture_code,
        vPosPanCard: '',
      }

      return pcPremiumObject;
}

module.exports = { pcPremiumFunction }