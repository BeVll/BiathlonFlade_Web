import {
    Accordion,
    AccordionItem, Button,
    Card,
    CardBody,
    CardHeader, Chip,
    Image, Link,
    Listbox, ListboxItem, ListboxSection,
    Select, SelectItem,
    Tab,
    Tabs
} from "@nextui-org/react";
import {FinalResult} from "../race/components/FinalResult.tsx";

import header from '../../assets/header.png';
import {useEffect, useState} from "react";
import CalendarApi from "./api/CalendarApi.ts";
import {IEventModel} from "../../lib/types.ts";
import {format} from "date-fns";

export const Calendar = () => {
    const [selectedSeason, setSelectedSeason] = useState<any>();
    const [seasons, setSeasons] = useState<number[]>([]);
    const [events, setEvents] = useState<IEventModel[]>([]);
    useEffect(() => {
        CalendarApi.getAllSeasons().then(res => {
            setSeasons(res.data);
            if(res.data.length > 0){
                CalendarApi.getAllEvents(res.data[0]).then(res => {
                    console.log(res.data);
                    setEvents(res.data);
                });
            }

        });

    }, []);

    const changeSeason = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
        CalendarApi.getAllEvents(parseInt(e.target.value)).then(res => {
            console.log(res.data);
            setEvents(res.data);
        });
    }

    function convertDateToString(startDate: Date, endDate: Date): string {

        let sDate = new Date(startDate);
        let eDate = new Date(endDate);
        // Якщо рік кінцевої дати менший за рік початкової, збільшуємо рік кінцевої дати на 1
        if (eDate < sDate) {
            eDate.setFullYear(endDate.getFullYear() + 1);
        }

        // Форматуємо рядок за необхідним форматом
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        };

        // Перевіряємо, чи є змінні `startDate` та `endDate` об'єктами типу `Date`
        if (!(sDate instanceof Date) || !(eDate instanceof Date)) {
            return 'Неправильні дати';
        }

        const startDateFormat = sDate.toLocaleDateString('en-US', options);
        const endDateFormat = eDate.toLocaleDateString('en-US', options);

        // Якщо місяці різні, виводимо дати в форматі "день Місяць—день Місяць Рік"
        // В іншому випадку, виводимо "день—день Місяць Рік"
        let formattedDateTime = format(startDate, 'dd');
        let formattedDateTime2 = format(endDate, 'dd  LLL y');


        return sDate.getFullYear() !== eDate.getFullYear()
            ? `${startDateFormat} - ${endDateFormat}`
            : `${formattedDateTime} - ${formattedDateTime2}`;
    }

    function isCurrentDateInRange(startDate: Date, endDate: Date): boolean {
        const currentDate = new Date();
        let sDate = new Date(startDate);
        let eDate = new Date(endDate);
        console.log(currentDate >= sDate && currentDate <= eDate);
        return currentDate >= sDate && currentDate <= eDate;
    }

    return (
        seasons && seasons.length > 0 ? (
            <Card  className="mt-4">
                <CardHeader className="p-0 m-0 overflow-hidden rounded-none relative ">
                    {/*<div className="absolute w-full h-full -z-10" style={{*/}
                    {/*    backgroundImage: "url(https://sun9-38.userapi.com/sbTdNNtOPxzt7J5Gb-go7RWJwX4wIEyBZC3eUA/WJSDXvejIqY.jpg)",*/}
                    {/*    backgroundPosition: 'center',*/}
                    {/*    backgroundSize: 'cover',*/}

                    {/*}}>*/}
                    {/*</div>*/}
                    <Image className="rounded-none" src={header}/>



                    {/*<Image className="h-full"*/}
                    {/*       src={"https://sun9-38.userapi.com/sbTdNNtOPxzt7J5Gb-go7RWJwX4wIEyBZC3eUA/WJSDXvejIqY.jpg"}*/}
                    {/*       style={{objectFit: "cover"}}/>*/}
                </CardHeader>
                <CardBody className="p-4 flex flex-col gap-4">
                    <div className="flex gap-4">
                        <Select key={"compSelect"} size={"sm"} className="w-1/4 min-w-[150px]" label="Competitions"  defaultSelectedKeys={["3"]}>
                            <SelectItem key={3} value={"1"}>All</SelectItem>
                            <SelectItem key={2} value={"World Championship"}>World Championship</SelectItem>
                            <SelectItem key={1} value={"World Cup"}>World Cup</SelectItem>
                        </Select>
                        <Select onChange={changeSeason} key={"seasonSelect"} size={"sm"} selectionMode={"single"} className="w-1/4 min-w-[150px]" label="Season" defaultSelectedKeys={"1"}>
                            {
                                seasons.map((season, index) => {
                                    return (
                                        <SelectItem key={season}  value={season}>
                                            {season.toString()}
                                        </SelectItem>
                                    )
                                })
                            }
                        </Select>
                    </div>
                    <Accordion variant="splitted" showDivider={false} className="px-0" >
                        {
                            events.map(event => {
                                return (
                                    <AccordionItem key={event.id} aria-label="Accordion 1"  className="  group-[.is-splitted]:bg-content2 group-[.is-splitted]:shadow-none" title={
                                        <div className="flex flex-row gap-4 items-center">
                                            <Image width={80} className="h-[64px] rounded-xl" src={"https://assets.biathlonworld.com/image/upload/ar_16:9,c_fill,f_auto,h_36,q_auto,w_64/static/flag-new/"+event.country.code}/>
                                            <div className="flex flex-col gap-2 rounded-xl overflow-hidden">
                                                <h1 className="font-bold text-[16px]">{event.name}</h1>
                                                <div className={"flex flex-row gap-2 overflow-x-auto"}>
                                                    {
                                                        event.startDate && event.endDate ?
                                                            <Chip color={isCurrentDateInRange(event.startDate, event.endDate) ? "primary" : "default"}>
                                                                <span className="text-[12px] font-medium">
                                                                    {convertDateToString(event.startDate, event.endDate)}
                                                                </span>
                                                            </Chip> : <></>
                                                    }
                                                    <Chip>
                                                                <span className="text-[12px] font-medium" >
                                                                    Races: {event.races.length}
                                                                </span>
                                                    </Chip>
                                                </div>

                                            </div>
                                        </div>
                                    }>

                                        <Listbox emptyContent={"No races"}  className="bg-content1 overflow-hidden gap-0 rounded-xl p-0">
                                            {
                                                event.races.map((race, index) => {
                                                    return (
                                                        <ListboxSection showDivider={index + 1 != event.races.length} className="m-0">
                                                            <ListboxItem key={race.id} className="p-4 rounded-none">
                                                                <Link href={"/race/" + race.id} className="w-full">
                                                                    <div className="flex justify-between w-full items-center">
                                                                        <span className="text-foreground font-medium">
                                                                            {race.raceName}
                                                                        </span>
                                                                        <Chip>
                                                                            <span className="text-[12px] font-bold">
                                                                                {format(race.raceDate, "HH:mm | dd LLL y")}
                                                                            </span>
                                                                        </Chip>
                                                                    </div>
                                                                </Link>
                                                            </ListboxItem>
                                                        </ListboxSection>

                                                    )
                                                })
                                            }


                                        </Listbox>
                                    </AccordionItem>
                                )
                            })
                        }

                    </Accordion>
                </CardBody>

            </Card>
        )
        :
            <></>
    );
};
