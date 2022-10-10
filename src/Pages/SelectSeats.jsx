import { useEffect } from "react";
import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";

import styled from "styled-components";
import axios from "axios";

//COMPONENTS
import TopBar from "../Components/TopBar";
import Footer from "../Components/Footer";
import Loading from "../Components/Loading";

export default function SelectSeats() {
    const { idSessao } = useParams();
    const [sectionseats, setSectionseats] = useState(false);
    const [selectedseats, setSelectedseats] = useState([]);
    const [ids , setIds] = useState([]);
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [pagesucess, setPagesucess] = useState(false);
    // setSelected({number: number, isAvailable: true, id: id}

    useEffect(() => {
        const promisse = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`);
        promisse.then((sucess) => { setSectionseats(sucess.data) });
        promisse.catch((warning) => console.log(warning.response));
    }, []);

    // put the selected seats in an selectedseats array and define the style of the seats
    function selectSeat(seat) {

        if (!seat.isAvailable) {
            return(<SeatsNotFree data-identifier="seat">{seat.name}</SeatsNotFree>);
        }
        else if(seat.isAvailable && !(selectedseats.includes(seat.name))){
            return(<SeatsFree data-identifier="seat" color={"#C3CFD9"} border={"1px solid #7B8B99"} onClick={() => {setSelectedseats([...selectedseats, seat.name]); setIds([...ids, seat.id])}}>{seat.name}</SeatsFree>);
        }
        else if(seat.isAvailable && selectedseats.includes(seat.name)){
            return(<SeatsFree color={"#8DD7CF"} border={"1px solid #0E7D71"} onClick={() => removeItemFromArr({seat})}>{seat.name}</SeatsFree>);
        }
    }
    //removes the seat from the selectedseats array
    function removeItemFromArr({seat}) {
        const newArray = selectedseats.filter((item) => item !== seat.name)
        const newArrayIds = ids.filter((item) => item !== seat.id)
        setSelectedseats(newArray);
        setIds(newArrayIds);
    }
    
    function goToNextPage(event) {
        event.preventDefault();
        ;
        if(name ===""){alert("Por favor, insira o seu nome")}
        else if(selectedseats.length === 0){alert("Selecione o(s) seu assento(s), por favor!")}
        else if(cpf.length !== 11){alert("Seu CPF está incorreto!")}
        else{
            const promise = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", {ids: ids, name: name, cpf: cpf});
            promise.then(() => {setPagesucess(true); });
            promise.catch((warning) => {alert("erro")});
        }
    }

    if (pagesucess === false) {
        if (sectionseats === false) {
            return (<AlignPage><TopBar /><Loading /></AlignPage>)
        }
        else {
            return (
                <AlignPage>
                    <TopBar/>
                    <SelectSeatText>Selecione o(s) assento(s)</SelectSeatText>
                    <SeatsContainer>{sectionseats.seats.map((seat) => selectSeat(seat))}</SeatsContainer>
                    <DescriptionAboutSeats/>
                    <form onSubmit={goToNextPage}>
                        <FormContainer>
                        <Name>Nome do comprador:</Name>
                        <InputName type="text" placeholder="Digite seu nome..." value={name} onChange={(e) => {setName( e.target.value)}} />
                        <CPF>CPF do comprador:</CPF>
                        <InputCPF type="number" placeholder="Digite seu CPF..." value={cpf} onChange={(e) => {setCpf( e.target.value)}}/>
                        <Button type="submit">Reservar assento(s)</Button>
                        </FormContainer>
                    </form>                
                    <Footer image={sectionseats.movie.posterURL} title={sectionseats.movie.title} time={sectionseats.name} weekday={sectionseats.day.weekday} />
                </AlignPage>
            )
        }
    } else { let newseats = selectedseats.join('-'); let title = sectionseats.movie.title; let newtime = sectionseats.name.replace(':', 'h'); let newdate = sectionseats.day.date.replace('/', 'd').replace('/', 'd'); return(<Navigate to={`/sucess/${title}/${newtime}/${newdate}/${name}/${cpf}/${newseats}/`}/>)}
}


function DescriptionAboutSeats() {
    return (
        <Description>
            <SeatsDescriptionSelected><SELECT></SELECT><h3>Selecionado</h3></SeatsDescriptionSelected>
            <SeatsDescriptionFree><FREE></FREE><h3>Disponível</h3></SeatsDescriptionFree>
            <SeatsDescriptionNotFree><NOTFREE></NOTFREE><h3>Indisponível</h3></SeatsDescriptionNotFree>
        </Description>
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
    background-color: ${props => props.color};
    border: ${props => props.border};
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
    cursor: pointer;
    margin-left: 50px;
    border: none;
    :hover{
        background-color: #FCAE5B;
    }
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
