import {useQuery} from "react-query";
import {TeamResponse} from "../domain/model/TeamResponse";
import {teamService} from "../domain/service/teamService";

export const TEAM_QUERY_KEY = "teams";

export function useTeam(teamId: number) {
    return useQuery<TeamResponse>([TEAM_QUERY_KEY, teamId], () => teamService.getTeam(teamId)
    );
}
