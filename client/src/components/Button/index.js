import {Fill, Outline, FillLink, OutlineLink} from './styles';

export default function Button(props){
    const componentHandler = ({link, outline}) => {
        let links = {
            fill: FillLink,
            outline: OutlineLink
        }
        let buttons = {
            fill: Fill,
            outline: Outline
        }

        if(link){
            return outline ? links.outline : links.fill;
        }
        return outline ? buttons.outline : buttons.fill;
    }

    const Comp = componentHandler(props);
    return <Comp {...props} />
}