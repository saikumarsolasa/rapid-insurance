const { number } = require("yup");

const bikeInsuranceForm = {
    c_registration_number: null,
};

const bikeNumberDetailsFromServer = {
    c_vehicle_weight: null,
    c_no_cylinders: null,
    c_seat_capacity: null,
    c_model_cluster: null,
    c_model_segment: null,
    c_rto_location_code: null,
    c_rto_cluster: null,
    c_rto_initials: null,
    c_rto_location: null,
    c_rto_registration_code: null,
    c_rto_registartion_zone: null,
    c_rto_state: null,
    c_rto_state_code: null,
    c_rto_tw_rules: null,
    c_financed: null,
    c_rollover: null,
    c_prev_policy_start_date: null,
};

//////////////////////////////  Bike Insurance Form Page

const bikeInsuranceFormIfRegNumber = {
    c_customer_type: null,
    c_plan: null,
    c_third_party_damage: null,
    c_own_damage: null,
    c_policy_tenure: null,
    c_make_model: null, // That display's on front end
    c_make: null,
    c_make_code: null,
    c_model: null,
    c_model_code: null,
    c_fuel_type: null,
    c_variant: null,
    c_variant_code: null,
    c_registration_date: null,
    c_place_of_registration: null, //That display's on front end
    c_rto_location: null,
    c_rto_location_code: null,
    c_rto_state: null,
    c_rto_state_code: null,
    c_rto_registration_code: null,
    c_manufacture_year_month: null,
    c_manufacture_month: null,
    c_manufacture_year: null,
    c_existing_policy: null, //true || false
    c_prev_policy_expire_date: null,
    c_prev_previous_insurer: null,
    c_prev_previous_insurer_code: null,
    c_claim_last_year: null, //true || false
    c_ncb: null,
    c_full_name: null,
    c_mobile: null,
    c_email: null,
    c_rollover: null,
    c_new_customer: null,
};

const bikeInsuranceFormIfNoRegNumber = {
    c_customer_type: null,
    c_plan: null,
    c_third_party_damage: null,
    c_own_damage: null,
    c_policy_tenure: null,
    c_make_model: null, // That display's on front end
    c_make: null,
    c_make_code: null,
    c_model: null,
    c_model_code: null,
    c_fuel_type: null,
    c_variant: null,
    c_variant_code: null,
    c_registration_date: null,
    c_place_of_registration: null, //That display's on front end
    c_rto_location: null,
    c_rto_location_code: null,
    c_rto_state: null,
    c_rto_state_code: null,
    c_rto_registration_code: null,
    c_manufacture_year_month: null,
    c_manufacture_month: null,
    c_manufacture_year: null,
    c_existing_policy: null, //true || false
    c_prev_policy_expire_date: null,
    c_prev_previous_insurer: null,
    c_prev_previous_insurer_code: null,
    c_claim_last_year: null, //true || false
    c_ncb: null,
    c_full_name: null,
    c_mobile: null,
    c_email: null,
    c_rollover: null,
    c_new_customer: null,
};


//////////////////////////////  Bike Quotation Page

const quotationForm = {
    c_customer_ref_no: null,
    c_place_of_registration: null,
    c_make_model: null,
    c_premium_range: null,
    c_total_insurers: null,
    c_min_idv: null,
    c_max_idv: null,
    c_request_idv: null,
    c_idv: null,
    c_pa_cover_owner_driver: null, //true / false                   ///// c_personal_accident_cover changed to c_pa_cover_owner_driver
    c_legal_liability_pd: null, //true / false
    c_limit_tp_damage: null, //true / false
    c_unnamed_passenger: null, //no / 50000 / 100000 / 200000
    c_electrical_accessories: null, //5000 - 50000
    c_non_electrical_accessories: null, //5000 - 50000
    c_anti_theif_device: null,
    c_voluntry_excess: null,
    c_gst: null,
    c_gst_percent: null,
    c_service_id: null,
    c_plan_name: null,
    c_crn: null,
    c_basic_od_premium: null,
    c_ncb: null,
    c_ncb_discount: null,
    c_basic_tp_premium: null,
    c_net_premium: null, //(c_basic_od_premium + c_gst - c_ncb_discount) + c_gst + c_basic_tp_premium + ( covers if any )
    c_make_model_details: null,
    c_rto_details: null,
};

/////// To Server --- For Relaculate Quote

