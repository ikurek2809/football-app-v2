import React, {FC, memo} from "react";
import {FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {useList} from "../../hooks/useList";
import {Competition} from "../../domain/model/Competition";
import {dateFormat} from "../../utils/datetime";
import {useTranslation} from "react-i18next";

const DEFAULT_PER_PAGE_NUMBER = 2;

type Props = {
    dateFrom: string,
    dateTo: string,
    compId?: string,
    competitions: Competition[],
    hideDate?: boolean
};


const MatchesToolbar: FC<Props> = memo(function MatchesToolbar(props) {
    const {
        t,
        handleDateFromChange,
        handleDateToChange,
        handleCompetitionChange,
        competitions,
        compId,
        hideDate
    } = useMatchesToolbar(props)
    return (
        <Grid className="matches-page__toolbar-area" item xs={12}>
            <Grid container>
                <Grid item xs={hideDate ? 6 : 3}>
                    <Typography className="toolbar-item" variant="h5">
                        {t("matchesToolbar.title")}
                    </Typography>
                </Grid>
                <Grid item xs={hideDate ? 6 : 3}>
                    <FormControl className="toolbar-item">
                        <InputLabel>{t("matchesToolbar.selectCompetition")}</InputLabel>
                        <Select
                            value={compId}
                            onChange={handleCompetitionChange}
                        >
                            {competitions.map(competition => (
                                <MenuItem value={competition.code}>{competition.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                {!hideDate && <>
                    <Grid item xs={3}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker className="toolbar-item" format={dateFormat.default}
                                        label={t("matchesToolbar.startDate")}
                                        onChange={handleDateFromChange}/>
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={3}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker className="toolbar-item" format={dateFormat.default}
                                        label={t("matchesToolbar.endDate")}
                                        onChange={handleDateToChange}/>
                        </LocalizationProvider>
                    </Grid></>}
            </Grid>
        </Grid>

    );
});

function useMatchesToolbar(props: Props) {
    const {t} = useTranslation();
    const {compId, dateFrom, dateTo, competitions, hideDate} = props;
    const {pushFilterParams} = useList(DEFAULT_PER_PAGE_NUMBER)

    const handleDateFromChange = (value: Date | null) => {
        pushFilterParams({dateFrom: dayjs(value).format(dateFormat.default)})
    }

    const handleDateToChange = (value: Date | null) => {
        pushFilterParams({
            dateTo: dayjs(value).format(dateFormat.default),
        })
    }

    const handleCompetitionChange = (e: SelectChangeEvent) => {
        pushFilterParams({competition: e.target.value});
    };

    return {t, handleDateFromChange, handleDateToChange, handleCompetitionChange, competitions, compId, hideDate};
}

export default MatchesToolbar;