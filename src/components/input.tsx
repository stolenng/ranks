import {FunctionComponent} from "react";
import {defaultText} from "../App";

interface Pros {
 onChange: (text: string) => void;
}

const Input: FunctionComponent<Pros> = ({onChange}) => {
    return (
        <input defaultValue={defaultText} style={{width: '650px', margin: '15px'}} onChange={(e) => onChange(e.target.value)} />
    )
};

export default Input;