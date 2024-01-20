import {
    Card,
    CardBody,
    CardHeader, Chip, Image,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {IResultModel} from "./types.ts";
import RaceApi from "./api/RaceApi.ts";
import {useParams} from "react-router-dom";
import {format} from "date-fns";
import * as signalR from "@microsoft/signalr";

export const RaceResult = () => {
    const [results, setResults] = useState<IResultModel[]>([]);
    let { id } = useParams();

    const hubConnection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5058/resultsHub", { withCredentials: true })
        .configureLogging(signalR.LogLevel.Information)
        .build();

    // Starts the SignalR connection
    hubConnection.start();

    const convertTime = (time:number): string => {
        const seconds = Math.floor(time / 1000);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        let result = '';

        if (hours > 0) {
            result += `${hours}:`;
        }

        if (minutes < 10 && hours > 0) {
            result += `0${minutes}:`;
        } else if(minutes > 0){
            result += `${minutes}:`;
        }

        if (remainingSeconds < 10 && (hours > 0 || minutes > 0) ) {
            result += `0${remainingSeconds}`;
        } else {
            result += `${remainingSeconds}`;
        }

        return result;
    }

    function convertDateTimeToCustomFormat(dateTime: Date): string {
        const formattedDateTime = format(dateTime, 'dd MMM yyyy HH:mm');
        return formattedDateTime.toUpperCase();
    }

    useEffect(() => {
        if(id)
            RaceApi.getAllSubjects(parseInt(id), 3).then(res => {
                setResults(res.data);
            })

        hubConnection.on("receivemessage", message => {
            console.log(message);
        });
        hubConnection.on("receivenewresult", message => {
            setResults(message);
        });
    }, []);

    return (
        <Card  className="mt-4">
            {
                results.length > 0 && (
                    <>
                        <CardHeader className="p-0 m-0 h-[200px] overflow-hidden rounded-none relative ">
                            <div className="flex flex-col absolute p-4 gap-1 text-white">
                                <h3 className="font-normal uppercase">{results[0].race.track.trackName}</h3>
                                <h1 className="font-bold text-4xl">{results[0].race.eventName}</h1>
                                <h3 className="font-medium">{convertDateTimeToCustomFormat(results[0].race.eventDate)}</h3>


                            </div>
                            <div className="absolute w-full h-full backdrop-blur-3xl -z-10" style={{
                                backgroundImage: "url(https://preview.redd.it/minecraft-biathlon-v0-p7c5d1xnjxxb1.png?width=1920&format=png&auto=webp&s=d7e6fd8c6fd796d0a58e261a88b48bb1ddf468dc)",
                                backgroundPosition: 'center'
                            }}>
                                <div className="w-full h-full flex  justify-center items-center backdrop-blur"/>


                            </div>
                        </CardHeader>
                        <CardBody className="p-4">
                            <h1 className="font-medium text-2xl">Result</h1>
                            <Table

                                className="mt-4 p-0 rounded-2xl"
                                aria-label="Example table with custom cells, pagination and sorting"
                                isHeaderSticky={true}
                                bottomContentPlacement="outside"
                                classNames={{
                                    wrapper: "md:max-h-[1000px] bg-transparent p-0 border-0 shadow-none",
                                }}




                            >
                                <TableHeader>
                                    <TableColumn>#</TableColumn>
                                    <TableColumn>NAME</TableColumn>
                                    <TableColumn align="end" className="items-end">RESULT</TableColumn>
                                </TableHeader>
                                <TableBody items={results}>
                                    {
                                        results?.map((result, index:number) => {
                                            return (
                                                <TableRow key={index+1} className="hover:bg-content2 cursor-pointer">
                                                    <TableCell>
                                                        <Chip className="h-8 w-8" color={"success"}>
                                                            {index+1}
                                                        </Chip>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex  gap-2">

                                                            <div className="flex gap-1 items-center">
                                                                <Image className="rounded" height={40} width={28}
                                                                       src={"https://assets.biathlonworld.com/image/upload/ar_16:9,c_fill,f_auto,h_36,q_auto,w_64/static/flag-new/" + result.player.country.code}/>
                                                                {/*<span className="font-normal">{result.player.country.name}</span>*/}
                                                            </div>
                                                            <span className="font-bold text-[18px]">
                                                    {result.player.userName}
                                                </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-col items-end">
                                                <span className="font-bold text-[16px]">
                                                    {result.resultValue ? convertTime(result.resultValue) : "DNF"}
                                                </span>
                                                            {
                                                                index+1 != 1 && (
                                                                    <span className="font-light text-[16px]">
                                                            +{result.resultValue && results[0].resultValue ? convertTime(result.resultValue - results[0].resultValue) : "DNF"}
                                                        </span>
                                                                )
                                                            }

                                                        </div>
                                                    </TableCell>
                                                </TableRow>

                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </CardBody>
                    </>
                )
            }
        </Card>
    );
};
