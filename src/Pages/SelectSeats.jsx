import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import TopBar from "../Components/TopBar";
import Footer from "../Components/Footer";

import Loading from "../Components/Loading";

export default function SelectSeats(){
    const {idSeats} = useParams();
    const [sectionseats, setSectionseats] = useState(false);
    const movie = sectionseats.movie;
    const seats = sectionseats.seats;
    
    
    useEffect(() => {
        const promisse = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSeats}/seats`);
        promisse.then((sucess) => { setSectionseats(sucess.data) });
        promisse.catch((warning) => console.log(warning.response));
    }, []);
    console.log(sectionseats)
    console.log(movie)
    console.log(seats)

    if (sectionseats === false) {
        return (<AlignPage><TopBar/><Loading/></AlignPage>)
    }
    else {
        return(
            <AlignPage>
                <TopBar/>
                <SelectSeatText>Selecione o(s) assento(s)</SelectSeatText>
                <SeatsContainer>
                    {seats.map((seat) => {
                        return(
                            <Seats key={seat.id} isAvailable={seat.isAvailable} disabled={seat.isAvailable} isSelected={seat.isSelected}>
                                {seat.name}
                            </Seats>
                        )
                    }
                    )}

            </SeatsContainer>
            <Footer image={movie.posterURL} title={movie.title} time={sectionseats.name}/>
        </AlignPage>
    )
}
}

const AlignPage = styled.div`
    display: flex;
    margin-top: 50px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
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
const Seats = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 3.5px;
    box-sizing: border-box;
    width: 26px;
    height: 26px;
    left: 24px;
    top: 158px;
    background: ${(isAvailable)=>isAvailable? 'blue' : 'red'};
    border: 1px solid #808F9D;
    border-radius: 12px;
`