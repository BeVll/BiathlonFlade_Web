export interface IResultModel {
    id: number;
    raceId: number;
    playerId: number;
    checkpointId: number;
    resultValue: number | null;
    isDNF: boolean;
    startNumber: number;
    isTeamResult: boolean;
    isFinish: boolean;
    lap: number;
    teamId?: number | null;
    stageNumber?: number | null;

    race: IRaceModel;
    player: IUserModel;
    raceCheckpoint: IRaceCheckPointModel;
}

export interface IRaceModel {
    id: number;
    eventName: string;
    eventTypeId: number;
    teamEvent: boolean;
    trackId: number;
    eventDate: Date;
    track: ITrackModel
}

export interface IUserModel {
    id: number;
    image: number,
    userName: string
    countryId: string
    country: ICountryModel
}

export interface ICountryModel {
    id: number;
    name: string;
    character: string;
    code: string;
}

export interface ITrackModel {
    id: number;
    trackName: string;
}

export interface ICheckPointModel {
    id: number;
    name: string;
    trackId: number;
    checkPointTypeId: number;
    x1: number;
    y1: number;
    z1: number;
    x2: number;
    y2: number;
    z2: number;
}

export interface IRaceCheckPointModel {
    id: number;
    name: string;
    race: IRaceModel,
    checkPoint: ICheckPointModel,
    lap: number
}