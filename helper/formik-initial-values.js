import { add, format } from 'date-fns';

export const bikeBuyNowInitialValue = (values) => {
  console.log(values);
  let policy_duration_cal = '';

  if (values.policy_expire_date) {
    let start_date = add(new Date(values?.policy_expire_date), {
      days: 3,
    }).toLocaleDateString();
    start_date = format(new Date(start_date), 'yyyy-MM-dd');

    let end_date = add(new Date(start_date), { years: 1 }).toLocaleDateString();
    end_date = format(new Date(end_date), 'yyyy-MM-dd');

    policy_duration_cal = `${start_date} - ${end_date}`;
  }

  const initialValues = {
    c_idv: values?.c_idv ? values.c_idv : 'NA',
    c_make_model: values?.c_make_model ? values.c_make_model : 'NA',
    c_rto_details: values?.c_rto_details ? values.c_rto_details : 'NA',
    c_registration_date: values?.c_registration_date ? values.c_registration_date : 'NA',
    c_registration_number: values?.c_registration_number ? values.c_registration_number : '',
    c_policy_tenure: values?.c_policy_tenure ? values?.c_policy_tenure : 'NA',
    c_prev_policy_expire_date: values?.c_prev_policy_expire_date ? values.c_prev_policy_expire_date : 'NA',
    c_electrical_accessories: values?.c_electrical_accessories ? values.c_electrical_accessories : '0',
    c_non_electrical_accessories: values?.c_non_electrical_accessories ? values.c_non_electrical_accessories : '0',
    c_ncb: values?.c_ncb ? values.c_ncb : '0',
    c_voluntry_excess: values?.c_voluntry_excess ? values.c_voluntry_excess : 'No',
    c_anti_theif_device: values?.c_anti_theif_device ? values.c_anti_theif_device : 'No',
    c_aa_membership: values?.c_aa_membership ? values.c_aa_membership : 'No',
    c_tppd: values?.c_limit_tp_damage === 'true' || true ? 'Yes' : 'No',
    c_title: '',
    c_first_name: values?.c_full_name ? values.c_full_name : '',
    c_last_name: '',
    c_dob: null,
    c_maritial_status: '',
    c_aadhar_number: '',
    c_gender: '',
    c_gst_number: '',
    c_mobile: values?.c_mobile ? values.c_mobile : '',
    c_email: values?.c_email ? values.c_email : '',
    c_cpa: '',
    c_address_line1: '',
    c_address_line2: '',
    c_address_line3: '',
    c_pincode: '',
    c_city: '',
    c_state: '',
    c_engine_number: values?.c_engine_number ? values.c_engine_number : '',
    c_chassis_number: values?.c_chassis_number ? values.c_chassis_number : '',
    c_prev_policy_number: values?.c_prev_policy_number ? values?.c_prev_policy_number : '',
    c_vehicle_colour: '',
    c_is_vehicle_financed: values?.c_financed ? values.c_financed : '',
    c_valid_pucc: values?.c_pucc_upto === 'true' || true ? 'yes' : 'no',
    c_nominee_relation: '',
    c_nominee_full_name: '',
    c_nominee_dob: null,
  };

  const testvalues = {
    c_idv: values?.c_idv ? values.c_idv : 'NA',
    c_make_model: values?.c_make_model ? values.c_make_model : 'NA',
    c_rto_details: values?.c_rto_details ? values.c_rto_details : 'NA',
    c_registration_date: values?.c_registration_date ? values.c_registration_date : 'NA',
    // c_registration_number: '',
    c_policy_tenure: values?.c_policy_tenure ? values?.c_policy_tenure : 'NA',
    c_prev_policy_expire_date: values?.polc_prev_policy_expire_dateicy_expire_date ? values.policy_expire_date : 'NA',
    c_electrical_accessories: values?.c_electrical_accessories ? values.c_electrical_accessories : 'NA',
    c_non_electrical_accessories: values?.c_non_electrical_accessories ? values.c_non_electrical_accessories : 'NA',
    c_ncb: values?.c_ncb ? values.c_ncb : 'NA',
    c_voluntry_excess: values?.c_voluntry_excess ? values.c_voluntry_excess : 'NA',
    c_anti_theif_device: values?.c_anti_theif_device ? values.c_anti_theif_device : 'NA',
    c_aa_membership: values?.c_aa_membership ? values.c_aa_membership : 'NA',
    c_tppd: values?.c_limit_tp_damage === 'true' || true ? 'Yes' : 'No',
    c_title: 'mr',
    c_first_name: values?.c_full_name ? values.c_full_name : '',
    c_last_name: 'bhargav',
    c_dob: '1997-02-23',
    c_maritial_status: 'married',
    c_aadhar_number: '266665093575',
    c_gender: 'male',
    c_gst_number: '55666985545112',
    c_mobile: values?.c_mobile ? values.c_mobile : '',
    c_email: values?.c_email ? values.c_email : '',
    c_cpa: 'hired_driver',
    c_address_line1: 'hyderabad',
    c_address_line2: 'hyderabad',
    c_address_line3: 'hyderabad',
    c_pincode: '500039',
    c_city: 'hyderabad',
    c_state: 'telangana',
    c_registration_number: 'MH12EM9099',
    c_engine_number: 'JF39E70321656',
    c_chassis_number: 'ME4KC093A98040032',
    c_prev_policy_number: '334685ad5s',
    c_vehicle_colour: 'blue',
    c_is_vehicle_financed: 'no',
    c_valid_pucc: 'no',
    c_nominee_relation: 'spouse',
    c_nominee_full_name: 'priyanka',
    c_nominee_dob: '1997-02-01',
  };

  return initialValues;
};

