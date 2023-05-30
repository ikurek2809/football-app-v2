import dayjs from "dayjs";
import {useSearchParams} from "react-router-dom";
import {dateFormat} from "../utils/datetime";

export function useQueryParams(perPageNumber = 12) {
    const [searchParams] = useSearchParams();
    const today = new Date();
    const dateFromParam = searchParams.get("dateFrom");
    const dateFrom = dateFromParam ? dateFromParam : dayjs(today).format(dateFormat.default);
    const dateToParam = searchParams.get("dateTo");
    const dateTo = dateToParam ? dateToParam : dayjs(today).add(7, "day").format(dateFormat.default);
    const pageParam = searchParams.get("page");
    const page = pageParam ? Number(pageParam) : 0;
    const perPageParam = searchParams.get("perPage");
    const perPage = perPageParam ? Number(perPageParam) : perPageNumber;


    const competitionParam = searchParams.get("competition");
    const compId = competitionParam ? String(competitionParam) : undefined;
    return {dateFrom, dateTo, compId, page, perPage}
}
