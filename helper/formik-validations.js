import { tablePaginationClasses } from '@mui/material';
import * as yup from 'yup';

export const bike_buynow_validations = yup.object({
  c_title: yup.string().required('Please select the title'),
  c_first_name: yup.string().required('Please enter the first name').min(6, 'Please enter atleast 3 characters'),
  c_last_name: yup.string().required('Please enter the last name').min(6, 'Please enter atleast 3 characters'),
  c_maritial_status: yup.string().required('Please select the marital status'),
  c_aadhar_number: yup
    .string()
    .required('Please enter the aadhar')
    .matches(/^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/, 'Please Enter 12 Digit Aadhaar Number'),
  c_gender: yup.string().required('Please select the gender'),
  c_gst_number: yup.string(),
  c_mobile: yup
    .string()
    .required('Please enter the mobile')
    .matches(/^[6-9]\d{9}$/, 'Please Enter a valid Phone Number'),
  c_email: yup.string().required('Please enter the email').email('Please enter valid email address'),
  c_dob: yup.string().required('Please select date of birth').nullable(),
  // c_cpa: yup.string().required("Please enter the cpa").min(6, "Please enter atleast 6 characters"),
  c_address_line1: yup.string().required('Please enter the address line1').min(6, 'Please enter atleast 6 characters'),
  c_address_line2: yup.string().required('Please enter the address line2').min(6, 'Please enter atleast 6 characters'),
  c_address_line3: yup.string(),
  c_pincode: yup
    .string()
    .required('Please enter the pincode')
    .matches(/^[1-9]{1}[0-9]{2}[0-9]{3}$/, 'Please Enter a valid Pincode'),
  c_city: yup.string().required('Please enter the city'),
  c_state: yup.string().required('Please enter the state'),
  c_registration_number: yup
    .string()
    .required('Please enter the registration number')
    .matches(/^[A-Za-z]{2,3}(\d{2}([A-Za-z]{1,2})?)?\d{3,4}$/, 'Please enter valid registration number'),
  c_engine_number: yup
    .string()
    .required('Please enter the engine number')
    .matches(/^[A-Za-z]{2}[A-z0-9]{5,16}$/, 'Please enter valid engine number'),
  c_chassis_number: yup
    .string()
    .required('Please enter the chassis number')
    .matches(/^[A-Za-z]{2}[A-z0-9]{5,16}$/, 'Please enter valid chassis number'),
  c_prev_policy_number: yup.string().required('Please enter the previous policy number'),
  c_vehicle_colour: yup.string().required('Please enter the color type'),
  c_is_vehicle_financed: yup.string().required('Please enter the is vehicle financed'),
  c_valid_pucc: yup.string().required('Please enter the is valid pucc'),
  c_nominee_relation: yup.string().required('Please enter the nominee relationship'),
  c_nominee_full_name: yup.string().required('Please enter the nominee full name'),
  c_nominee_dob: yup.string().nullable().required('Please enter the dob'),
});

export const newBikeInsuranceValidation = () => {
  const initialValidation = {
    c_make: yup.string().required('Please select vehicle manufacturer').nullable(),
    c_model: yup.string().required('Please select the vehicle model').nullable(),
    c_variant: yup.string().required('Please select the vehicle variant').nullable(),
    c_manufacture_year_month: yup.string().required('Please select the manufacture year/month').nullable(),
    c_fuel_type: yup.string().required('Pleae select fuel type').nullable(),
    c_full_name: yup
      .string()
      .required('Please enter full name')
      .matches(/^[a-zA-Z\s]+$/, 'Please enter a valid name')
      .min(6, 'Please enter atleast 6 characters')
      .nullable(),
    c_mobile: yup
      .string()
      .required('Please enter mobile number')
      .matches(/^[6-9]\d{9}$/, 'Please enter valid mobile number')
      .nullable()
      .length(10, 'Please enter 10 digits mobile number'),
    c_email: yup.string().email('Please enter valid email address').required('Please enter email address').nullable(),
  };
  return yup.object({
    ...initialValidation,
  });
};

