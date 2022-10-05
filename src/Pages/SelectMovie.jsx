import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import TopBar from "../Components/TopBar"
import Loading from "../Components/Loading"
import GetMovie from "../API/GetMovie"

export default function SelectMovie() {

    const [movies, setMovies] = useState(false);

    useEffect(() => {
        const promisse = axios.get(GetMovie);
        promisse.then((sucess) => { setMovies(sucess.data) });
        promisse.catch((warning) => console.log(warning.response));
    }, []);

    if (movies === false) {
        return (<AlignPage><TopBar/><Loading /></AlignPage>)
    }
    else {
        return (
            <AlignPage>
                <TopBar />
                <Tittle>Selecione o filme</Tittle>
                <MoviesAlign>
                    {movies.map((movie) => <Link to={`/sessoes/${movie.id}`}><MovieImage src={movie.posterURL} alt="" /></Link>)}
                </MoviesAlign>
            </AlignPage>
        )
    }
}

const Tittle = styled.h1`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.04em;
    margin: 20px;
`
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

const MoviesAlign = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;    
`

const MovieImage = styled.img`
    width: 129px;
    height: 193px;
    left: 213px;
    top: 177px;
    margin: 10px;
`