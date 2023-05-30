import React, {FC, memo} from "react";
import {Grid} from "@mui/material";
import classNames from "classnames";

type Props = {
    lastFive: string
}
export const LastFive: FC<Props> = memo(function LastFive(props) {
    const {lastFiveArray} = useLastFive(props);

    return (
        <Grid justifyContent="flex-end" container>
            {lastFiveArray.map(l => (
                <Grid className={classNames({
                    "last-five__win": l === "W",
                    "last-five__draw": l === "D",
                    "last-five__loss": l === "L",
                })} item xs={2}>{l}</Grid>
            ))}
        </Grid>
    );
});

function useLastFive(props: Props) {
    const {lastFive} = props;
    const lastFiveArray = lastFive.split(",")
    return {lastFiveArray};
}

export default LastFive;