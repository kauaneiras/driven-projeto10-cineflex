import styled from "styled-components";
import { useParams, Navigate } from "react-router-dom"
import { useState } from "react";

import TopBar from "../Components/TopBar";

export default function OrderComfirmation(){
    const { title, time, date, name, cpf, newseats} = useParams();
    const [goToHome, setGoToHome] = useState(false);
    
    console.log(name);
    console.log(cpf);
    const arrseat = newseats.replaceAll('-', ' , ').split(",")
    const arrtime = time.replace('h', ':')
    const arrdate = date.replace('d', '/').replace('d', '/')
    console.log(arrseat);
    console.log(arrtime)
    console.log(arrdate)
    if(goToHome){
        return <Navigate to="/"/>
    }else{
        return(
            <AlignPage>
                <TopBar/>
                <AlertContainer><Alert>Pedido feito</Alert><Alert>com sucesso!</Alert></AlertContainer>
                <ContainerInfos>
                    <Container>
                        <Tittles>Filme e sessão</Tittles>
                        <Infos data-identifier="movie-session-infos-reserve-finished">{title}</Infos>
                        <Infos data-identifier="movie-session-infos-reserve-finished">{arrdate} {arrtime}</Infos>
                    </Container>
                    <Container>
                        <Tittles>Ingressos</Tittles>
                        {arrseat.map((seat, index) => <Infos data-identifier="seat-infos-reserve-finished" key={index}>Assento {seat}</Infos>)}
                    </Container>
                    <Container>
                        <Tittles>Comprador</Tittles>
                        <Infos data-identifier="buyer-infos-reserve-finished">{name}</Infos>
                        <Infos data-identifier="buyer-infos-reserve-finished">{cpf}</Infos>
                    </Container>

                    <ButtonContainer><Button data-identifier="back-to-home-btn" onClick={()=> setGoToHome(true)}>Voltar pra Home</Button></ButtonContainer>
                </ContainerInfos>
            </AlignPage>
        )
    }
}

const ButtonContainer = styled.div`
    width: 100%;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Button = styled.button`
    width: 225px;
    height: 42px;
    background: #E8833A;
    border-radius: 3px;
    border: none;
    color: #FFFFFF;
    font-family: 'Roboto', sans-serif;	
    font-size: 18px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0.04em;
    text-align: center;
    :hover{
        background-color: #FCAE5B;
    }

`


const ContainerInfos = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`



const AlignPage = styled.div`
    position: relative;
    display: flex;
    margin-top: 50px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    height: 80vh;
    background-color: #FFFFFF;
    position: absolute;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 20px;
    margin-left: 30px;
    min-height: 110px;
    width: 374px;
    border-radius: nullpx;

`

const AlertContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 110px;
    width: 374px;
    left: 0px;
    top: 0px;
    border-radius: nullpx;
`
const Alert = styled.h1`
    font-family: 'Roboto', sans-serif;
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 0.04em;
    color: #247A6B
`
const Tittles = styled.h2`
    font-family: 'Roboto', sans-serif;
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 0.04em;
    text-align: left;
`
const Infos = styled.h3`
    font-family: 'Roboto', sans-serif;
    font-size: 22px;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: 0.04em;
    text-align: left;
`