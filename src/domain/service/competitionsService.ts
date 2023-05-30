import {api} from "./api";

function getCompetitions() {
    return api.get("/competitions").then((response) => {
        return response.data.competitions;
    });
}

export const competitionsService = {
    getCompetitions,
};