export const bikeInsuranceValidations = (showExistingFields, showNcb, variants) => {
  let validations;

  const InitialValidations = {
    c_customer_type: yup.string().required('Select the type').nullable(),
    c_plan: yup.string().required('Select the plan type').nullable(),
    c_make: yup.string().required('Please select vehicle manufacturer').nullable(),
    c_model: yup.string().required('Please select vehicle model').nullable(),
    c_variant: yup.string().required('Please select vehicle variant').nullable(),
    c_registration_date: yup.string().required('Please select the registration date').nullable(),
    c_place_of_registration: yup.string().required('Please select place of registration').nullable(),
    c_fuel_type: yup.string().required('Pleae select fuel type').nullable(),
    c_manufacture_year_month: yup.string().required('Please select manufacture month/year').nullable(),
    c_existing_policy: yup.string().required('Please select the valid value').nullable(),
    c_full_name: yup
      .string()
      .required('Please enter full name')
      .matches(/^[a-zA-Z\s]+$/, 'Please enter a valid name')
      .min(6, 'Please enter atleast 6 characters')
      .nullable(),
    c_mobile: yup
      .string()
      .required('Please enter 10 digits mobile number')
      .nullable()
      .length(10, 'Please enter 10 digits mobile number')
      .matches(/^[6-9]\d{9}$/, 'Please enter valid mobile number'),
    c_email: yup.string().email('Please enter valid email address').required('Please enter email address').nullable(),
  };
  const existingPolicyValidations = {
    c_prev_policy_expire_date: yup.string().required('Select the previous policy expire date').nullable(),
    c_prev_previous_insurer: yup.string().required('Select the previous insurer company').nullable(),
    c_claim_last_year: yup.string().required('Select the last year claim').nullable(),
  };

  const ncbValidations = {
    c_ncb: yup.string().required('Select previous year ncb').nullable(),
  };

  // validations = yup.object({
  //   ...InitialValidations,
  // });

  if (showExistingFields && showNcb) {
    return (validations = yup.object({
      ...InitialValidations,
      ...existingPolicyValidations,
    }));
  } else if (showExistingFields && !showNcb) {
    return (validations = yup.object({
      ...InitialValidations,
      ...existingPolicyValidations,
      ...ncbValidations,
    }));
  } else {
    return (validations = yup.object({
      ...InitialValidations,
    }));
  }
};

export const carInsuranceValidations = (showExistingFields, showNcb, variants, planType) => {
  let validations;

  const InitialValidations = {
    c_customer_type: yup.string().required('Select the type').nullable(),
    c_plan: yup.string().required('Select the plan type').nullable(),
    c_make: yup.string().required('Please select vehicle manufacturer').nullable(),
    c_model: yup.string().required('Please select vehicle model').nullable(),
    c_variant: yup.string().required('Please select vehicle variant').nullable(),
    c_registration_date: yup.string().required('Please select the registration date').nullable(),
    c_place_of_registration: yup.string().required('Please select place of registration').nullable(),
    c_fuel_type: yup.string().required('Pleae select fuel type').nullable(),
    c_manufacture_year_month: yup.string().required('Please select manufacture month/year').nullable(),
    c_existing_policy: yup.string().required('Please select the valid value').nullable(),
    c_full_name: yup
      .string()
      .required('Please enter full name')
      .matches(/^[a-zA-Z\s]+$/, 'Please enter a valid name')
      .min(6, 'Please enter atleast 6 characters')
      .nullable(),
    c_mobile: yup
      .string()
      .required('Please enter 10 digits mobile number')
      .nullable()
      .length(10, 'Please enter 10 digits mobile number')
      .matches(/^[6-9]\d{9}$/, 'Please enter valid mobile number'),
    c_email: yup.string().email('Please enter valid email address').required('Please enter email address').nullable(),
  };
  const existingPolicyValidations = {
    c_prev_policy_expire_date: yup.string().required('Select the previous policy expire date').nullable(),
    c_prev_previous_insurer: yup.string().required('Select the previous insurer company').nullable(),
    c_claim_last_year: yup.string().required('Select the last year claim').nullable(),
  };

  const ncbValidations = {
    c_ncb: yup.string().required('Select previous year ncb').nullable(),
  };

  const tpPreviousInsurer = {
    c_tp_previous_insurer: yup.string().required('Select TP previous policy Insurer'),
  };

  if (planType === 'TP-1-OD-1' && showExistingFields && !showNcb) {
    return (validations = yup.object({
      ...InitialValidations,
      ...existingPolicyValidations,
      ...ncbValidations,
    }));
  } else if (planType === 'TP-1-OD-0' && showExistingFields && !showNcb) {
    return (validations = yup.object({
      ...InitialValidations,
      ...existingPolicyValidations,
      ...ncbValidations,
    }));
  } else if (planType === 'TP-0-OD-1' && showExistingFields && !showNcb) {
    return (validations = yup.object({
      ...InitialValidations,
      ...existingPolicyValidations,
      ...ncbValidations,
      ...tpPreviousInsurer,
    }));
  } else if (planType === 'TP-0-OD-1' && !showExistingFields && !showNcb) {
    return (validations = yup.object({
      ...InitialValidations,
      ...tpPreviousInsurer,
    }));
  } else {
    return (validations = yup.object({
      ...InitialValidations,
    }));
  }
};
