import {api} from "./api";
import {RegistrationData} from "../model/RegistrationData";

export function sendRegistrationData(data: RegistrationData) {
    return api.post("/registration", {data});
}

export const registrationService = {
    sendRegistrationData,
};
