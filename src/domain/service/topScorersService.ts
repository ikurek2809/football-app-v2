import {api} from "./api";
import {ScorersResponse} from "../model/TopScorersResponse";

function getTopScorers(competitionId: string): Promise<ScorersResponse> {
    return api.get(`competitions/${competitionId}/scorers`).then((response) => {
        return response.data;
    });
}

export const topScorersService = {
    getTopScorers,
};