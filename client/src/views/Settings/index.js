import Modal from '../../components/Modal';
import Input from '../../components/Input';
import Button from '../../components/Button';
import FormGroup from '../../components/FormGroup';

import { useForm } from "react-hook-form";

export default function Settings({show, setShow, onClose, change, onChange, currentQuantity}) {

    const { register, handleSubmit,  errors } = useForm();
    
    const onSubmit = data => {
        change(data.quantity)
        if(onChange) onChange();
    };

    return (
        <Modal show={show} setShow={setShow} onClose={onClose}>
            <div className="mb-4">
                <h2>Ajustes</h2>
                <hr/>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <label>Cantidad de ascensores</label>
                    <Input type='number' defaultValue={currentQuantity} name="quantity" ref={register({required:true})} />
                    {errors.quantity?.type === 'required' && <span>This field is required</span>}
                </FormGroup>
                

                <FormGroup>
                    <Button className="w-full mt-8">Guardar petición</Button>
                </FormGroup>
            </form>
        </Modal>
    );
}