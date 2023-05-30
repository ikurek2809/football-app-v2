export const paths = {
    homePage: () => "/",
    matchesPage: () => "/matches",
    teamPage: (teamId: string | number = ":teamId") => `/team/${teamId}`,
    teamsPage: () => "teams",
    competitionPage: (competitionId: string = ":competitionCode") => `/competition/${competitionId}`,
    playerPage: (playerId: string | number = ":playerId") => `/player/${playerId}`,
    registrationPage: () => "/registration",
    loginPage: () => "/login",
}