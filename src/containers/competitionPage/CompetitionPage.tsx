import React, {FC, memo, useState} from "react";
import Subheader from "../../components/subheader/Subheader";
import {Button, FormControl, Grid, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import StandingsTable from "../../components/standingsTable/StandingsTable";
import Matches from "../../components/matches/Matches";
import {useParams} from "react-router-dom";
import TopScorersList from "../../components/topScorersList/TopScorersList";
import {useCompetitionMatches} from "../../hooks/useCompetitionMatches";
import {useStandings} from "../../hooks/useStandings";
import {useTranslation} from "react-i18next";

const DEFAULT_COMPETITION_CODE = "PL";
const DEFAULT_CURRENT_MATCHDAY = 1;

const CompetitionPage: FC = memo(function CompetitionPage() {
    const {
        t,
        competitionCode,
        selectedMatchday,
        competitionName,
        competitionMatches,
        matchdays,
        handleMatchDayChange,
        standingsData
    } = useCompetitionPage();
    if (!competitionCode) {
        return null;
    }
    return (
        <Grid container>
            <Grid item xs={12}>
                <Subheader/>
            </Grid>
            <Grid item xs={12}>
                <StandingsTable competitionName={competitionName} standingsData={standingsData}/>
            </Grid>
            <Grid container>
                <Grid item xs={6}>
                    <Typography variant="h5">{t("competitionPage.scorers")}</Typography>
                </Grid>
                <Grid className="home-page__button-area" item
                      xs={6}><Button>{t("competitionPage.viewAll")}</Button></Grid>
                <Grid item xs={12}>
                    <TopScorersList competitionCode={competitionCode}/>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={6}>
                    <Typography variant="h5">{t("competitionPage.matches")}</Typography>
                </Grid>
                <Grid className="home-page__button-area" item xs={6}> <FormControl>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedMatchday}
                        onChange={handleMatchDayChange}
                    >
                        {matchdays.map(t => (
                            <MenuItem value={t}>{t}</MenuItem>
                        ))}
                    </Select>
                </FormControl></Grid>
                <Grid item xs={12}>
                    <Matches matches={competitionMatches}/>
                </Grid>
            </Grid>
        </Grid>
    );
});

function useCompetitionPage() {
    const {t} = useTranslation();
    const {competitionCode} = useParams();
    const {data: standingsData} = useStandings(competitionCode ?? DEFAULT_COMPETITION_CODE)
    const currentMatchday = standingsData?.season.currentMatchday;
    const [selectedMatchday, setSelectedMatchday] = useState(currentMatchday ?? DEFAULT_CURRENT_MATCHDAY);
    const handleMatchDayChange = (event: SelectChangeEvent<number>) => {
        setSelectedMatchday(event.target.value as number)
    }

    const matchdays = Array.from({length: 38}, (_, index) => index + 1);
    const {data} = useCompetitionMatches(competitionCode ?? DEFAULT_COMPETITION_CODE, selectedMatchday);
    const competitionMatches = data?.matches ?? [];
    const competitionName = data?.competition.name ?? "";
    return {
        t,
        competitionCode,
        handleMatchDayChange,
        competitionName,
        competitionMatches,
        standingsData,
        matchdays,
        selectedMatchday
    };

}

export default CompetitionPage;
