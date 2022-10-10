import styled from "styled-components";

export default function TopBar(){
    return(
        <TopBarContainer>
            <Title>Cineflex</Title>
        </TopBarContainer>
    )
}

const TopBarContainer = styled.div`
    index: 10;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 67px;
    background-color: #C3CFD9;
    left: 0px;
    top: 0px;
`

const Title = styled.h1`
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 34px;
    Align: center;
    color: #E8833A;
    line-height: 40px;
    `