import {api} from "./api";
import {MatchesResponse} from "../model/MatchesResponse";
import {PlayerMatchesResponse} from "../model/PlayerMatchesResponse";
import {CompetitionMatchesResponse} from "../model/CompetitionMatchesResponse";


function getMatches(teamId: number, dateFrom: string, dateTo: string, competitionId?: string): Promise<MatchesResponse> {
    const competitionParam = competitionId ? `&competitions=${competitionId}` : "";
    const url = `teams/${teamId}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}${competitionParam}`;
    return api.get(url).then((response) => {
        return response.data;
    });
}

function getAllMatches(dateFrom: string, dateTo: string, competitionId?: string): Promise<MatchesResponse> {
    const competitionParam = competitionId ? `&competitions=${competitionId}` : "";
    const url = `matches?dateFrom=${dateFrom}&dateTo=${dateTo}${competitionParam}`;
    return api.get(url).then((response) => {
        return response.data;
    });
}

function getPlayerMatches(personId: number, perPage: number, page: number, competitionId?: string, dateFrom?: string, dateTo?: string): Promise<PlayerMatchesResponse> {
    const limit = perPage;
    const offset = (page - 1) * perPage;
    const competitionParam = competitionId ? `&competitions=${competitionId}` : "";
    const dateFromParam = dateFrom ? `&dateFrom=${dateFrom}` : "";
    const dateToParam = dateTo ? `&dateTo=${dateTo}` : "";

    return api.get(`persons/${personId}/matches?limit=${limit}&offset=${offset}${competitionParam}${dateFromParam}${dateToParam}`).then((response) => {
        return response.data;
    });
}

function getCompetitionMatches(competitionId: string, matchDay?: number): Promise<CompetitionMatchesResponse> {
    return api.get(`competitions/${competitionId}/matches?matchday=${matchDay}`).then((response) => {
        return response.data;
    });
}

export const matchesService = {
    getMatches,
    getAllMatches,
    getPlayerMatches,
    getCompetitionMatches
};