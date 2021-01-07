import styled, {css} from 'styled-components';

export const Input = styled.input`
    ${({type, w}) => (type === 'text' || type === 'password' || type === 'number') && css`
        border-radius: 3px;
        height: 30px;
        box-sizing:border-box;
        padding: 5px;
        width: ${w ? w+'px' : '100%'};
        appearance: none;
        transition: all .4s ease-in;
        border: 1px solid #ccc;
    `}

`;