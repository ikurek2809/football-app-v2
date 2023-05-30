import React, {FC, memo} from "react";
import {Link} from "react-router-dom";
import {Button, Typography} from "@mui/material";

type Props = {
    link: string;
    linkText: string;
}

const NavigationItem: FC<Props> = memo(function NavigationItem(props) {
    const {link, linkText} = useNavigationItem(props)
    return (
        <Typography variant="h6" className="navigation__text">
            <Link className="navigation__link" to={link}>
                <Button>{linkText}</Button>
            </Link>
        </Typography>
    );
});

function useNavigationItem(props: Props) {
    const {link, linkText} = props;
    return {link, linkText};
}

export default NavigationItem;