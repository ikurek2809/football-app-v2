import {Stack} from "@mui/material";
import {FC, memo} from "react";
import {Link, useNavigate} from "react-router-dom";
import SportsSoccerOutlinedIcon from '@mui/icons-material/SportsSoccerOutlined';
import {paths} from "../../utils/paths";
import {useTranslation} from "react-i18next";

export const Footer: FC = memo(function Footer() {
    const {navigate, t} = useFooter();

    return (
        <footer className="footer">
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                className="footer__content"
            >
                <div className="footer__logo" onClick={() => navigate(paths.homePage())}>
                    <SportsSoccerOutlinedIcon/>
                </div>
                <Stack spacing={4} alignItems="flex-start" className="footer__link-area">
                    <Link className="footer__link" to={paths.homePage()}>
                        {t("footer.privacy")}
                    </Link>
                    <Link className="footer__link" to={paths.homePage()}>
                        {t("footer.termsAndConditions")}
                    </Link>
                    <Link className="footer__link" to={paths.homePage()}>
                        {t("footer.contact")}
                    </Link>
                </Stack>
                <Stack
                    spacing={4}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    className="footer__link-area"
                >
                    <Link className="footer__link" to={paths.homePage()}>
                        {t("footer.aboutUs")}
                    </Link>
                    <Link className="footer__link" to={paths.homePage()}>
                        {t("footer.faq")}
                    </Link>
                </Stack>
            </Stack>
        </footer>
    );
});

function useFooter() {
    const {t} = useTranslation();
    const navigate = useNavigate();

    return {navigate, t};
}
