import styled from 'styled-components';

export const Backdrop = styled.div`
    background-color: rgba(0,0,0, .5);
    width: 100vw;
    height: 100vh;
    position: fixed;
`;

export const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    position:fixed;
`;

export const Container = styled.div`
    width: 100%;
    margin: 0 15px;
    min-width: 240px;
    max-width: 400px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 3px 0px #555;
    box-sizing: border-box;
    padding: 20px;
    z-index: 1;
    position:relative;
    max-height: 95vh;
    overflow-y:auto;
`;

export const Button = styled.button`
    position: absolute;
    right: 10px;
    top: 10px;
    width: 25px;
    height: 25px;
    border-radius: 12.5px;
    display: inline-block;
    box-sizing: border-box;
    &:focus{
        outline:none;
    }
    &:hover{
        background-color: #ccc;
    }
`;