import {api} from "./api";
import {FixturesResponse} from "../model/FixturesResponse";

function getFixtures(competitionId: string): Promise<FixturesResponse> {
    return api.get(`competitions/${competitionId}/matches`).then((response) => {
        return response.data;
    });
}

export const fixturesService = {
    getFixtures,
};