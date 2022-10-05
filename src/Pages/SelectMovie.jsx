import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

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
                <h2 style={{fontSize: '50px', color: 'black'}}>Selecione o filme</h2>
                <MoviesAlign>
                    {movies.map((movie) => <MovieImage><Link to={`/sessoes/${movie.id}`}><img src={movie.posterURL} alt="" /></Link></MovieImage>)}
                </MoviesAlign>
            </AlignPage>
        )
    }
}


const AlignPage = styled.div`
    display: flex;
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
    width: 129px;
    height: 193px;
    left: 213px;
    top: 177px;
    margin: 10px;
    
`

const MovieImage = styled.div`
    width: 129px;
    height: 193px;
    left: 213px;
    top: 177px;
    margin: 10px;
`