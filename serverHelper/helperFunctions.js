export const checkNumberInString = (value) => {
    const stringArray = value.split("");

    for (var i = 0; i < stringArray.length; i++) {
        if (Number(stringArray[i]) || Number(stringArray[i]) === 0) {
            return false;
        }
    }
    return true;
};

export const splitRegistrationNumber = (registrationNumber) => {
    let num1 = registrationNumber.slice(0, 2).toUpperCase();
    let num2 = registrationNumber.slice(2, 4);
    let num3;
    let num4;

    if (checkNumberInString(registrationNumber.slice(4, 7))) {
        num3 = registrationNumber.slice(4, 7).toUpperCase();
        num4 = registrationNumber.slice(7, registrationNumber.length);
    } else if (checkNumberInString(registrationNumber.slice(4, 6))) {
        num3 = registrationNumber.slice(4, 6).toUpperCase();
        num4 = registrationNumber.slice(6, registrationNumber.length);
    } else if (checkNumberInString(registrationNumber.slice(4, 5))) {
        num3 = registrationNumber.slice(4, 5).toUpperCase();
        num4 = registrationNumber.slice(5, registrationNumber.length);
    }

    const response = {
        num1,
        num2,
        num3,
        num4,
    };

    return response;
}

export const errorResponse = (message) => {
    return {
            error: true,
            message: message,
        };
}