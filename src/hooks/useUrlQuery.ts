import {useLocation} from "react-router-dom";
import queryString from 'query-string';

export function useUrlQuery() {
    const {search} = useLocation();
    return queryString.parse(search, {arrayFormat: "comma"});
}