export const bikeInsuranceInitialValues = (values) => {
  const value = Object.values(values);
  // console.log(value);
  const initialValues = {
    c_customer_type: 'I',
    c_plan: 'TP-1-OD-1',
    c_make: value.length > 0 ? values.c_make : null,
    c_model: value.length > 0 ? values.c_model : null,
    c_variant: value.length > 0 ? values.c_make_model : null,
    c_registration_date: value.length > 0 ? values.c_registartion_date : null,
    c_place_of_registration: value.length > 0 ? values.c_place_of_registration : null,
    c_manufacture_year_month: value.length > 0 ? values.c_manufacture_year_month : null,
    c_existing_policy: true,
    c_prev_policy_expire_date: value.length > 0 ? values.c_prev_policy_expire_date : null,
    c_prev_previous_insurer: null,
    c_claim_last_year: false,
    c_ncb: null,
    c_full_name: value.length > 0 ? values.c_full_name : null,
    c_mobile: null,
    c_email: null,
    c_fuel_type: value.length > 0 ? values.c_fuel_type : null,
  };

  return initialValues;
};

export const getBikeInsuranceInitialValues = (values) => {
  // console.log(values);
  const initialValues = {
    c_customer_type: values.c_customer_type,
    c_plan: values?.c_plan,
    c_make: values?.c_make,
    c_model: values.c_model,
    c_variant: values.c_make_model.split(',')[2],
    c_registration_date: values.c_registration_date,
    c_place_of_registration: values.c_place_of_registration,
    c_manufacture_year_month: format(new Date(values.c_manufacture_year_month), 'dd/MM/yyyy').slice(3) || null,
    c_existing_policy: values.c_existing_policy,
    c_prev_policy_expire_date: values.c_prev_policy_expire_date,
    c_prev_previous_insurer: values.c_prev_previous_insurer,
    c_claim_last_year: values.c_claim_last_year,
    c_ncb: values.c_ncb,
    c_full_name: values.c_full_name,
    c_mobile: values.c_mobile,
    c_email: values.c_email,
    c_fuel_type: values.c_fuel_type,
    c_model_code: values.c_model_code,
    c_policy_tenure: values.c_policy_tenure,
    c_prev_previous_insurer_code: values.c_prev_previous_insurer_code,
    c_rto_location_code: values.c_rto_location_code,
    c_rto_registration_code: values.c_rto_registration_code,
    c_rto_state_code: values.c_rto_state_code,
    c_third_party_damage: values.c_third_party_damage,
    c_own_damage: values.c_own_damage,
    c_variant_code: values.c_variant_code,
  };

  return initialValues;
};

