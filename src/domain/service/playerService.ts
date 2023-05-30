import {api} from "./api";
import {PlayerResponse} from "../model/PlayerResponse";


function getPlayer(personId: number): Promise<PlayerResponse> {
    return api.get(`persons/${personId}`).then((response) => {
        return response.data;
    });
}

export const playerService = {
    getPlayer,
};