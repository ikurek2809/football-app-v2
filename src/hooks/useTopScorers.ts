import {useQuery} from "react-query";
import {ScorersResponse} from "../domain/model/TopScorersResponse";
import {topScorersService} from "../domain/service/topScorersService";

export const TOP_SCORERS_QUERY_KEY = "scorers";

export function useTopScorers(competitionId: string) {
    return useQuery<ScorersResponse>([TOP_SCORERS_QUERY_KEY, competitionId], () => topScorersService.getTopScorers(competitionId)
    );
}
