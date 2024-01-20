import {http} from "../../../../http.ts";
import {IResultModel} from "../types.ts";

const RaceApi = {
    getAllSubjects: async function (raceId: number, checkpointTypeId: number) {
        // eslint-disable-next-line react-hooks/rules-of-hooks

        const response = await http.get<IResultModel[]>("api/results/all?raceId="+raceId+"&checkpointTypeId="+checkpointTypeId);
        return response;
    },

}

export default RaceApi;