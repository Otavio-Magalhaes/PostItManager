import React from "react"
import {Routes, Route} from "react-router-dom"
import Login from "../pages/Login"
import Signup from "../pages/SingUp"
import Board from "../pages/Board"
import Home from "../pages/Home"
import BoardsPage from "../pages/BoardsPage"
// criar pagina not found
import PrivateRoute from "../components/PrivateRoute"
import PublicRoute from "../components/PublicRoute"


export default function AppRoutes(){
    return(
        <Routes>
            //nao acho necessario colocar o PublicRoute, porem se precisar so inserir o element abaixo.
            <Route path="/" >
                <Route index element={<Home/>}/>
            </Route>

            <Route path="/login" element= {<PublicRoute/>}>
                <Route index element={<Login/>}/>
            </Route>
            <Route path="/singup" element= {<PublicRoute/>}>
                <Route index element={ <Signup/> }/>
            </Route>
            
            <Route path="/boardsPage" element={ <PrivateRoute/> }>
                <Route index element={ <BoardsPage/> }/>
            </Route>


            <Route path="/board/:boardId" element={ <PrivateRoute/> }>
                <Route index element={ <Board/> }/>
            </Route>
            {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
        
    )
}