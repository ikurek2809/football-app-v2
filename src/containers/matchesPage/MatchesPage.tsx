import React, {FC, memo, useState} from "react";
import Subheader from "../../components/subheader/Subheader";
import {Grid} from "@mui/material";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Matches from "../../components/matches/Matches";
import {useAllMatches} from "../../hooks/useAllMatches";
import classNames from "classnames";
import MatchesToolbar from "../../components/matchesToolbar/MatchesToolbar";
import {useCompetitions} from "../../hooks/useCompetitions";
import {useQueryParams} from "../../hooks/useQueryParams";
import {useTranslation} from "react-i18next";


type Props = Record<string, never>;

const MatchesPage: FC<Props> = memo(function MatchesPage() {
    const {
        dateFrom,
        dateTo,
        compId,
        matches,
        handleLoadMore,
        limit,
        competitions,
        t
    } = useMatchesPage();

    return (
        <Grid container>
            <Grid item xs={12}>
                <Subheader/>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <MatchesToolbar competitions={competitions} dateFrom={dateFrom} dateTo={dateTo} compId={compId}/>
                    <Grid className="matches" item xs={12}>
                        <Matches matches={matches}/>
                    </Grid>
                    <Grid className="matches-page__button-area" item xs={12}>
                        <button disabled={limit > matches.length} className={classNames("matches-page__button", {
                            "matches-page__disabled-button": limit > matches.length,
                        })} onClick={handleLoadMore}>{t("matchesPage.showMore")}
                        </button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
});

function useMatchesPage() {
    const {t} = useTranslation();
    const {dateFrom, dateTo, compId} = useQueryParams();
    const {data} = useCompetitions();
    const competitions = data ?? [];
    const {data: matchesData} = useAllMatches(dateFrom, dateTo, compId);
    const [limit, setLimit] = useState(10)
    const matches = matchesData?.matches.slice(0, limit) ?? [];

    const handleLoadMore = () => {
        setLimit(limit + 10)
    }


    return {
        compId,
        matches,
        dateTo,
        dateFrom,
        handleLoadMore,
        limit,
        competitions,
        t
    };
}

export default MatchesPage;
