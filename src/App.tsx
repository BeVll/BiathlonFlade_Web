import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useEffect} from "react";
import {AuthUserActionType, IAuthUser, IUser} from "./store/types.ts";
import {useDispatch, useSelector} from "react-redux";
import {Home} from "./pages/Home.tsx";
import {Layout} from "./layouts/Layout.tsx";
import bg from './assets/bg.png';
import bg2 from './assets/bg-left.png';
import {jwtDecode} from "jwt-decode";
import {useTheme} from "next-themes";
import {ResultsPage} from "./pages/ResultsPage.tsx";
import {formHttp, http} from "../http.ts";
import {RaceDetails} from "./pages/RaceDetails.tsx";
import {CalendarPage} from "./pages/CalendarPage.tsx";

function App() {
    const dispatch = useDispatch();
    const { user, isAuth } = useSelector((store: any) => store.auth as IAuthUser);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        if (localStorage.token) {
            http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
            formHttp.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;

            const user2 = jwtDecode(localStorage.token) as IUser;

            console.log(user2);
            dispatch({
                type: AuthUserActionType.LOGIN_USER, payload: {
                    id: user2.id,
                    name: user2.name,
                    image: user2.image,
                    email: user2.email,
                    roles: user2.roles
                } as IUser
            });

        }
    }, []);

    return (


        <>
            {/*{*/}
            {/*    theme == "dark" &&*/}
            {/*    <div className="-z-20">*/}
            {/*        <div aria-hidden="true"*/}
            {/*             className="fixed light:hidden light:opacity-0 dark:md:block dark:opacity-70 -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] -z-20 rotate-12">*/}
            {/*            <img src={bg}*/}
            {/*                 className="relative -z-20 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"*/}
            {/*                 alt="docs right background" data-loaded="true"/></div>*/}

            {/*        <div aria-hidden="true"*/}
            {/*             className="fixed light:opacity-0 z dark:md:block dark:opacity-70 -bottom-[40%] -left-[20%] -z-20">*/}
            {/*            <img src={bg2}*/}
            {/*                 className="relative -z-20 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"*/}
            {/*                 alt="docs left background" data-loaded="true"/></div>*/}
            {/*        <div className="backdrop-blur-3xl fixed h-screen w-full">*/}

            {/*        </div>*/}
            {/*    </div>*/}
            {/*}*/}


            {/*<main className={theme + " z-20"}>*/}

            <BrowserRouter>
                {
                    // isAuth ?
                    //     <Routes>
                    //         <Route path="/" element={<Layout/>}>
                    //             <Route index element={<Home/>}/>
                    //             <Route path="subjects" element={<SubjectsPage/>}>
                    //                 <Route index element={<ListSubjects/>}/>
                    //             </Route>
                    //             {/*<Route path="*" element={<NoPage />} />*/}
                    //         </Route>
                    //     </Routes>
                    //     :
                    //     <Routes>
                    //         <Route path="/login" element={<LoginLayout/>}>
                    //             <Route index element={<LoginPage/>}/>
                    //         </Route>
                    //     </Routes>
                    <Routes>
                        <Route path="/" element={<Layout/>}>
                            <Route index element={<Home/>}/>
                            <Route path="calendar" element={<CalendarPage/>}/>
                            <Route path="race/:id" element={<RaceDetails/>}/>
                            {/*<Route path="*" element={<NoPage />} />*/}
                        </Route>
                    </Routes>
                }


            </BrowserRouter>
            {/*</main>*/}
        </>


    )
}

export default App