import { Link } from "react-router-dom";
import { Text } from "./text";

export const PrimaryButton = ({ children, nameID = null, link = null, width = null, flex, click, classes = '', align = 'center', justify = 'center', text = 'center'  }) => {
    return (
        <Link to={link === null ? null : `/${ link }`} onClick={ click }>
            <button id={ nameID } className={`${ flex && 'display-flex'} align-${ align } justify-${ justify } text-${ text } ${classes} mt-1`} style={{ width: width }}>
                <Text size='p5'>
                    { children }
                </Text>
            </button>
        </Link>
    )
};
