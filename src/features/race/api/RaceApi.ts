import {http} from "../../../../http.ts";
import {IEventModel, IRaceCheckPointModel, IRaceModel, IResultModel} from "../../../lib/types.ts";

const RaceApi = {
    getAllResults: async function (raceId: number, raceCheckpointId: number) {
        // eslint-disable-next-line react-hooks/rules-of-hooks

        const response = await http.get<IResultModel[]>("results/all?raceId="+raceId+"&checkpointId="+raceCheckpointId);
        return response;
    },
    getAllCheckPoints: async function (raceId: number) {
        // eslint-disable-next-line react-hooks/rules-of-hooks

        const response = await http.get<IRaceCheckPointModel[]>("results/allCheckPoints/"+raceId);
        return response;
    },
    getRace: async function (raceId: number) {
        // eslint-disable-next-line react-hooks/rules-of-hooks

        const response = await http.get<IRaceModel>("Races/"+raceId);
        return response;
    },
}

export default RaceApi;