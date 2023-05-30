import React, {FC, memo} from "react";
import NavigationItem from "./NavigationItem";
import {AppBar, Toolbar} from "@mui/material";
import {paths} from "../../utils/paths";
import {useTranslation} from "react-i18next";

type Props = Record<string, never>;

const Navigation: FC<Props> = memo(function Navigation() {
    const {t} = useTranslation();
    return (
        <AppBar position="static">
            <Toolbar className="navigation">
                <div className="navigation__links">
                    <NavigationItem link={paths.homePage()} linkText={t("navigation.home")}/>
                    <NavigationItem link={paths.teamsPage()} linkText={t("navigation.teams")}/>
                    <NavigationItem link={paths.matchesPage()} linkText={t("navigation.matches")}/>
                </div>
                <div className="navigation__links">
                    <NavigationItem link={paths.loginPage()} linkText={t("navigation.login")}/>
                    <NavigationItem link={paths.registrationPage()} linkText={t("navigation.register")}/>
                </div>
            </Toolbar>
        </AppBar>
    );
});
export default Navigation;