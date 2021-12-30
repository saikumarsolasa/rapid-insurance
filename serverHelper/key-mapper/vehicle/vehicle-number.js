import RTOArray from "../../db/rto_master.json";
import ModelArray from "../../db/UAT/tw_model.json";
import getYear from "date-fns/getYear";


// MH12SP4923
//           maker_description: TVS MOTOR COMPANY LTD
//           maker_model:  TVS APACHE RTR 200 4V
// MH12GH2531
//           maker_description: TVS MOTOR COMPANY LTD
//           maker_model:  TVS APACHE RTR 180
// TS21D3421
//           maker_description: INDIA YAMAHA MOTOR PVT LTD
//           maker_model:  YAMAHA R15 BSIV
// TS21G0007
//           maker_description: M/S. CLASSIC LEGENDS PVT LTD.
//           maker_model: JAWA FORTY TWO BSIV
// TS21A9099
//           maker_description: HONDA MOTORCYCLE AND SCOOTER INDIA (P) LTD
//           maker_model: ACTIVA 4G W E A S& KS&DRUMCBS
// AP29BJ5267
//           maker_description: HERO HONDA MOTORS  LTD
//           maker_model: CBZ X-TREME (ES)  BSIII
// TS21B4999
//           maker_description: ROYAL ENFIELD
//           maker_model: CLASSIC 350 BSIV



const MakeModelHandler = (server) => {

    const maker = server.maker_description
    const model = server.maker_model

    const selectedMake = ModelArray.map((model, i) => {
        
    })


}


export const VehicleServerToClient = (server) => {
    let c_rto_registration_code = null;
    let c_rto_location_code = null;
    let c_rto_cluster = null;
    let c_rto_state_code = null;
    let c_rto_registartion_zone = null;
    let c_rto_location = null;
    let c_rto_state = null;
    let c_rto_initials = null;
    let c_rto_tw_rules = null;

    let c_place_of_registration;
    let c_prev_previous_insurer;
    let c_prev_policy_number;
    let c_prev_policy_expire_date;
    let c_pucc_number;
    let c_pucc_upto;

    RTOArray.forEach((rto) => {
        if (server.rc_number.toLowerCase().slice(0, 4) === rto.rto_registration_code.toLowerCase()) {
            c_rto_registration_code = rto.rto_registration_code;
            c_rto_location_code = rto.rto_location_code;
            c_rto_cluster = rto.rto_cluster;
            c_rto_state_code = rto.rto_state_code;
            c_rto_registartion_zone = rto.rto_registration_zone;
            c_rto_location = rto.rto_location;
            c_rto_state = rto.rto_state;
            c_rto_initials = rto.rto_initials;
            c_rto_tw_rules = rto.rto_tw_uw_rules;
        }
    });

    if (c_rto_registration_code && c_rto_location) {
        c_place_of_registration = `${c_rto_registration_code}, ${c_rto_location}`;
    } else {
        c_place_of_registration = server.registered_at;
    }

    if (server.insurance_company === "NA") {
        c_prev_previous_insurer = null;
        c_prev_policy_number = null;
        c_prev_policy_expire_date = null;
    } else {
        c_prev_previous_insurer = server.insurance_company;
        c_prev_policy_number = server.insurance_policy_number;
        c_prev_policy_expire_date = server.insurance_upto;
    }

    if (server.pucc_number === "NA") {
        c_pucc_upto = null;
        c_pucc_number = null;
    } else {
        c_pucc_upto = server.pucc_upto;
        c_pucc_number = server.pucc_number;
    }

    /////////////////////////////////////////// Make, Model, Variant

    const makeModel = MakeModelHandler(server);

    const returnObject = {
        c_registration_number: server.rc_number || "",
        c_registartion_date: server.registration_date || "",
        c_address_line1: server.present_address || "",
        c_contact_address_line1: server.permanent_address || "",
        c_mobile: server.c_mobile || "",
        c_chassis_number: server.vehicle_chasi_number || "",
        c_engine_number: server.vehicle_engine_number || "",
        c_make: server.maker_description || "",
        c_model: server.maker_model || "",
        c_make_model: `${server.maker_description}, ${server.maker_model}, ${server.fuel_type}`,
        c_body_type: server.body_type || "",
        c_fuel_type: server.fuel_type || "",
        c_full_name: server.owner_name || "",
        c_colour: server.colour || "",
        c_financed: server.financed || "",
        c_prev_previous_insurer,
        c_prev_policy_number,
        c_prev_policy_expire_date,
        c_manufacture_year_month: server.manufacturing_date || "",
        c_place_of_registration,
        c_cubic_capacity: server.cubic_capacity || "",
        c_vehicle_weight: server.vehicle_gross_weight || "",
        c_no_cylinders: server.no_cylinders || "",
        c_seat_capacity: server.seat_capacity || "",
        c_vehicle_category_desc: server.vehicle_category_description || "",
        c_variant: server.variant || "",
        c_rto_cluster,
        c_rto_initials,
        c_rto_location,
        c_rto_location_code,
        c_rto_registration_code,
        c_rto_registartion_zone,
        c_rto_state,
        c_rto_state_code,
        c_rto_tw_rules,
        c_pucc_number,
        c_pucc_upto,
    };

    return returnObject;
};
