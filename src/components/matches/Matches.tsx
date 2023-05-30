import React, {FC, memo} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Match} from "../../domain/model/FixturesResponse";
import {dateFormat, formatDateTime} from "../../utils/datetime";
import {paths} from "../../utils/paths";

type Props = {
    matches?: Match[]
};

const Matches: FC<Props> = memo(function Matches(props) {
    const {matches, navigate} = useMatches(props)
    return (
        <TableContainer className="matches" component={Paper}>
            <Table aria-label="simple table">
                {(!matches || matches.length === 0)
                    ? <Typography>No matches to display</Typography>
                    : matches?.map(match => (
                        <TableBody>
                            <TableRow key={match.id}>
                                <TableCell onClick={() => navigate(paths.teamPage(match.homeTeam.id))}
                                           align="left">{match.homeTeam.name}</TableCell>
                                <TableCell
                                    align="right">{match.score.fullTime.home} : {match.score.fullTime.away}</TableCell>
                                <TableCell onClick={() => navigate(paths.teamPage(match.awayTeam.id))}
                                           align="right">{match.awayTeam.name}</TableCell>
                                <TableCell
                                    align="right">{formatDateTime(match.utcDate, dateFormat.defaultWithTime)}</TableCell>
                            </TableRow>
                        </TableBody>
                    ))}
            </Table>
        </TableContainer>
    );
});

function useMatches(props: Props) {
    const navigate = useNavigate();
    const {matches} = props;
    return {matches, navigate};
}

export default Matches;