export const getCarInsuranceInitialValues = (values) => {
  const initialValues = {
    c_customer_type: values.c_customer_type,
    c_plan: values?.c_plan,
    c_make: values?.c_make,
    c_model: values.c_model,
    c_variant: values.c_make_model.split(',')[2],
    c_registration_date: values.c_registration_date,
    c_place_of_registration: values.c_place_of_registration,
    c_manufacture_year_month: format(new Date(values.c_manufacture_year_month), 'dd/MM/yyyy').slice(3) || null,
    c_existing_policy: values.c_existing_policy,
    c_prev_policy_expire_date: values.c_prev_policy_expire_date,
    c_prev_previous_insurer: values.c_prev_previous_insurer,
    c_claim_last_year: values.c_claim_last_year,
    c_ncb: values.c_ncb,
    c_full_name: values.c_full_name,
    c_mobile: values.c_mobile,
    c_email: values.c_email,
    c_fuel_type: values.c_fuel_type,
    c_model_code: values.c_model_code,
    c_policy_tenure: values.c_policy_tenure,
    c_prev_previous_insurer_code: values.c_prev_previous_insurer_code,
    c_rto_location_code: values.c_rto_location_code,
    c_rto_registration_code: values.c_rto_registration_code,
    c_rto_state_code: values.c_rto_state_code,
    c_third_party_damage: values.c_third_party_damage,
    c_own_damage: values.c_own_damage,
    c_variant_code: values.c_variant_code,
    c_tp_previous_insurer: values.c_tp_previous_insurer,
  };
  return initialValues;
};

export const newBikeInsuranceInitialValues = () => {
  const initialValues = {
    c_customer_type: 'I',
    c_plan: 'TP-5-OD-1',
    c_make: null,
    c_model: null,
    c_variant: null,
    c_registration_date: null,
    c_manufacture_year_month: null,
    c_full_name: null,
    c_mobile: null,
    c_email: null,
    c_fuel_type: null,
  };

  return initialValues;
};

export const bikeInsuranceRadios = {
  companyArray: [
    {
      displayValue: 'Company',
      inputValue: 'C',
      uniqueName: 'companyValue1',
    },
    {
      displayValue: 'Individual',
      inputValue: 'I',
      uniqueName: 'companyValue2',
    },
  ],
  planArray: [
    {
      displayValue: 'T.P only for 1 Yr',
      inputValue: 'TP-1-OD-0',
      uniqueName: 'TP-1-OD-0',
    },
    {
      displayValue: 'O.D only for 1 Yr',
      inputValue: 'TP-0-OD-1',
      uniqueName: 'TP-0-OD-1',
    },
    {
      displayValue: 'T.P + O.D. for 1 Yr',
      inputValue: 'TP-1-OD-1',
      uniqueName: 'TP-1-OD-1',
    },
    {
      displayValue: 'T.P + O.D. for 2 Yr',
      inputValue: 'TP-2-OD-2',
      uniqueName: 'TP-2-OD-2',
    },
    {
      displayValue: 'T.P + O.D. for 3 Yr',
      inputValue: 'TP-3-OD-3',
      uniqueName: 'TP-3-OD-3',
    },
  ],
  existingPolicyArrays: [
    {
      displayValue: 'Yes',
      inputValue: true,
      uniqueName: 'existing-plan-yes',
    },
    {
      displayValue: 'No',
      inputValue: false,
      uniqueName: 'existing-plan-no',
    },
  ],
  claimLastYearArrays: [
    {
      displayValue: 'Yes',
      inputValue: true,
      uniqueName: 'claim-last-year-yes',
    },
    {
      displayValue: 'No',
      inputValue: false,
      uniqueName: 'claim-last-year-no',
    },
  ],
  ncbArray: [
    {
      displayValue: '0',
      inputValue: 0,
      uniqueName: '0',
    },
    {
      displayValue: '20',
      inputValue: 20,
      uniqueName: '20',
    },
    {
      displayValue: '25',
      inputValue: 25,
      uniqueName: '25',
    },
    {
      displayValue: '35',
      inputValue: 35,
      uniqueName: '35',
    },
    {
      displayValue: '45',
      inputValue: 45,
      uniqueName: '45',
    },
    {
      displayValue: '50',
      inputValue: 50,
      uniqueName: '50',
    },
  ],
};

export const newBikeInsuranceRadios = {
  companyArray: [
    {
      displayValue: 'Company',
      inputValue: 'C',
      uniqueName: 'companyValue1',
    },
    {
      displayValue: 'Individual',
      inputValue: 'I',
      uniqueName: 'companyValue2',
    },
  ],
  planArray: [
    {
      displayValue: 'O.D 1 Yr + T.P 5 Yr',
      inputValue: 'TP-5-OD-1',
      uniqueName: 'TP-5-OD-1',
    },
    {
      displayValue: 'O.D 3 Yr + T.P 5 Yr',
      inputValue: 'TP-5-OD-3',
      uniqueName: 'TP-5-OD-3',
    },
    {
      displayValue: 'O.D 5 Yr + T.P 5 Yr',
      inputValue: 'TP-5-OD-5',
      uniqueName: 'TP-5-OD-5',
    },
  ],
};

