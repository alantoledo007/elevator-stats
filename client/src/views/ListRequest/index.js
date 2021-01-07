import Button from '../../components/Button';
import Table, {TableRow} from '../../components/Table';

export default function ListRequest({requests, setToDelete}) {
    return (
        <Table>
          <thead>
            <tr>
              <th>Recurrencia</th>
              <th>Horario</th>
              <th>Origen</th>
              <th>Destino</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {requests?.length > 0 && requests.map(item => (
                <TableRow key={item.id}>
                <td>{item.frequency} minutos</td>
                <td>{item.start_time}h a {item.end_time}h</td>
                <td>Plantas: {JSON.parse(item.from).map(i => (
                    <span className="text-xs px-3 py-1 bg-orange-200 text-orange-800 rounded-full mx-1 bg-yellow-300 " key={i}>
                        {i === "0" ? 'Baja' : i}
                    </span>))}
                </td>
                <td>Plantas: {JSON.parse(item.to).map(i => (
                    <span className="text-xs px-3 py-1 bg-orange-200 text-orange-800 rounded-full mx-1 bg-yellow-300 " key={i}>
                        {i === "0" ? 'Baja' : i}
                    </span>))}
                </td>
                <td><Button outline onClick={() => setToDelete(item)}>Borrar</Button></td>
                </TableRow>
            ))}
          </tbody>
        </Table>
    );
}