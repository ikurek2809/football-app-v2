import React, {FC, memo} from "react";
import Subheader from "../../components/subheader/Subheader";
import {Button, Grid, Typography} from "@mui/material";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Matches from "../../components/matches/Matches";
import {useNavigate, useParams} from "react-router-dom";
import {useTeam} from "../../hooks/useTeam";
import PlayersAccordion from "../../components/playersAccordion/PlayersAccordion";
import {useMatches} from "../../hooks/useMatches";
import MatchesToolbar from "../../components/matchesToolbar/MatchesToolbar";
import {useTranslation} from "react-i18next";
import {useQueryParams} from "../../hooks/useQueryParams";
import {paths} from "../../utils/paths";
import Card from "../../components/card/Card";
import TeamCardContent from "../../components/teamCardContent/TeamCardContent";


type Props = Record<string, never>;

const TeamPage: FC<Props> = memo(function TeamPage() {
    const {
        t,
        navigate,
        teamData,
        matchesData,
        dateFrom,
        dateTo,
        compId,
        handlePlayerClick
    } = useTeamPage();

    return (
        <Grid container>
            <Grid item xs={12}>
                <Subheader/>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5">
                    {teamData?.name}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Card onClick={() => navigate(paths.teamPage(teamData?.id))} image={teamData?.crest ?? ""}
                      title={teamData?.name ?? ""} content={<TeamCardContent team={teamData}/>}/>
            </Grid>
            <Grid container>
                <Grid item xs={6}>
                    <Typography variant="h5">Players</Typography>
                </Grid>
                <Grid className="home-page__button-area" item xs={6}><Button>{t("teamPage.viewAll")}</Button></Grid>
                <Grid item xs={12}>
                    <PlayersAccordion onPlayerClick={handlePlayerClick} defaultExpanded
                                      title={t("teamPage.goalkeepersTitle")}
                                      players={teamData ? teamData.squad.filter(player => player.position === "Goalkeeper") : []}/>
                    <PlayersAccordion onPlayerClick={handlePlayerClick} title={t("teamPage.defendersTitle")}
                                      players={teamData ? teamData.squad.filter(player => player.position === "Defence") : []}/>
                    <PlayersAccordion onPlayerClick={handlePlayerClick} title={t("teamPage.midfieldersTitle")}
                                      players={teamData ? teamData.squad.filter(player => player.position === "Midfield") : []}/>
                    <PlayersAccordion onPlayerClick={handlePlayerClick} title={t("teamPage.attackersTitle")}
                                      players={teamData ? teamData.squad.filter(player => player.position === "Offence") : []}/>
                </Grid>
            </Grid>
            <Grid className="matches" item xs={12}>
                <MatchesToolbar competitions={teamData?.runningCompetitions ?? []} dateFrom={dateFrom} dateTo={dateTo}
                                compId={compId}/>
                <Grid item xs={12}>
                    <Matches matches={matchesData?.matches}/>
                </Grid>
            </Grid>
        </Grid>
    );
});

function useTeamPage() {
    const navigate = useNavigate();
    const {teamId} = useParams();
    const {t} = useTranslation();
    const {dateFrom, dateTo, compId} = useQueryParams();
    const {data: teamData} = useTeam(Number(teamId));

    const {data: matchesData} = useMatches(Number(teamId), dateFrom, dateTo, compId);
    const handlePlayerClick = (playerId: number) => {
        navigate(paths.playerPage(playerId))
    }
    return {
        t,
        navigate,
        teamData,
        matchesData,
        dateFrom,
        dateTo,
        compId,
        handlePlayerClick
    };
}

export default TeamPage;
