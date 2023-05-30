import React from 'react';
import "./styles/index.scss";
import {I18nextProvider} from "react-i18next";
import {QueryClient, QueryClientProvider} from "react-query";
import i18n from "./i18n";
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import {Container} from "@mui/material";
import Navigation from "./components/navigation/Navigation";
import HomePage from "./containers/homePage/HomePage";
import MatchesPage from "./containers/matchesPage/MatchesPage";
import {Footer} from "./components/footer/Footer";
import TeamPage from "./containers/teamPage/TeamPage";
import TeamsPage from "./containers/teamsPage/TeamsPage";
import CompetitionPage from "./containers/competitionPage/CompetitionPage";
import RegistrationPage from "./containers/registrationPage/RegistrationPage";
import {paths} from "./utils/paths";
import PlayerPage from "./containers/playerPage/PlayerPage";
import LoginPage from "./containers/loginPage/LoginPage";


function App() {

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false, // default: true
            },
        },
    })

    return (
        <QueryClientProvider client={queryClient}>
            <I18nextProvider i18n={i18n}>
                <Router>
                    <Container maxWidth="lg" style={{minHeight: "100vh", display: "flex", flexDirection: "column"}}>
                        <Navigation/>
                        <Routes>
                            <Route path={paths.homePage()} element={<HomePage/>}></Route>
                            <Route path={paths.matchesPage()} element={<MatchesPage/>}></Route>
                            <Route path={paths.teamsPage()} element={<TeamsPage/>}></Route>
                            <Route path={paths.teamPage()} element={<TeamPage/>}></Route>
                            <Route path={paths.competitionPage()} element={<CompetitionPage/>}></Route>
                            <Route path={paths.playerPage()} element={<PlayerPage/>}></Route>
                            <Route path={paths.registrationPage()} element={<RegistrationPage/>}></Route>
                            <Route path={paths.loginPage()} element={<LoginPage/>}></Route>
                        </Routes>
                        <Footer/>
                    </Container>
                </Router>
            </I18nextProvider>
        </QueryClientProvider>
    );
}

export default App;