export const carInsuranceInitialValues = (values) => {
  const value = Object.values(values);
  // console.log(Object.values(value.c_make));
  const initialValues = {
    c_customer_type: 'I',
    c_plan: 'TP-1-OD-1',
    c_make: value.length > 0 ? values.c_make : '',
    c_model: value.length > 0 ? values.c_model : null,
    c_fuel_type: value.length > 0 ? values.c_fuel_type : null,
    c_variant: value.length > 0 ? values.c_make_model : null,
    c_registration_date: value.length > 0 ? values.c_registartion_date : null,
    c_place_of_registration: value.length > 0 ? values.c_place_of_registration : null,
    c_manufacture_year_month: value.length > 0 ? values.c_manufacture_year_month : null,
    c_existing_policy: value.length > 0 ? values : true,
    c_prev_policy_expire_date: value.length > 0 ? values.c_prev_policy_expire_date : null,
    c_prev_previous_insurer: value.length > 0 ? values.c_prev_previous_insurer : null,
    c_claim_last_year: false,
    c_ncb: null,
    c_full_name: value.length > 0 ? values.c_full_name : null,
    c_mobile: null,
    c_email: null,
    c_tp_previous_insurer: '',
  };
  return initialValues;
};

export const carInsuranceRadios = {
  companyArray: [
    {
      displayValue: 'Company',
      inputValue: 'C',
      uniqueName: 'companyValue1',
    },
    {
      displayValue: 'Individual',
      inputValue: 'I',
      uniqueName: 'companyValue2',
    },
  ],
  planArray: [
    {
      displayValue: 'T.P only for 1Yr',
      inputValue: 'TP-1-OD-0',
      uniqueName: 'TP-1-OD-0',
    },
    {
      displayValue: 'O.D only for 1Yr',
      inputValue: 'TP-0-OD-1',
      uniqueName: 'TP-0-OD-1',
    },
    {
      displayValue: 'Comprehensive Plan for 1Yr',
      inputValue: 'TP-1-OD-1',
      uniqueName: 'TP-1-OD-1',
    },
  ],
  existingPolicyArrays: [
    {
      displayValue: 'Yes',
      inputValue: true,
      uniqueName: 'existing-plan-yes',
    },
    {
      displayValue: 'No',
      inputValue: false,
      uniqueName: 'existing-plan-no',
    },
  ],
  existingComprehensivePolicyArrays: [
    {
      displayValue: 'Yes',
      inputValue: true,
      uniqueName: 'existing-comprehensive-plan-yes',
    },
    {
      displayValue: 'No',
      inputValue: false,
      uniqueName: 'existing-comprehensive-plan-no',
    },
  ],
  claimLastYearArrays: [
    {
      displayValue: 'Yes',
      inputValue: true,
      uniqueName: 'claim-last-year-yes',
    },
    {
      displayValue: 'No',
      inputValue: false,
      uniqueName: 'claim-last-year-no',
    },
  ],
  ncbArray: [
    {
      displayValue: '0',
      inputValue: 0,
      uniqueName: '0',
    },
    {
      displayValue: '20',
      inputValue: 20,
      uniqueName: '20',
    },
    {
      displayValue: '25',
      inputValue: 25,
      uniqueName: '25',
    },
    {
      displayValue: '35',
      inputValue: 35,
      uniqueName: '35',
    },
    {
      displayValue: '45',
      inputValue: 45,
      uniqueName: '45',
    },
    {
      displayValue: '50',
      inputValue: 50,
      uniqueName: '50',
    },
  ],
};

// new car initial values
export const newCarInsuranceInitialValues = () => {
  const initialValues = {
    c_customer_type: 'I',
    c_plan: 'CP-1-TP-2',
    c_make: null,
    c_model: null,
    c_variant: null,
    c_registration_date: null,
    c_manufacture_year_month: null,
    c_full_name: null,
    c_mobile: null,
    c_email: null,
    c_fuel_type: null,
  };

  return initialValues;
};

export const newCarInsuranceRadios = {
  companyArray: [
    {
      displayValue: 'Company',
      inputValue: 'C',
      uniqueName: 'companyValue1',
    },
    {
      displayValue: 'Individual',
      inputValue: 'I',
      uniqueName: 'companyValue2',
    },
  ],
  planArray: [
    {
      displayValue: 'T.P 3 Yr',
      inputValue: 'TP-3',
      uniqueName: 'TP-3',
    },
    {
      displayValue: 'Comprehensive 1 Yr + T.P 2 Yr',
      inputValue: 'CP-1-TP-2',
      uniqueName: 'CP-1-TP-2',
    },
  ],
};
