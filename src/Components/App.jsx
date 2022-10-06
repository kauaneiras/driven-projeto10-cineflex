//MODULES
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from './GlobalStyle';

// PAGES
import SelectMovie from '../Pages/SelectMovie'; // first page
import SelectSection from '../Pages/SelectSection'; // second page
import SelectSeats from '../Pages/SelectSeats'; // third page
import OrderConfirmation from '../Pages/OrderConfirmation'; // fourth page


export default function App(){
    return(
        <BrowserRouter>
            <GlobalStyle/>
            <Routes>
                <Route path="/" element={<SelectMovie/>}/>
                <Route path="/sections/:idMovie" element={<SelectSection/>}/>
                <Route path="/seats/:idSeats" element={<SelectSeats/>}/>
                <Route path="/sucess/" element={<OrderConfirmation/>}/>
            </Routes>
        </BrowserRouter>      
    )

}