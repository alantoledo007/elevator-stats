import Modal from '../../components/Modal';
import Input from '../../components/Input';
import Button from '../../components/Button';
import FormGroup from '../../components/FormGroup';

import { useForm } from "react-hook-form";

export default function CreateRequest({show, setShow, onClose, create, onCreate}) {

    const { register, handleSubmit,  errors } = useForm();
    
    const onSubmit = data => {
        create(data)
        .then(() => {
            if(onCreate) onCreate();
        })
    };

    return (
        <Modal show={show} setShow={setShow} onClose={onClose}>
            <div className="mb-4">
                <h2>Nueva Petición</h2>
                <hr/>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <label>Recurrencia de petición (minútos)</label>
                    <Input type='number' name="frequency" ref={register({required:true})} />
                    {errors.frequency?.type === 'required' && <span>This field is required</span>}
                </FormGroup>
                <FormGroup>
                    <label>Hora inicial (decimales)</label>
                    <Input type='number' name="start_time" step="any" ref={register({required:true})} />
                    {errors.start_time?.type === 'required' && <span>This field is required</span>}
                </FormGroup>
                <FormGroup>
                    <label>Hora final (decimales)</label>
                    <Input type='number' name="end_time" step="any" ref={register({required:true})} />
                    {errors.end_time?.type === 'required' && <span>This field is required</span>}
                </FormGroup>
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                        <FormGroup>
                        <label>Desde:</label>
                        <br/>
                        <label>
                            <Input name="from[]" defaultValue="0" type='checkbox' ref={register({required:true})} />
                            {errors.from?.type === 'required' && <span>This field is required</span>}
                            Planta baja
                        </label>
                        <br/>
                        <label>
                            <Input type='checkbox' name="from[]" defaultValue="1" ref={register({required:true})}/>
                            {errors.from?.type === 'required' && <span>This field is required</span>}
                            Planta 1
                        </label>
                        <br/>
                        <label>
                            <Input type='checkbox' name="from[]" defaultValue="2" ref={register({required:true})}/>
                            {errors.from?.type === 'required' && <span>This field is required</span>}
                            Planta 2
                        </label>
                        <br/>
                        <label>
                            <Input type='checkbox' name="from[]" defaultValue="3" ref={register({required:true})}/>
                            {errors.from?.type === 'required' && <span>This field is required</span>}
                            Planta 3
                        </label>
                        </FormGroup>
                    </div>

                    <div className="col-span-1">
                        <FormGroup>
                            <label>Hasta:</label>
                            <br/>
                            <label>
                                <Input name="to[]" defaultValue="0" type='checkbox' defaultValue="0" ref={register({required:true})} />
                                {errors.to?.type === 'required' && <span>This field is required</span>}
                                Planta baja
                            </label>
                            <br/>
                            <label>
                                <Input type='checkbox' name="to[]" defaultValue="1" ref={register({required:true})}/>
                                {errors.to?.type === 'required' && <span>This field is required</span>}
                                Planta 1
                            </label>
                            <br/>
                            <label>
                                <Input type='checkbox' name="to[]" defaultValue="2" ref={register({required:true})}/>
                                {errors.to?.type === 'required' && <span>This field is required</span>}
                                Planta 2
                            </label>
                            <br/>
                            <label>
                                <Input type='checkbox' name="to[]" defaultValue="3" ref={register({required:true})}/>
                                {errors.to?.type === 'required' && <span>This field is required</span>}
                                Planta 3
                            </label>
                        </FormGroup>
                    </div>

                </div>

                <FormGroup>
                    <Button className="w-full mt-8">Guardar petición</Button>
                </FormGroup>
            </form>
        </Modal>
    );
}