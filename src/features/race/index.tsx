import {
    Card,
    CardBody,
    CardHeader, Chip, Image, Tab,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow, Tabs
} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {IRaceModel, IResultModel} from "./types.ts";
import RaceApi from "./api/RaceApi.ts";
import {useParams} from "react-router-dom";
import {format} from "date-fns";
import {FinalResult} from "./components/FinalResult.tsx";

export const RaceResult = () => {
    const [race, setRace] = useState<IRaceModel>();
    let { id } = useParams();

    function convertDateTimeToCustomFormat(dateTime: Date): string {
        const formattedDateTime = format(dateTime, 'dd MMM yyyy HH:mm');
        return formattedDateTime.toUpperCase();
    }

    useEffect(() => {
        if(id)
            RaceApi.getRace(parseInt(id)).then(res => {
                setRace(res.data);
            })

    }, []);

    return (
        <Card  className="mt-4">
            {
                race && (
                    <>
                        <CardHeader className="p-0 m-0 h-[200px] overflow-hidden rounded-none relative ">
                            <div className="flex flex-col absolute p-4 gap-1 text-white">
                                <h3 className="font-normal uppercase">{race.track.trackName}</h3>
                                <h1 className="font-bold text-4xl">{race.eventName}</h1>
                                <h3 className="font-medium">{convertDateTimeToCustomFormat(race.eventDate)}</h3>


                            </div>
                            <div className="absolute w-full h-full backdrop-blur-3xl -z-10" style={{
                                backgroundImage: "url(https://preview.redd.it/minecraft-biathlon-v0-p7c5d1xnjxxb1.png?width=1920&format=png&auto=webp&s=d7e6fd8c6fd796d0a58e261a88b48bb1ddf468dc)",
                                backgroundPosition: 'center'
                            }}>
                                <div className="w-full h-full flex  justify-center items-center backdrop-blur"/>


                            </div>
                        </CardHeader>
                        <CardBody className="p-4">
                            <div className="items-center align-middle flex flex-col w-full">
                                {/*<h1 className="font-medium text-2xl">Result</h1>*/}
                                <Tabs aria-label="Options" size={"lg"} selectedKey={"results"} color="primary" variant="underlined">
                                    <Tab key="startList" isDisabled={race.eventTypeId == 1} className="w-full" title="Start List">

                                    </Tab>
                                    <Tab key="results"  className="w-full " title="Results">
                                        <FinalResult/>
                                    </Tab>
                                    <Tab key="skiTime" className="w-full" title="Ski Time">

                                    </Tab>
                                </Tabs>
                            </div>

                        </CardBody>
                    </>
                )
            }
        </Card>
    );
};
