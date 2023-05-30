import React, {FC, memo} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Grid, Typography} from "@mui/material";
import {useTopScorers} from "../../hooks/useTopScorers";
import {useTranslation} from "react-i18next";

type Props = {
    competitionCode: string
}

const TopScorersList: FC<Props> = memo(function TopScorersList(props) {
    const {topScorers, t} = useTopScorersList(props)
    return (
        <Grid item xs={12}>
            {topScorers.map(s => (
                <Accordion>
                    <AccordionSummary>
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography>{s.player.name}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>{t("topScorersList.goals")}: {s.goals}</Typography>
                            </Grid>
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography>{t("topScorersList.position")}: {s.player.position}</Typography>
                                <Typography>{t("topScorersList.penalties")}: {s.penalties}</Typography>
                                <Typography>{t("topScorersList.assists")}: {s.assists}</Typography>

                            </Grid>
                            <Grid item xs={6}>
                                <Typography>{t("topScorersList.team")}: {s.team.name}</Typography>
                                <Typography>{t("topScorersList.nationality")}: {s.player.nationality}</Typography>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Grid>
    );
});

function useTopScorersList(props: Props) {
    const {competitionCode} = props;
    const {t} = useTranslation();
    const {data} = useTopScorers(competitionCode);
    const topScorers = data?.scorers ?? []
    return {topScorers, t};
}

export default TopScorersList;