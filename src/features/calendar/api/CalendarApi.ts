import {http} from "../../../../http.ts";
import {IEventModel, IRaceCheckPointModel, IRaceModel, IResultModel} from "../types.ts";

const CalendarApi = {
    getAllEvents: async function (season?: number) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        let url = "events/all?";

        if(season)
            url += "season=" + season;
        const response = await http.get<IEventModel[]>(url);
        return response;
    },
    getAllSeasons: async function () {
        // eslint-disable-next-line react-hooks/rules-of-hooks

        const response = await http.get<number[]>("seasons");
        return response;
    },
    getRace: async function (raceId: number) {
        // eslint-disable-next-line react-hooks/rules-of-hooks

        const response = await http.get<IRaceModel>("Races/"+raceId);
        return response;
    },
}

export default CalendarApi;