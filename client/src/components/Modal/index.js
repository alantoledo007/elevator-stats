import { Backdrop, Wrapper, Container, Button } from './styles';

export default function Modal({children, show, setShow, onClose}){
    const closeModal = () => {
        setShow(false);
        if(onClose) onClose();
    }

    if(!show) return null;
    return (
        <Wrapper>
            <Container>
                <Button onClick={closeModal}>&times;</Button>
                {children}
            </Container>
            <Backdrop onClick={closeModal} />
        </Wrapper>
    );
}