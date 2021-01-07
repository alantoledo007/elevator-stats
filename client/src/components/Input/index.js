import { forwardRef } from 'react';
import { Input as InputStyle } from './styles';

function Input(props, ref) {
    return <InputStyle {...props} ref={ref} />
}

export default forwardRef(Input)