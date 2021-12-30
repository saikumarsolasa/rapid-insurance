

const INSURANCE_TYPES = {
    INSURANCE: {
        TWO_WHEELER: 'two_wheeler',
        PRIVATE_CAR: 'private_car',
        HEALTH: 'health'
    },
    TYPE: {
        PREMIUM: 'premium',
        PAYMENT_AND_PROPOSAL: 'payment_and_proposal'
    }
}

const KOTAK = {
    NAME: 'kotak',
    ...INSURANCE_TYPES,
}

export const constants = {
    kotak: {
        intermediate_name: "DUMMY FOR TESTING",
        intermediate_code: "3169170000",
        two_wheeler: {},
        private_car: {},
    },
};


module.exports = { KOTAK, constants }

