import {useQuery} from "react-query";
import {PlayerMatchesResponse} from "../domain/model/PlayerMatchesResponse";
import {matchesService} from "../domain/service/matchesService";

export const PLAYER_MATCHES_QUERY_KEY = "persons";

export function usePlayerMatches(playerId: number, perPage: number, page: number, competitionId?: string, dateFrom?: string, dateTo?: string) {
    return useQuery<PlayerMatchesResponse>([PLAYER_MATCHES_QUERY_KEY, playerId, perPage, page, competitionId, dateFrom, dateTo], () => matchesService.getPlayerMatches(playerId, perPage, page, competitionId, dateFrom, dateTo)
    );
}
