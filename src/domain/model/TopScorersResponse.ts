import {Competition} from "./Competition";

type Player = {
    id: number,
    name: string,
    nationality: string,
    position: string,
    dateOfBirth: string,
}

type Team = {
    id: number,
    name: string
}

type Scorer = {
    player: Player,
    team: Team,
    goals: number,
    assists: number,
    penalties: number

}

export type ScorersResponse = {
    competition: Competition,
    scorers: Scorer[]
}