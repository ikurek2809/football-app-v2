import {Competition} from "./Competition";

type Area = {
    id: number,
    name: string,
    code: string,
    flag: string
}

export type Player = {
    id: number,
    name: string,
    firstName: string,
    lastName: string,
    position: string,
    dateOfBirth: string,
    nationality: string
}

type Coach = {
    id: string,
    firstName: string,
    lastName: string,
    name: string,
    dateOfBirth: string,
    nationality: string,
}

export type TeamResponse = {
    id: number,
    area: Area,
    name: string,
    shortName: string,
    crest: string,
    address: string,
    website: string,
    founded: number,
    venue: string,
    runningCompetitions: Competition[];
    coach: Coach,
    squad: Player[]
}