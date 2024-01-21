import {
    Card,
    CardBody,
    CardHeader, Chip, Image, Skeleton, Tab,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow, Tabs
} from "@nextui-org/react";
import {Key, useEffect, useState} from "react";
import {IRaceModel, IResultModel} from "../../lib/types.ts";
import RaceApi from "./api/RaceApi.ts";
import {useParams} from "react-router-dom";
import {format} from "date-fns";
import {FinalResult} from "./components/FinalResult.tsx";
import {RiLiveLine} from "react-icons/ri";
import {TbPointFilled} from "react-icons/tb";

export const RaceResult = () => {
    const [race, setRace] = useState<IRaceModel>();
    let { id } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [selectedTab, setselectedTab] = useState<string>("results");
    function convertDateTimeToCustomFormat(dateTime: Date): string {
        const formattedDateTime = format(dateTime, 'dd MMM yyyy HH:mm');
        return formattedDateTime.toUpperCase();
    }

    useEffect(() => {
        if(id)
            RaceApi.getRace(parseInt(id)).then(res => {
                setRace(res.data);
                setLoading(false);
            })

    }, []);

    return (
        <Card  className="mt-4">
            <Skeleton isLoaded={!isLoading} className="rounded-lg min-h-[200px] rounded-none">
                <CardHeader className="p-0 m-0  overflow-hidden rounded-none relative ">
                    {
                        race && (
                            <>
                                <div className="flex flex-col justify-between h-full w-full">
                                    <div></div>

                                        <div
                                            className="flex l p-4 gap-1 text-white backdrop-blur-xl overflow-hidden rounded-2xl m-5 bg-content1 bg-opacity-20">
                                            <div className={"flex justify-between w-full items-center"}>
                                                <div className="flex flex-col gap-0">
                                                    <h3 className="font-light uppercase mb-2">{race.track.trackName}</h3>
                                                    <h1 className="font-bold text-4xl">{race.raceName}</h1>
                                                    <h3 className="font-medium ">{convertDateTimeToCustomFormat(race.raceDate)}</h3>

                                                </div>

                                                <div
                                                    className="flex items-center gap-1 animate-pulse text-xl font-bold text-danger">
                                                    <TbPointFilled className={"mt-[2px]"}/>
                                                    <span
                                                        className={"  "}>Live</span>
                                                </div>
                                            </div>
                                        </div>


                                    <Card
                                        className="shadow-none top-[2px] rounded-none h-auto backdrop-blur-xl overflow-hidden rounded-b-none bg-content1 bg-opacity-70 flex-row flex w-full justify-center rounded-t-2xl ">
                                        <Tabs aria-label="Options" className=" font-medium" size={"lg"}
                                              onSelectionChange={(key: Key) => {
                                                  setselectedTab(key.toString())
                                              }} defaultSelectedKey={"results"} color="primary"
                                              variant="underlined">
                                            <Tab key="startList" isDisabled={race.raceTypeId == 1}
                                                 className="w-full h-full"
                                                 title="Start List">

                                            </Tab>
                                            <Tab key="results" className="w-full " title="Results">

                                            </Tab>
                                            <Tab key="skiTime" className="w-full" title="Ski Time">

                                            </Tab>
                                        </Tabs>
                                    </Card>
                                </div>

                                <div className="absolute w-full h-full backdrop-blur-3xl rounded-none -z-10" style={{
                                    backgroundImage: "url(https://preview.redd.it/minecraft-biathlon-v0-p7c5d1xnjxxb1.png?width=1920&format=png&auto=webp&s=d7e6fd8c6fd796d0a58e261a88b48bb1ddf468dc)",
                                    backgroundPosition: 'center'
                                }}>
                                <div
                                        className="w-full h-full flex rounded-none justify-center items-center backdrop-blur"/>


                                </div>


                            </>
                        )
                    }
                </CardHeader>
            </Skeleton>

            <CardBody className="p-4 flex flex-col items-center gap-4">

                    {/*<h1 className="font-medium text-2xl">Result</h1>*/}
                {
                    isLoading && (
                        <>
                            <Skeleton isLoaded={!isLoading} className="rounded-lg h-[36px] w-[200px]"/>
                            <Skeleton isLoaded={!isLoading} className="rounded-lg h-[40px] w-full"/>
                        </>
                    )
                }

                    <Skeleton isLoaded={!isLoading} className="rounded-lg h-[300px] w-full">
                        {
                            race && (
                                <div className="items-center align-middle flex flex-col w-full h-full">
                                    {
                                        selectedTab == "results" && <FinalResult/>
                                    }
                                </div>
                                    )
                                    }

                                </Skeleton>


                            </CardBody>
                            </Card>
    );
};
