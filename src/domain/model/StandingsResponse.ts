import {Competition} from "./Competition";

export enum StandingsType {
    Total = "TOTAL",
    Home = "HOME",
    Away = "AWAY"
}

type Standing = {
    type: StandingsType,
    table: TableRow[],
    group: string
}

type Team = {
    id: number,
    name: string,
    crest: string
}

type TableRow = {
    position: number,
    team: Team,
    playedGames: number,
    form: string,
    won: number,
    draw: number,
    lost: number,
    points: number,
    goalsFor: number,
    goalsAgainst: number,
    goalDifference: number
}

type Season = {
    id: number,
    currentMatchday: number
}

export type StandingsResponse = {
    competition: Competition;
    standings: Standing[];
    season: Season;
};
