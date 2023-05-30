import {Match} from "./FixturesResponse";
import {Competition} from "./Competition";

export type CompetitionMatchesResponse = {
    competition: Competition;
    matches: Match[];
}
