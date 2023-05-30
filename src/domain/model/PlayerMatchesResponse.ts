import {Player} from "./TeamResponse";
import {Match} from "./FixturesResponse";

export type PlayerMatchesResponse = {
    person: Player;
    matches: Match[];
}
