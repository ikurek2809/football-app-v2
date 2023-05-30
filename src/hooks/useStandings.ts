import {useQuery} from "react-query";
import {StandingsResponse} from "../domain/model/StandingsResponse";
import {standingsService} from "../domain/service/standingsService";

export const STANDINGS_QUERY_KEY = "standings";

export function useStandings(competitionId: string) {
    return useQuery<StandingsResponse>([STANDINGS_QUERY_KEY, competitionId], () => standingsService.getStandings(competitionId)
    );
}
