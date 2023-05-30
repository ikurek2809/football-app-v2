import {api} from "./api";
import {TeamsResponse} from "../model/TeamsResponse";

function getTeams(perPage: number, page: number): Promise<TeamsResponse> {
    const limit = perPage;
    const offset = (page - 1) * perPage;

    return api.get(`teams?limit=${limit}&offset=${offset}`).then((response) => {
        return response.data;
    });
}

export const teamsService = {
    getTeams,
};