const re_caliculate_quote = {
    c_customer_type: null,
    c_plan: null,
    c_third_party_damage: null,
    c_own_damage: null,
    c_policy_tenure: null,
    c_make_model: null, // That display's on front end
    c_make: null,
    c_make_code: null,
    c_model: null,
    c_model_code: null,
    c_fuel_type: null,
    c_variant: null,
    c_variant_code: null,
    c_registration_date: null,
    c_place_of_registration: null, //That display's on front end
    c_rto_location: null,
    c_rto_location_code: null,
    c_rto_state: null,
    c_rto_state_code: null,
    c_rto_registration_code: null,
    c_manufacture_year_month: null,
    c_manufacture_month: null,
    c_manufacture_year: null,
    c_existing_policy: null, //true || false
    c_prev_policy_expire_date: null,
    c_prev_previous_insurer: null,
    c_prev_previous_insurer_code: null,
    c_claim_last_year: null, //true || false
    c_ncb: null,
    c_full_name: null,
    c_mobile: null,
    c_email: null,
    c_rollover: null,
    c_new_customer: null,
    c_request_idv: null,
    c_pa_cover_own_driver: null, //true / false                   ///// c_personal_accident_cover changed to c_pa_cover_own_driver
    c_legal_liability_pd: null, //true / false
    c_limit_tp_damage: null, //true / false
    c_unnamed_passenger: null, //no / 50000 / 100000 / 200000
    c_electrical_accessories: null, //5000 - 50000
    c_non_electrical_accessories: null, //5000 - 50000
    c_anti_theif_device: null,
    c_voluntry_excess: null,
};

/////// From Server --- After Successfull Relaculate Quote

const after_re_caliculate_quote = {
    c_net_premium: null,
    c_idv: null,
    c_gst: null,
    c_gst_percent: null,
    c_ncb: null,
    c_ncb_discount: null,
    c_basic_od_premium: null,
    c_basic_tp_premium: null,
    c_make_model_details: null,
    c_rto_details: null,
    c_unnamed_passenger: null,
    c_unnamed_passenger_premium: null,
    c_company_name: null,
    c_plan_name: null,
};

// ////////////////////////////////////////////////////////////////////// Buy Now Page

const buyNOwPageForm = {
    c_idv_or_c_request_idv: null,
    c_make_model: null,
    c_rto: null,
    c_registartion_date: null,
    c_policy_duration: null,
    c_prev_policy_expire_date: null,
    c_policy_tenure: null,
    c_electrical_accessories: null,
    c_non_electrical_accessories: null,
    c_ncb: null,
    c_voluntry_excess: null,
    c_anti_theif_device: null,
    c_aa_membership: null,
    c_ttpd: null, // Third Party Premium Declaraction
    c_title: null,
    c_first_name: null,
    c_middle_name: null,
    c_last_name: null,
    c_dob: null,
    c_maritial_status: null,
    c_pan_number: null,
    c_aadhar_number: null,
    c_occupation: null,
    c_gender: null,
    c_gst_number: null,
    c_mobile: null,
    c_email: null,
    c_cpa: null, //compulsalory personal acceident
    c_address_line1: null,
    c_address_line2: null,
    c_address_line3: null,
    c_pincode: null,
    c_city: null,
    c_state: null,
    c_contact_address_line1: null,
    c_contact_address_line2: null,
    c_contact_address_line3: null,
    c_contact_pincode: null,
    c_contact_city: null,
    c_contact_state: null,
    c_registration_number: null,
    c_engine_number: null,
    c_chassis_number: null,
    c_prev_policy_number: null,
    c_vehicle_colour: null,
    c_is_vehicle_financed: null, // true / false
    c_valid_pucc: null, //true / false
    c_nominee_relation: null,
    c_nominee_full_name: null,
    c_nominee_dob: null,
    c_terms_and_conditions: null,
    c_whatsapp_updates: null,
};

// //////////////////////////// SAVE PROPOSAL AND PAYMENT

const proposalAndPayment = {
    c_pan_number: null,
    c_passport_number: null,
    c_voter_id_number: null,
    c_pincode_locality: null,
    c_district: null,
    c_district_code: null,
    c_city_code: null,
    c_nominee_appointee_name: null,
    c_nominee_appointee_relationship: null,
    c_registration_number: null,
    c_workflow_id: null,
    c_quote_id: null,
    exmaple: null,
    exmaple: null,
    exmaple: null,
    exmaple: null,
    exmaple: null,
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////// PRIVATE CAR - PREMIUM  /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const privare_car = {
    c_lpg_cng: true || false,
    c_lpg_cng_si: Number(),
    c_return_to_invoice: true || false,
    c_road_side_assistance: true || false,
    c_engine_protect: true || false,
    c_depreciation_cover: true || false,
    c_consumable_cover: true || false,
    c_imt_28: true || false,
    c_imt_29: true || false,
    c_credit_score_required: true || false,
};
