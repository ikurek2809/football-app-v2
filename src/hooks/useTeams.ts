import {useQuery} from "react-query";
import {TeamsResponse} from "../domain/model/TeamsResponse";
import {teamsService} from "../domain/service/teamsService";

export const TEAMS_QUERY_KEY = "teams";

export function useTeams(perPage: number, page: number) {
    return useQuery<TeamsResponse>([TEAMS_QUERY_KEY, perPage, page], () => teamsService.getTeams(perPage, page)
    );
}
