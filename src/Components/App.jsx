//MODULES
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from './GlobalStyle';

// PAGES
import SelectMovie from '../Pages/SelectMovie'; // first page
import SelectSection from '../Pages/SelectSection'; // second page
import SelectSeats from '../Pages/SelectSeats'; // third page
import Sucess from '../Pages/Sucess'; // fourth page


export default function App(){
    return(
        <BrowserRouter>
            <GlobalStyle/>
            <Routes>
                <Route path="/" element={<SelectMovie/>}/>
                <Route path="/sessoes/:idFilme" element={<SelectSection/>}/>
                <Route path="/assentos/:idSessao" element={<SelectSeats/>}/>
                <Route path="/sucess/:title/:time/:date/:name/:cpf/:newseats" element={<Sucess/>}/>
            </Routes>
        </BrowserRouter>      
    )

}