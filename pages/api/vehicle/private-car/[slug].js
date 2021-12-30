// const vehiclesArray = require('../../../../db/tw_model_master.json')
const vehiclesArray = require("serverHelper/db/UAT/pc_model.json");

export default function handler(req, res) {
    const { slug } = req.query;

    switch (slug) {
        case "manufacturers-models":
            if (req.method === "GET") GetManufacturersModels(req, res);
            break;
        case "manufacturers":
            if (req.method === "GET") GetManufacturers(req, res);
            break;
        case "variants":
            if (req.method === "POST") PostVariants(req, res);
            break;
        case "models":
            if (req.method === "POST") PostModels(req, res);
            break;

        default:
            res.status(404).send("Something went wrong");
            break;
    }
}


const GetManufacturersModels = (req, res) => {
    const vehiclemanufacturers = [];

    vehiclesArray.map((vehicle) => {
        const vehicleFilter = vehiclemanufacturers.filter((value) => value.manufacturer_code === vehicle.manufacturer_code && value.model_code === vehicle.model_code);
        if (vehicleFilter.length > 0) {
            return;
        }
        vehiclemanufacturers.push({
            c_make: vehicle.manufacturer,
            c_make_code: vehicle.manufacturer_code,
            c_model: vehicle.model,
            c_model_code: vehicle.model_code,
            c_fuel_type: vehicle.fuel_type,
        });
    });

    res.status(200).send({ status: 200, vehiclemanufacturers });
};


const GetManufacturers = (req, res) => {
    const vehiclemanufacturers = [];

    const manufacture_codes = [...new Set(vehiclesArray.map((vehicle) => vehicle.manufacturer_code))];

    manufacture_codes.forEach((value) => {
        const filteredVehicle = vehiclesArray.find((vehicle) => vehicle.manufacturer_code === value);
        if (filteredVehicle) {
            vehiclemanufacturers.push({
                c_make: filteredVehicle.manufacturer,
                c_make_code: filteredVehicle.manufacturer_code,
            });
        }
    });

    res.status(200).send({ status: 200, makes: vehiclemanufacturers });
};



const PostVariants = (req, res) => {
    const { manufacturer_code, model_code } = req.body;

    const variantsArray = vehiclesArray
        .filter((vehicle) => vehicle.manufacturer_code === Number(manufacturer_code) && vehicle.model_code === Number(model_code))
        .map((vehicle) => {
            return {
                c_variant: vehicle.variant,
                c_variant_code: vehicle.variant_code,
                c_fuel_type: vehicle.fuel_type,
                c_vehicle_CC: vehicle.cubic_capacity,
            };
        });

    const variants = [...new Set(variantsArray)];
    res.status(200).send({ status: 200, variants });
};



const PostModels = (req, res) => {
    const { manufacturer_code } = req.body;
    const models = [];

    const manufacture_codes = [...new Set(vehiclesArray.filter((vehicle) => vehicle.manufacturer_code === manufacturer_code))];
    const model_codes = [...new Set(vehiclesArray.map((vehicle) => vehicle.model_code))];

    model_codes.forEach((value) => {
        const filteredModel = manufacture_codes.find((vehicle) => vehicle.model_code === value);
        if (filteredModel) {
            models.push({
                c_model: filteredModel.model,
                c_model_code: filteredModel.model_code,
            });
        }
    });

    res.status(200).send({ status: 200, models });
};



const PostTwoWheelerDetails = (req, res) => {
    const { variant_code } = req.body;
    const two_wheeler = [];

    vehiclesArray.forEach((vehicle) => {
        const filteredModel = manufacture_codes.find((vehicle) => vehicle.model_code === value);
        if (filteredModel) {
            two_wheeler.push({
                c_make: filteredModel.manufacturer,
                c_make_code: filteredModel.manufacturer_code,
                c_model: filteredModel.model,
                c_model_code: filteredModel.model_code,
                c_variant: filteredModel.variant,
                c_variant_code: filteredModel.variant_code,
            });
        }
    });
};
