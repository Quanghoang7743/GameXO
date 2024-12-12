
import {Routes, Route} from 'react-router-dom'
import UserLayout from '../layouts/UserLayout'
import Home from "../page/user/Home.tsx";
import GameMode from '../page/gamemode/GameMode.tsx';
import Modal from '../page/modal/Modal.tsx';
import GameCase from "../Game/Game 3x3/GameCase.tsx";
import Game5x5case from "../Game/Game5x5/Game5x5case.tsx";






function UserRoutes() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<UserLayout/>}>
                <Route index element={<Home/>}></Route>
                <Route path='/gamemode' element={<GameMode/>}/>
                <Route path='/modal' element={<Modal/>}/>
                <Route path='/gamenormal' element={<GameCase/>}/>
                <Route path='/game5x5' element={<Game5x5case/>}/>
            </Route>
        </Routes>
    </div>
  )
}

export default UserRoutes
