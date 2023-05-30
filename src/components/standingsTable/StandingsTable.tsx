import {FC, memo, useState} from "react";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {StandingsResponse, StandingsType} from "../../domain/model/StandingsResponse";
import {useTranslation} from "react-i18next";
import LastFive from "../lastFive/LastFive";

type Props = {
    standingsData?: StandingsResponse,
    competitionName: string
}

const StandingsTable: FC<Props> = memo(function StandingsTable(props) {
    const {
        standings,
        handleStandingsTypeChange,
        groups,
        t,
        types,
        noGroups,
        handleGroupChange, competitionName
    } = useStandingsTable(props);

    return (
        <div>
            <h1>{competitionName}</h1>
            {types.length > 1 && types.map(t => (
                <Button onClick={() => handleStandingsTypeChange(t)}>{t}</Button>
            ))}
            <br/>
            {!noGroups && groups?.map(g => (
                <Button onClick={() => handleGroupChange(g)}>{t(`standingsTable.groups.${g}`)}</Button>
            ))}
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{t("standingsTable.teamName")}</TableCell>
                            <TableCell align="right">{t("standingsTable.played")}</TableCell>
                            <TableCell align="right">{t("standingsTable.lastFiveGames")}</TableCell>
                            <TableCell align="right">{t("standingsTable.w")}</TableCell>
                            <TableCell align="right">{t("standingsTable.d")}</TableCell>
                            <TableCell align="right">{t("standingsTable.l")}</TableCell>
                            <TableCell align="right">{t("standingsTable.gf")}</TableCell>
                            <TableCell align="right">{t("standingsTable.ga")}</TableCell>
                            <TableCell align="right">{t("standingsTable.pts")}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {standings?.table.map(row => (
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    {row.team.name}
                                </TableCell>
                                <TableCell align="right">{row.playedGames}</TableCell>
                                <TableCell align="right"><LastFive lastFive={row.form}/></TableCell>
                                <TableCell align="right">{row.won}</TableCell>
                                <TableCell align="right">{row.draw}</TableCell>
                                <TableCell align="right">{row.lost}</TableCell>
                                <TableCell align="right">{row.goalsFor}</TableCell>
                                <TableCell align="right">{row.goalsAgainst}</TableCell>
                                <TableCell align="right">{row.points}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
});

function useStandingsTable(props: Props) {
    const {standingsData, competitionName} = props;
    const {t} = useTranslation();

    const [standingsType, setStandingsType] = useState(StandingsType.Total);
    const [group, setGroup] = useState("GROUP_A");

    const groups = standingsData?.standings.map(s => s.group);
    const typesWithDuplicates = standingsData?.standings.map(s => s.type);
    // @ts-ignore
    const types = [...new Set(typesWithDuplicates)];
    const noGroups = groups?.every((item) => item === null)
    const standings =
        noGroups
            ? standingsData?.standings.find(s => s.type === standingsType)
            : standingsData?.standings.find(s => s.type === standingsType && s.group === group)
    const handleStandingsTypeChange = (standingsType: StandingsType) => {
        setStandingsType(standingsType)
    }

    const handleGroupChange = (groupType: string) => {
        setGroup(groupType)
    }

    return {standings, competitionName, handleStandingsTypeChange, groups, t, noGroups, handleGroupChange, types};
}

export default StandingsTable;
