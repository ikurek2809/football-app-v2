import React, {FC, memo, ReactNode} from "react";
import {Grid, Typography} from "@mui/material";

type Props = {
    image: string,
    title: string,
    content: ReactNode,
    onClick?: () => void
}

const Card: FC<Props> = memo(function Card(props) {
    const {image, title, content, onClick} = useCard(props)
    return (
        <Grid onClick={onClick} className="card" container>
            <Grid className="card__image-area" item sm={12}>
                <img className="card__image" src={image} alt=""/>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">
                    <strong>{title}</strong>
                </Typography>
            </Grid>
            <Grid className="card__content" item xs={12}>
                {content}
            </Grid>
        </Grid>
    );
});

function useCard(props: Props) {
    const {image, title, content, onClick} = props;
    return {image, title, content, onClick};
}

export default Card;