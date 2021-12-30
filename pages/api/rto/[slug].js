const kotakUatTwRto = require("serverHelper/db/UAT/tw_rto.json");
const kotakUatPcRto = require("serverHelper/db/UAT/pc_rto.json");
const rto = require("serverHelper/db/rto_master.json");

export default function handler(req, res) {
    const { slug } = req.query;

    switch (slug) {
        case "states":
            if (req.method === "GET") GetState(req, res);
            break;
        case "locations":
            if (req.method === "POST") PostLoactions(req, res);
            break;
        case "all-locations":
            if (req.method === "GET") GetAllLocations(req, res);
            break;
        case "rto-details":
            if (req.method === "POST") PostRtoDetails(req, res);
            break;
        case "tw-states":
            if (req.method === "GET") GetState(req, res);
            break;
        case "tw-locations":
            if (req.method === "POST") PostLoactions(req, res);
            break;
        case "tw-all-locations":
            if (req.method === "GET") GetAllLocations(req, res);
            break;
        case "tw-rto-details":
            if (req.method === "POST") PostRtoDetails(req, res);
            break;
        case "pc-states":
            if (req.method === "GET") GetState(req, res);
            break;
        case "pc-locations":
            if (req.method === "POST") PostLoactions(req, res);
            break;
        case "pc-all-locations":
            if (req.method === "GET") GetAllLocations(req, res);
            break;
        case "pc-rto-details":
            if (req.method === "POST") PostRtoDetails(req, res);
            break;

        default:
            res.status(404).send("Something went wrong");
            break;
    }
}

const GetState = (req, res) => {
    const filterRTO = [];

    let rtoArray = [];

    if (req.query.slug === "states") {
        rtoArray = [...rto];
    } else if (req.query.slug === "tw-states") {
        rtoArray = [...kotakUatTwRto];
    } else if (req.query.slug === "pc-states") {
        rtoArray = [...kotakUatPcRto];
    }

    rtoArray.map((uatValue) => {
        const filterState = rto.filter((value) => value.rto_location_code === uatValue.rto_location_code);
        if (filterState.length > 0) {
            filterRTO.push(filterState[0]);
        }
    });

    const states = [];

    const stateCodeArray = filterRTO.map((value) => {
        return value.rto_state_code;
    });

    const stateCodeNoRepeat = [...new Set(stateCodeArray)];
    stateCodeNoRepeat.map((value) => {
        for (let x = 0; x < filterRTO.length; x++) {
            if (value === filterRTO[x].rto_state_code) {
                states.push({
                    c_rto_state: filterRTO[x].rto_state,
                    c_rto_state_code: filterRTO[x].rto_state_code,
                });
                return;
            }
        }
    });

    res.send({ status: 200, data: states });
};

const PostLoactions = (req, res) => {
    const { state_code } = req.body;
    const uat = [...kotakUatTwRto, ...kotakUatPcRto];

    let rtoArray = [];

    if (req.query.slug === "locations") {
        rtoArray = [...rto];
    } else if (req.query.slug === "tw-locations") {
        rtoArray = [...kotakUatTwRto];
    } else if (req.query.slug === "pc-locations") {
        rtoArray = [...kotakUatPcRto];
    }

    const locations = rtoArray
        .filter((value) => Number(value.rto_state_code) === Number(state_code))
        .map((value) => {
            return {
                c_rto_location: value.rto_location,
                c_rto_location_code: value.rto_location_code,
                c_rto_registration_code: value.rto_registration_code,
            };
        });

    res.send({ status: 200, data: locations });
};

const GetAllLocations = (req, res) => {

    let rtoArray = [];

    if (req.query.slug === "all-locations") {
        rtoArray = [...rto];
    } else if (req.query.slug === "tw-all-locations") {
        rtoArray = [...kotakUatTwRto];
    } else if (req.query.slug === "pc-all-locations") {
        rtoArray = [...kotakUatPcRto];
    }


    const locations = rtoArray.map((value) => {
        return {
            c_rto_state: value.rto_state,
            c_rto_state_code: value.rto_state_code,
            c_rto_location: value.rto_location,
            c_rto_location_code: value.rto_location_code,
            c_rto_registration_code: value.rto_registration_code,
        };
    });

    res.send({ status: 200, data: locations });
};

const PostRtoDetails = (req, res) => {
    const { location_code } = req.body;
    const rtoDetails = rto.filter((value) => value.location_code === Number(location_code));
    res.send({ status: 200, data: rtoDetails });
};
