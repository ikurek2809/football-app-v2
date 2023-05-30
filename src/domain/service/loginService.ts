import {api} from "./api";
import {LoginData} from "../model/LoginData";

export function sendLoginData(data: LoginData) {
    return api.post("/login", {data});
}

export const loginService = {
    sendLoginData,
};
