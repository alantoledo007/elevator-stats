import {Container, Table as TableStyles} from './styles';

export default function Table ({children, className}) {
    return (
        <Container>
            <TableStyles className={`${className || ''}`} >
                {children}
            </TableStyles>
        </Container>
    )
}

export const TableRow = ({children, className}) => {
    return (
        <tr className={`${className || ''}`}>
            {children}
        </tr>
    )
}