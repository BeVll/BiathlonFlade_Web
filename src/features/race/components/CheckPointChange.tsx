import {IRaceCheckPointModel} from "../../../lib/types.ts";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import {Button} from "@nextui-org/react";
import {MouseEventHandler, useEffect, useState} from "react";

export const CheckPointChange = ({raceCheckPoint, onClickLeft, onClickRight, isFirst, isLast} : {raceCheckPoint: IRaceCheckPointModel, onClickLeft: MouseEventHandler, onClickRight: MouseEventHandler, isFirst:boolean, isLast:boolean}) => {

    useEffect(() => {

    }, [raceCheckPoint]);

    return (
                <div className="flex justify-between bg-content2 rounded-xl items-center">
                    <Button onClick={onClickLeft} isDisabled={isFirst}>
                        <FaArrowLeft/>
                    </Button>
                    <div className="font-medium">
                        {raceCheckPoint.name}
                    </div>
                    <Button onClick={onClickRight} isDisabled={isLast}>
                        <FaArrowRight/>
                    </Button>
                </div>
    );
};
