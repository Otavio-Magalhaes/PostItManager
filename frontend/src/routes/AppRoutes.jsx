import React from "react"
import {Routes, Route} from "react-router-dom"
import Login from "../pages/Login"
import Signup from "../pages/SingUp"
import Board from "../pages/Board"
import Home from "../pages/Home"
// criar pagina not found
import PrivateRoute from "../components/PrivateRoute"


export default function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/singup" element={ <Signup/> }/>
            <Route path="/board" element={ <PrivateRoute/> }>
                <Route index element={ <Board/> }/>
            </Route>

            {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
        
    )
}