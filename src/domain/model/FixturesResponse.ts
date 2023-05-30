import {Competition} from "./Competition";

type Area = {
    id: Number,
    name: string,
    code: string,
    flat: string
}

type Season = {
    id: number,
    currentMatchday: number
}

type Team = {
    id: number,
    name: string,
    tla: string,
    crest: string
}

type MatchTime = {
    home: number,
    away: number
}

type Score = {
    winner: string,
    duration: string,
    fullTime: MatchTime,
    halfTime: MatchTime
}

type Referee = {
    id: number,
    name: string,
    type: string,
    nationality: string
}

export type Match = {
    id: number,
    area: Area,
    competition: Competition,
    season: Season,
    matchday: number,
    stage: string,
    homeTeam: Team,
    awayTeam: Team,
    score: Score,
    utcDate: string,
    referees: Referee[]
}

export type FixturesResponse = {
    id: number
    competition: Competition,
    matches: Match[],
}