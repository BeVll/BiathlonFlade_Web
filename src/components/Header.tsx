import {
    Button, Image,
    Link,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from "@nextui-org/react";
import {ThemeSwitcher} from "./ThemeSwitcher.tsx";
import logo from '../assets/logoMBAR.png';
import logoDark from '../assets/logoMBAR_dark.png';
import {useTheme} from "next-themes";
export const Header = (props:any) => {
    const {theme} = useTheme();

    return (
        // <Navbar className="border-default-200 border-b dark:border-default-100 dark:bg-default-200/20 bg-content1">
        <Navbar className="shadow bg-content1">
            <NavbarBrand>
                <Image className="rounded-none" width={180} src={theme == "dark" ? logo : logoDark}/>

            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4 font-medium" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link href="/calendar" aria-current="page">
                        Calendar
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Standings
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <ThemeSwitcher/>
                </NavbarItem>
                <NavbarItem className="hidden lg:flex">
                    <Link href="#">Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="primary" href="#" variant="flat">
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};
