import { Link } from "react-router-dom";
import { Text } from '../../components/utils/text'

export const PrimaryButton = ({ children, nameID = null, link = null, fullWidth = false, flex, classes = '', align = 'center', justify = 'center', text = 'center'  }) => {
    return (
        <Link to={link === null ? null : `/${ link }`}>
            <button id={ nameID } className={`${ flex && 'display-flex'} align-${ align } justify-${ justify } text-${ text } ${classes} mt-2`}>
                <Text>
                    { children }
                </Text>
            </button>
        </Link>
    )
};
