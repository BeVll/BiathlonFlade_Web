import {useTheme} from "next-themes";
import {useEffect, useState} from "react";
import {Switch} from "@nextui-org/react";
import {SunIcon} from "../assets/icons/SunIcon.tsx";
import {MoonIcon} from "../assets/icons/MoonIcon.tsx";

export const ThemeSwitcher = (props:any) => {
    const { theme, setTheme } = useTheme();
    const [isSelected, setIsSelected] = useState(true);

    useEffect(() => {
        if(theme == "dark")
            setIsSelected(false);
        else
            setIsSelected(true);
    }, []);

    const changeTheme = () => {
        isSelected ? setIsSelected(false) : setIsSelected(true);

        if(isSelected)
            setTheme("dark");
        else
            setTheme("light");
    }



    return (
        <div className="flex flex-col gap-2">
            <Switch
                size="lg"
                color="default"

                isSelected={isSelected}
                onValueChange={changeTheme}
                thumbIcon={({className }) =>
                    isSelected ? (
                        <SunIcon className={className} />
                    ) : (
                        <MoonIcon className={className} />
                    )
                }
            >
            </Switch>
        </div>
    )
}