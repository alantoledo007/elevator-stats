import Modal from '../../components/Modal';
import Button from '../../components/Button';

export default function EditModal({show, setShow, onClose, data, destroy, onDestroy}) {

    const handleDelete = () => {
        destroy(data.id)
        .then(() => {
            if(onDestroy) onDestroy();
        });
    }

    const handleClose = () => {
        setShow(false);
        if(onClose) onClose();
    }

    return (
        <Modal show={show} setShow={setShow} onClose={onClose}>
            <div className="mb-4">
                <h2>Borrar Petición</h2>
                <hr/>
            </div>
            <p>¿Estás seguro que desea borrar esta petición del sistema?</p>

            <div className="flex justify-between">
                <Button onClick={handleDelete}>Si, Borrar</Button>
                <Button outline onClick={handleClose}>Cancelar</Button>
            </div>
        </Modal>
    );
}