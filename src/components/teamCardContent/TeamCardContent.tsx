import React, {FC, memo} from "react";
import {Typography} from "@mui/material";
import {TeamResponse} from "../../domain/model/TeamResponse";
import {useTranslation} from "react-i18next";

type Props = {
    team?: TeamResponse
}

const TeamCardContent: FC<Props> = memo(function TeamCardContent(props) {
    const {team, t} = useTeamCardContent(props)
    return (
        <>
            <Typography><strong>{t("card.teamCardContent.venue")}:</strong> {team?.venue}</Typography>
            <Typography><strong>{t("card.teamCardContent.address")}:</strong> {team?.address}</Typography>
            <Typography><strong>{t("card.teamCardContent.yearFounded")}:</strong> {team?.founded}</Typography>
            <Typography><strong>{t("card.teamCardContent.website")}:</strong>{team?.website}</Typography>
        </>
    );
});

function useTeamCardContent(props: Props) {
    const {team} = props;
    const {t} = useTranslation();
    return {team, t};
}

export default TeamCardContent;