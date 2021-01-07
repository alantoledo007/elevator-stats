import { useEffect, useState } from 'react';
import Calculator from '../../Calculator';
import Modal from '../../components/Modal';

export default function Settings({show, setShow, onClose, elevators, requests }) {

    const [report, setReport] = useState({});
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const calc = new Calculator();
        calc.createElevators(elevators);
        calc.loadRequests(requests);
        calc.grace();
        setTotal(calc.getTotal());
        setReport(calc.data);
    },[elevators, requests, setReport]);

    return (
        <Modal show={show} setShow={setShow} onClose={onClose}>
            <div className="mb-4">
                <h2>Reporte calculado</h2>
                <hr/>
            </div>

            {Object.values(report).map((item, key) => (
                <div key={key} className="shadow-lg mb-4 p-2 bg-gray-200 rounded-md">
                    <h4>Ascensor {key+1}</h4>
                    <span className="text-xs px-3 py-1 bg-orange-200 text-orange-800 rounded-full bg-green-300">
                        {item.levels} plantas recorridas
                    </span>
                </div>
            ))}

            <div className="mt-2">
                <h2>{total}</h2>
                <span>Total de plantas recorridas</span>
            </div>
            
        </Modal>
    );
}