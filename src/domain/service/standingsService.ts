import {api} from "./api";
import {StandingsResponse} from "../model/StandingsResponse";

function getStandings(competitionId: string): Promise<StandingsResponse> {
    return api.get(`competitions/${competitionId}/standings`).then((response) => {
        return response.data;
    });
}

export const standingsService = {
    getStandings,
};