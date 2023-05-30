import React, {FC, memo} from "react";
import Subheader from "../../components/subheader/Subheader";
import {Grid, TablePagination, Typography} from "@mui/material";
import Card from "../../components/card/Card";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {useTeams} from "../../hooks/useTeams";
import {useList} from "../../hooks/useList";
import {useTranslation} from "react-i18next";

const DEFAULT_PER_PAGE_OPTIONS = [4, 8, 12, 16];
const DEFAULT_COUNT = 1000;

type Props = Record<string, never>;

const TeamsPage: FC<Props> = memo(function TeamsPage() {
    const {t, teams, page, perPage, onPerPageChange, onPageChange} = useTeamsPage();

    return (
        <Grid container>
            <Grid item xs={12}>
                <Subheader/>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid className="matches-page__toolbar-area" item xs={12}>
                        <div>
                            <Typography variant="h5">
                                {t("teamsPage.teams")}
                            </Typography>
                        </div>
                        <TablePagination
                            labelRowsPerPage="Teams per page"
                            rowsPerPageOptions={DEFAULT_PER_PAGE_OPTIONS}
                            component="div"
                            count={DEFAULT_COUNT}
                            page={page}
                            onPageChange={onPageChange}
                            rowsPerPage={perPage}
                            onRowsPerPageChange={onPerPageChange}
                        />
                    </Grid>
                    <Grid container spacing={2}>
                        {teams.map(team => (
                            <Grid key={team.id} item sm={6} xs={12} md={6} lg={3}>
                                <Card image={team?.crest} title={team?.name}
                                      content={
                                          <>
                                              <Typography><strong>{t("teamCard.venue")}:</strong> {team?.venue}
                                              </Typography>
                                              <Typography><strong>{t("teamCard.address")}:</strong> {team?.address}
                                              </Typography>
                                              <Typography><strong>{t("teamCard.yearFounded")}:</strong> {team?.founded}
                                              </Typography>
                                              <Typography><strong>{t("teamCard.website")}:</strong> {team?.website}
                                              </Typography>
                                          </>
                                      }/>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
});

function useTeamsPage() {
    const {onPageChange, onPerPageChange, page, perPage} = useList(12);
    const {t} = useTranslation();
    const {data: teamsData} = useTeams(perPage, page + 1);
    const teams = teamsData?.teams ?? [];
    return {t, teams, page, perPage, onPerPageChange, onPageChange};
}

export default TeamsPage;
