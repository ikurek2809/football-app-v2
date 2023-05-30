import React, {FC, memo} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Grid, Typography} from "@mui/material";
import {Player} from "../../domain/model/TeamResponse";
import Card from "../card/Card";
import PlayerCardContent from "../playerCardContent/PlayerCardContent";
import placeholderImage from "../../assets/images/placeholderImage.svg"

type Props = {
    title: string,
    players: Player[],
    defaultExpanded?: boolean,
    onPlayerClick: (playerId: number) => void
}


const PlayersAccordion: FC<Props> = memo(function PlayersAccordion(props) {
    const {title, players, defaultExpanded, onPlayerClick} = usePlayersAccordion(props)
    return (
        <Grid item xs={12}>
            <Accordion defaultExpanded={defaultExpanded}>
                <AccordionSummary>
                    <Typography>{title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={3}>
                        {players.map(player => (
                            <Grid key={player.id} item sm={6} xs={12} md={6} lg={3}>
                                <Card onClick={() => onPlayerClick(player.id)} image={placeholderImage}
                                      title={player.name}
                                      content={<PlayerCardContent player={player}/>}/>
                            </Grid>
                        ))}
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Grid>
    );
});

function usePlayersAccordion(props: Props) {
    const {title, players, defaultExpanded, onPlayerClick} = props;

    return {title, players, defaultExpanded, onPlayerClick};
}

export default PlayersAccordion;