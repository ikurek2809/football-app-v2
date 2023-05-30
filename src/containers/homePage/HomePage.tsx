import React, {FC, memo} from "react";
import {Button, Grid, Typography} from "@mui/material";
import Card from "../../components/card/Card";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CompetitionCarousel from "../../components/competitionCarousel/CompetitionCarousel";
import {useCompetitions} from "../../hooks/useCompetitions";
import {useTeams} from "../../hooks/useTeams";
import {useList} from "../../hooks/useList";
import Matches from "../../components/matches/Matches";
import {useNavigate} from "react-router-dom";
import {useAllMatches} from "../../hooks/useAllMatches";
import {paths} from "../../utils/paths";
import TeamCardContent from "../../components/teamCardContent/TeamCardContent";
import dayjs from "dayjs";
import {dateFormat} from "../../utils/datetime";
import {useTranslation} from "react-i18next";

const DEFAULT_PER_PAGE_NUMBER = 4;

const HomePage: FC = memo(function HomePage() {
    const {navigate, competitions, teams, matches, t} = useHomePage();

    return (
        <Grid container>
            <Grid item xs={12}>
                <CompetitionCarousel competitions={competitions}/>
            </Grid>
            <Grid className="home-page__teams-title-area" container>
                <Grid item xs={6}>
                    <Typography variant="h5">{t("homePage.teams")}</Typography>
                </Grid>
                <Grid className="home-page__button-area" item xs={6}>
                    <Button onClick={() => navigate(paths.teamsPage())}>
                        {t("homePage.viewAll")}
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                {teams.map(team => (
                    <Grid key={team.id} item sm={6} xs={12} md={6} lg={3}>
                        <Card onClick={() => navigate(paths.teamPage(team.id))} image={team?.crest}
                              title={team?.name} content={<TeamCardContent team={team}/>}/>
                    </Grid>
                ))}
            </Grid>
            <Grid className="home-page__matches-title-area" container>
                <Grid item xs={6}>
                    <Typography variant="h5">{t("homePage.matches")}</Typography>
                </Grid>
                <Grid className="home-page__button-area" item xs={6}>
                    <Button onClick={() => navigate(paths.matchesPage())}>
                        {t("homePage.viewAll")}
                    </Button>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Matches matches={matches}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
});

function useHomePage() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {data} = useCompetitions();
    const competitions = data ?? [];
    const {page, perPage} = useList(DEFAULT_PER_PAGE_NUMBER);

    const {data: teamsData} = useTeams(perPage, page + 1);
    const teams = teamsData?.teams ?? [];

    const today = new Date();
    const dateFrom = dayjs(today).format(dateFormat.default);
    const dateTo = dayjs(today).add(7, "day").format(dateFormat.default);

    const {data: matchesData} = useAllMatches(dateFrom, dateTo);
    const matches = matchesData?.matches.slice(0, 4) ?? [];

    return {navigate, competitions, teams, matches, t};
}

export default HomePage;
