import {Accordion, AccordionItem, Card, CardBody, CardHeader, Image, Listbox, Tab, Tabs} from "@nextui-org/react";
import {FinalResult} from "../race/components/FinalResult.tsx";

export const Calendar = () => {
    return (
        <Card  className="mt-4">
                    <>
                        <CardHeader className="p-0 m-0 h-[300px] overflow-hidden rounded-none relative ">
                            <div className="absolute w-full h-full -z-10" style={{
                                backgroundImage: "url(https://sun9-38.userapi.com/sbTdNNtOPxzt7J5Gb-go7RWJwX4wIEyBZC3eUA/WJSDXvejIqY.jpg)",
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundPositionY: -100
                            }}>



                            </div>
                            {/*<Image className="h-full"*/}
                            {/*       src={"https://sun9-38.userapi.com/sbTdNNtOPxzt7J5Gb-go7RWJwX4wIEyBZC3eUA/WJSDXvejIqY.jpg"}*/}
                            {/*       style={{objectFit: "cover"}}/>*/}
                        </CardHeader>
                        <CardBody className="p-4">
                            {/*<Accordion>*/}
                            {/*    <AccordionItem key="1" aria-label="Accordion 1" title={*/}
                            {/*        <h1 className="text-xl font-bold">*/}
                            {/*            Previous events*/}
                            {/*        </h1>*/}
                            {/*    }>*/}
                            {/*    </AccordionItem>*/}
                            {/*    <AccordionItem key="2" aria-label="Accordion 1" title={*/}
                            {/*        <h1 className="text-xl font-bold">*/}
                            {/*            Upcoming events*/}
                            {/*        </h1>*/}
                            {/*    }>*/}
                            {/*    </AccordionItem>*/}
                            {/*</Accordion>*/}

                        </CardBody>
                    </>
        </Card>
    );
};
