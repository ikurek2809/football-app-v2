import {useQuery} from "react-query";
import {Competition} from "../domain/model/Competition";
import {competitionsService} from "../domain/service/competitionsService";

export const COMPETITIONS_QUERY_KEY = "competitions";

export function useCompetitions() {
    return useQuery<Competition[]>(COMPETITIONS_QUERY_KEY, competitionsService.getCompetitions);
}
