import {api} from "./api";
import {TeamResponse} from "../model/TeamResponse";

function getTeam(teamId: number): Promise<TeamResponse> {
    return api.get(`teams/${teamId}`).then((response) => {
        return response.data;
    });
}

export const teamService = {
    getTeam,
};