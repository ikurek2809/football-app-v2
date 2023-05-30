import React, {FC, memo} from "react";
import {Typography} from "@mui/material";
import {Player} from "../../domain/model/TeamResponse";
import {useTranslation} from "react-i18next";

type Props = {
    player?: Player
}

const PlayerCardContent: FC<Props> = memo(function PlayerCardContent(props) {
    const {player, t} = usePlayerCardContent(props)
    return (
        <>
            <Typography>{t("card.playerCardContent.position")}: {player?.position}</Typography>
            <Typography>{t("card.playerCardContent.dateOfBirth")}: {player?.dateOfBirth}</Typography>
            <Typography>{t("card.playerCardContent.nationality")}: {player?.nationality}</Typography>
        </>
    );
});

function usePlayerCardContent(props: Props) {
    const {t} = useTranslation();
    const {player} = props;
    return {player, t};
}

export default PlayerCardContent;