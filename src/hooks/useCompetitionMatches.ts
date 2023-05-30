import {useQuery} from "react-query";
import {matchesService} from "../domain/service/matchesService";
import {CompetitionMatchesResponse} from "../domain/model/CompetitionMatchesResponse";

export const COMPETITION_MATCHES_QUERY_KEY = "competitionMatches";

export function useCompetitionMatches(competitionId: string, matchday?: number) {
    return useQuery<CompetitionMatchesResponse>([COMPETITION_MATCHES_QUERY_KEY, competitionId, matchday], () => matchesService.getCompetitionMatches(competitionId, matchday),
        {enabled: matchday !== undefined}
    );
}
