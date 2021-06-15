import { useParams } from 'react-router-dom'
import { validate as uuidValidate } from 'uuid';

import InvalidMeet from './InvalidMeet'
import ValidMeet from './ValidMeet'

const Meet = () => {
    const { meetId } = useParams(); //get the meetId passed in url as param

    if(uuidValidate(meetId) === false) {
        return InvalidMeet();
    }

    return ValidMeet(meetId);
}

export default Meet
