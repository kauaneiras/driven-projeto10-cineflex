//MODULES
import styled from "styled-components"
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
//COMPONENTS
import TopBar from "../Components/TopBar"
import Loading from "../Components/Loading";
import Footer from "../Components/Footer";


export default function SelectSectionTime() {
    const { idMovie } = useParams();
    const [sections, setSections] = useState(false);


    useEffect(() => {
        const promisse = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idMovie}/showtimes`);
        promisse.then((sucess) => { setSections(sucess.data) });
        promisse.catch((warning) => console.log(warning.response));
    }, []);

    console.log(sections);
    console.log(sections.days);
    const days = sections.days;


    if (sections === false) {
        return (<AlignPage><TopBar/><Loading /></AlignPage>)
    }
    else {
        return (<AlignPage>
            <TopBar />
            <Tittle>Selecione o horário</Tittle>
            <AlignSections>
                {days.map((section) => RenderTimes(section))}
            </AlignSections>
            <Footer image={sections.posterURL} title={sections.title} time=""/>
        </AlignPage>)
    }
}

function RenderTimes(section) {
    let showtimes = section.showtimes;
    return (<AlignSections>
        <Day>{section.weekday} - {section.date}</Day>
        <ShowTimes>
            {showtimes.map(time => {
                return (
                    <Link to={`/seats/${time.id}`} >
                        <Hour>
                            <HourNumber>{time.name}</HourNumber>
                        </Hour>
                    </Link>)
            })}
        </ShowTimes>
    </AlignSections>)
}

{/* <Link to={`/assentos/${section.id}/${}`}></Link> */ }

const AlignSections = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
  

`
const Hour = styled.div`
    width: 82px;
    height: 43px;
    background: #E8833A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    margin-bottom: 20px;
    margin-top: 15px;
    
`

const HourNumber = styled.p`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.02em;
    color: #FFFFFF;
    text-decoration: none;
    text-decoration-underlined: none;
`

const Day = styled.p`
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    display: flex;
    align-items: center;
    letter-spacing: 0.02em;
    text-align: center;
    text-decoration: none;
`

const ShowTimes = styled.div`
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`

const Tittle = styled.h1`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
    display: flex;
    align-items: flex-start;
    text-align: center;
    letter-spacing: 0.04em;
    margin: 20px;
`

const AlignPage = styled.div`
    position: relative;
    display: flex;
    margin-top: 50px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-left: 25px;
    width: 100%;
    height: 80vh;
    background-color: #FFFFFF;
    position: absolute;
    `