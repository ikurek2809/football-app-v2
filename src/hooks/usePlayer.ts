import {useQuery} from "react-query";
import {PlayerResponse} from "../domain/model/PlayerResponse";
import {playerService} from "../domain/service/playerService";
export const PLAYER_QUERY_KEY = "persons";

export function usePlayer(playerId: number) {
    return useQuery<PlayerResponse>([PLAYER_QUERY_KEY, playerId], () => playerService.getPlayer(playerId)
    );
}
