import {FunctionComponent} from "react";
import {times} from 'lodash';

interface Props {
    stars: number;
}

const Stars: FunctionComponent<Props> = ({stars}) => {
    return (
        <span>
            {
                times(stars, () => '*')
            }
        </span>
    )
};

export default Stars;