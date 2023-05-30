import {Competition} from "./Competition";

type Area = {
    id: number,
    name: string,
    code: string,
    flag: string
}

type Contract = {
    start: string,
    until: string
}

type CurrentTeam = {
    id: number,
    area: Area,
    name: string,
    shortName: string,
    crest: string,
    address: string,
    website: string,
    founded: number,
    venue: string,
    runningCompetitions: Competition[],
    contract: Contract
}

export type PlayerResponse = {
    id: number,
    name: string,
    firstName: string,
    lastName: string,
    position: string,
    dateOfBirth: string,
    nationality: string,
    currentTeam: CurrentTeam
}
