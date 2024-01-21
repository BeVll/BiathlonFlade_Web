import {
    Chip,
    Image,
    Listbox,
    ListboxItem, Skeleton, Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import {ReactNode, useEffect, useMemo, useState} from "react";
import {IRaceCheckPointModel, IResultModel} from "../../../lib/types.ts";
import {useParams} from "react-router-dom";
import RaceApi from "../api/RaceApi.ts";
import {format} from "date-fns";
import * as signalR from "@microsoft/signalr";
import {CheckPointChange} from "./CheckPointChange.tsx";

export const FinalResult = () => {
    const [results, setResults] = useState<IResultModel[]>([]);
    const [newResults, setNewResults] = useState<IResultModel[]>([]);
    const [currentCheckPoint, setCurrentCheckPoint] = useState<IRaceCheckPointModel>([]);
    const [checkPoints, setCheckPoints] = useState<IRaceCheckPointModel[]>([]);
    let { id } = useParams();

    const [isLoading, setLoading] = useState(true);
    const [isLoadingCheckPoints, setLoadingCheckPoints] = useState(true);
    const loadingState = isLoading && isLoadingCheckPoints ? "loading" : "idle";
    const hubConnection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5058/resultsHub", { withCredentials: true })
        .configureLogging(signalR.LogLevel.Information)
        .build();

    // Starts the SignalR connection


    useEffect(() => {
        if(id) {
            hubConnection.start();
            console.log("fdasfsdfs");
            RaceApi.getAllCheckPoints(parseInt(id)).then(res => {
                setCheckPoints(res.data);
                setCurrentCheckPoint(res.data[res.data.length - 1]);
                resultLoad(res.data[res.data.length - 1]);
                setLoadingCheckPoints(false);

            });

        }


    }, []);


    useEffect(() => {
        if(id){
            hubConnection.on("receivenewresult", message => {
                let res: IResultModel[] = message;
                console.log(res);
                setNewResults(res);

            });
        }

    }, []);

    useEffect(() => {
        if(newResults.length > 0){
            if(newResults[0].raceCheckpoint.id == currentCheckPoint.id){
                setResults(newResults);
                console.log("currentCheckPoint")
            }

            let indexCurrent = checkPoints.indexOf(currentCheckPoint);
            let tmp = checkPoints.find(c => c.id == newResults[0].raceCheckpoint.id);
            if(tmp){
                let indexResult = checkPoints.indexOf(tmp)

                console.log("indexCurrent+1 ", indexCurrent, indexResult)
                if(indexCurrent+1 == indexResult && newResults.length == 1){
                    console.log("indexCurrent+1 ", indexCurrent, indexResult)
                    setCurrentCheckPoint(checkPoints[indexResult]);
                    setResults(newResults);
                }
            }

        }

    }, [newResults]);

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

    const onClickLeftCP = () => {
        let index = checkPoints.indexOf(currentCheckPoint);

        if(index != 0){
            setCurrentCheckPoint(checkPoints[index-1]);
            resultLoad(checkPoints[index-1]);
        }
    }

    const onClickRightCP = () => {
        let index = checkPoints.indexOf(currentCheckPoint);

        if(index != checkPoints.length-1){
            setCurrentCheckPoint(checkPoints[index+1]);
            resultLoad(checkPoints[index+1]);
        }
    }

    function convertDateTimeToCustomFormat(dateTime: Date): string {
        const formattedDateTime = format(dateTime, 'dd MMM yyyy HH:mm');
        return formattedDateTime.toUpperCase();
    }


    function getCp () : IRaceCheckPointModel {
        return currentCheckPoint;
    }




    const resultLoad = (cp: IRaceCheckPointModel) => {
        if(id)
            RaceApi.getAllResults(parseInt(id), cp.id).then(res => {
                setResults(res.data);
                setLoading(false);
            });
    };


    const topContent = useMemo(() => {
        let isFirst = checkPoints.indexOf(currentCheckPoint) == 0 ? true : false;
        let isLast = checkPoints.indexOf(currentCheckPoint) == checkPoints.length-1 ? true : false;
        if(checkPoints.length > 0){
            return (
                <CheckPointChange raceCheckPoint={currentCheckPoint} onClickLeft={onClickLeftCP} onClickRight={onClickRightCP} isFirst={isFirst} isLast={isLast}/>
            )
        }
        else{
            <></>
        }
    }, [currentCheckPoint, checkPoints]);

    if(checkPoints.length > 0 && !isLoadingCheckPoints){
        return (
            <Table

                className="mt-4 p-0 rounded-2xl w-full min-h-[400px]"
                aria-label="Example table with custom cells, pagination and sorting"
                isHeaderSticky={true}
                topContent={topContent}
                bottomContentPlacement="outside"
                classNames={{
                    wrapper: "md:max-h-[1000px] bg-transparent p-0 border-0 shadow-none",
                }}
            >
                <TableHeader>
                    <TableColumn width={30}>#</TableColumn>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn align="start" className="text-right" width={100}>RESULT</TableColumn>
                </TableHeader>
                <TableBody items={results} loadingState={loadingState} loadingContent={<Spinner />} emptyContent={"No results"}>
                    {
                        results?.map((result, index:number) => {
                            return (
                                <TableRow key={result.id} className="example-style hover:bg-content2 cursor-pointer animate-fade ease-in transition-opacity duration-7000">
                                    <TableCell>
                                        <Chip className="h-6 min-w-6 text-center w-6 p-0" color={"success"}>
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
                                            <span className="font-bold text-[16px]">
                                                        {result.player.userName}
                                                    </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex w-auto flex-col items-end">
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
        )
    }

    return (
        <div className="flex w-full justify-center h-full items-center">
            <h1 className="text-default-500 font-bold mt-4">
                No data for race
            </h1>
        </div>
    );
};
