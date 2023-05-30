import {useQuery} from "react-query";
import {MatchesResponse} from "../domain/model/MatchesResponse";
import {matchesService} from "../domain/service/matchesService";

export const ALL_MATCHES_QUERY_KEY = "matches";

export function useAllMatches(dateFrom: string, dateTo: string, competitionId?: string) {
    return useQuery<MatchesResponse>([ALL_MATCHES_QUERY_KEY, dateFrom, dateTo, competitionId], () => matchesService.getAllMatches(dateFrom, dateTo, competitionId)
    );
}
