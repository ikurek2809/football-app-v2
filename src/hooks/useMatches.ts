import {useQuery} from "react-query";
import {MatchesResponse} from "../domain/model/MatchesResponse";
import {matchesService} from "../domain/service/matchesService";

export const MATCHES_QUERY_KEY = "matches";

export function useMatches(teamId: number, dateFrom: string, dateTo: string, competitionId?: string) {
    return useQuery<MatchesResponse>([MATCHES_QUERY_KEY, teamId, dateFrom, dateTo, competitionId], () => matchesService.getMatches(teamId, dateFrom, dateTo, competitionId)
    );
}
