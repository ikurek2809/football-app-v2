import React, {FC, memo} from "react";
import Subheader from "../../components/subheader/Subheader";
import {Grid, TablePagination} from "@mui/material";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {useNavigate, useParams} from "react-router-dom";
import {usePlayer} from "../../hooks/usePlayer";
import {usePlayerMatches} from "../../hooks/usePlayerMatches";
import {paths} from "../../utils/paths";
import MatchesToolbar from "../../components/matchesToolbar/MatchesToolbar";
import Matches from "../../components/matches/Matches";
import {useQueryParams} from "../../hooks/useQueryParams";
import {useList} from "../../hooks/useList";
import Card from "../../components/card/Card";
import PlayerCardContent from "../../components/playerCardContent/PlayerCardContent";
import placeholderImage from "../../assets/images/placeholderImage.svg"


type Props = Record<string, never>;

const PlayerPage: FC<Props> = memo(function PlayerPage() {
    const {
        navigate,
        player,
        playerMatches,
        dateFrom,
        dateTo,
        compId,
        page,
        perPage,
        onPerPageChange,
        onPageChange
    } = usePlayerPage();

    return (
        <Grid container>
            <Grid item xs={12}>
                <Subheader/>
            </Grid>
            <Grid item xs={12}>
                <Card onClick={() => navigate(paths.teamPage(player?.id))} image={placeholderImage}
                      title={player?.name ?? ""} content={<PlayerCardContent player={player}/>}/>
            </Grid>
            <Grid className="matches" item xs={12}>
                <Grid container>
                    <Grid item xs={6}>
                        <MatchesToolbar competitions={player?.currentTeam.runningCompetitions ?? []} dateFrom={dateFrom}
                                        dateTo={dateTo}
                                        compId={compId}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TablePagination
                            labelRowsPerPage="Matches per page"
                            rowsPerPageOptions={[4, 8, 12, 16]}
                            component="div"
                            count={1000}
                            page={page}
                            onPageChange={onPageChange}
                            rowsPerPage={perPage}
                            onRowsPerPageChange={onPerPageChange}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Matches matches={playerMatches?.matches}/>
                </Grid>
            </Grid>
        </Grid>
    );
});

function usePlayerPage() {
    const navigate = useNavigate();
    const {playerId: playerIdParam} = useParams();
    if (!playerIdParam) {
        navigate(paths.homePage())
    }
    const playerId = Number(playerIdParam);
    const {dateFrom, dateTo, compId} = useQueryParams();
    const {page, perPage, onPerPageChange, onPageChange} = useList(14);
    const {data: player} = usePlayer(playerId);
    const {data: playerMatches} = usePlayerMatches(playerId, perPage, page, compId, dateFrom, dateTo);
    return {navigate, player, playerMatches, dateFrom, dateTo, compId, page, perPage, onPerPageChange, onPageChange};
}

export default PlayerPage;
