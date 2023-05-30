import {useQuery} from "react-query";
import {FixturesResponse} from "../domain/model/FixturesResponse";
import {fixturesService} from "../domain/service/fixturesService";

export const FIXTURES_QUERY_KEY = "fixtures";

export function useFixtures(competitionId: string) {
    return useQuery<FixturesResponse>([FIXTURES_QUERY_KEY, competitionId], () => fixturesService.getFixtures(competitionId)
    );
}
