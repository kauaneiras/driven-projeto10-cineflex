import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import TopBar from "../Components/TopBar";
import Footer from "../Components/Footer";

import Loading from "../Components/Loading";

export default function SelectSeats(){
    const {idSeats} = useParams();
    const [sectionseats, setSectionseats] = useState(false);
    const [selectedseats, setSelectedseats] = useState([]);

   
    useEffect(() => {
        const promisse = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSeats}/seats`);
        promisse.then((sucess) => { setSectionseats(sucess.data) });
        promisse.catch((warning) => console.log(warning.response));
    }, []);

    console.log(sectionseats.movie)

    if (sectionseats === false) {
        return (<AlignPage><TopBar/><Loading/></AlignPage>)
    }
    else {
        return(
            <AlignPage>
                <TopBar/>
                <SelectSeatText>Selecione o(s) assento(s)</SelectSeatText>
                <SeatsContainer>
                    {sectionseats.seats.map((seat) => <RenderSeats seat={seat}/>)}
                </SeatsContainer>
                <DescriptionAboutSeats/>
                <Form/>
                <Button>Reservar assento(s)</Button>
            <Footer image={sectionseats.movie.posterURL} title={sectionseats.movie.title} time={sectionseats.name} weekday={sectionseats.day.weekday} />
        </AlignPage>
    )
}
}



function RenderSeats({seat}) {
       
       console.log(seat.name+" : "+seat.isAvailable);
       const [selected, setSelected] = useState(false);    

        if (seat.isAvailable === true){
           return(<SeatsFree onClick={()=> (selected == false) ? setSelected(true) : setSelected(false)} selected={selected}>{seat.name}</SeatsFree>)
        }
        else if (seat.isAvailable === false){
           return(
               <SeatsNotFree>{seat.name}</SeatsNotFree>)
        }
}

function DescriptionAboutSeats(){
    return(
        <Description>
            <SeatsDescriptionSelected><SELECT></SELECT><h3>Selecionado</h3></SeatsDescriptionSelected>
            <SeatsDescriptionFree><FREE></FREE><h3>Disponível</h3></SeatsDescriptionFree>
            <SeatsDescriptionNotFree><NOTFREE></NOTFREE><h3>Indisponível</h3></SeatsDescriptionNotFree>
        </Description>
    )
}

function Form(){
    return(
        <FormContainer>
            <Name>Nome do comprador:</Name>
            <InputName type="text" placeholder="Digite seu nome..."/>
            <CPF>CPF do comprador:</CPF>
            <InputCPF type="number" placeholder="Digite seu CPF..."/>
        </FormContainer>
    )
}

// Styles for <RenderSeats> ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const SeatsNotFree = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 3.5px;
    box-sizing: border-box;
    width: 26px;
    height: 26px;
    left: 24px;
    top: 158px;
    background-color: #FBE192;
    border: 1px solid #F7C52B;
    border-radius: 12px;
`
const SeatsFree = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 3.5px;
    box-sizing: border-box;
    width: 26px;
    height: 26px;
    left: 24px;
    top: 158px;
    cursor: pointer;
    background-color: ${selected => selected.selected == true ? "#1AAE9E" : "#C3CFD9"};
    border: ${selected => selected.selected == true ? "1px solid #0E7D71" : "1px solid #7B8B99;"};
    border-radius: 12px;
`
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 225px;
    height: 42px;
    background-color: #E8833A;
    border-radius: 3px;
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.04em;
    color: #FFFFFF;
`

const AlignPage = styled.div`
    position: relative;
    display: flex;
    margin-top: 50px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80vh;
    background-color: #FFFFFF;
    position: absolute;
`

const SelectSeatText = styled.h1`
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
    display: flex;
    align-items: flex-start;
    text-align: center;
    letter-spacing: 0.04em;
`
const SeatsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 334px;
`


// Styles for <DescriptionAboutSeats> -------------------------------------------------------------------------------------------------------------------------------------------
const Description = styled.div`
    width: 282px;
    margin-top:20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    & h3{
        color: #4E5A65;
        font-family: 'Roboto', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 15px;
        display: flex;
        align-items: center;
        letter-spacing: -0.013em;
    }
   
`
const SeatsDescriptionFree = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const SeatsDescriptionNotFree = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const SeatsDescriptionSelected = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const FREE = styled.div`
    width: 25px;
    height: 25px;
    background-color: #C3CFD9;
    border: 1px solid #7B8B99;
    border-radius: 50%;
`
const NOTFREE = styled.div`
    width: 25px;
    height: 25px;
    background-color: #FBE192;
    border: 1px solid #F7C52B;
    border-radius: 50%;
`
const SELECT = styled.div`
    width: 25px;
    height: 25px;
    background-color: #1AAE9E;
    border: 1px solid #0E7D71;
    border-radius: 50%;
`
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// Styles for Form ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 40px;
`
const Name = styled.h3`
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    display: flex;
    align-items: center;
    color: #293845;
    margin-bottom: 5px;
`
const InputName = styled.input`
    box-sizing: border-box;
    width: 327px;
    height: 51px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 3px;
    margin-bottom: 10px;
`
const CPF = styled.h3`
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    display: flex;
    align-items: center;
    color: #293845;
    margin-bottom: 5px;
`
const InputCPF = styled.input`
    box-sizing: border-box;
    width: 327px;
    height: 51px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 3px;
    margin-bottom: 60px;
`
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
