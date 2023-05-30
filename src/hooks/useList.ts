import {stringify} from "qs";
import {ChangeEvent, MouseEvent} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useQueryParams} from "./useQueryParams";
import {useUrlQuery} from "./useUrlQuery";

export function useList(perPageNumber: number) {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const {page, perPage} = useQueryParams();
    const query = useUrlQuery();

    const pushFilterParams = (params: { [key: string]: string | number }) => {
        navigate(
            `${pathname}?${stringify({
                ...query,
                ...params,
            })}`
        );
    };

    const onPageChange = (e: MouseEvent<HTMLButtonElement> | null, page: number) => {
        pushFilterParams({page: page});
    };

    const onPerPageChange = (e: ChangeEvent<HTMLInputElement>) => {
        pushFilterParams({perPage: parseInt(e.target.value, 10), page: 1});
    };

    return {
        onPageChange,
        onPerPageChange,
        pushFilterParams,
        page,
        perPage,
    };
}
