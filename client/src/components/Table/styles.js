import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    min-width: 180px;
    overflow-x:auto;
`;

export const Table = styled.table`
    width: 100%;
    td{
        text-align: center;
        padding:10px 0;
    }
    tr{
        border-bottom:1px solid #ccc;
    }
`;