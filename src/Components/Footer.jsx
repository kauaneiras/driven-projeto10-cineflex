import styled from "styled-components"

export default function Footer(movie) {

    return (
        <FooterDiv>
            <MoviePoster src={movie.image} alt=""/>
            <TextFooter>{movie.title}<br/>{movie.weekday} - {movie.time}</TextFooter>
        </FooterDiv>
    )
}


const FooterDiv = styled.div`
    index: 1;
    position: fixed;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 117px;
    left: 0px;
    bottom: 0px;
    background: #DFE6ED;
    border: 1px solid #9EADBA;
`

const MoviePoster = styled.img`
    width: 64px;
    height: 64px;
    margin-left: 20px;
    margin-right: 20px;
    height: 72px;
    left: 18px;
    bottom: 23px;
`
const TextFooter = styled.p`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 26px;
    line-height: 30px;
    display: flex;
    align-items: center;
    color: #293845;

` 