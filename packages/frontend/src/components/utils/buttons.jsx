import { Link } from "react-router-dom";

export const PrimaryButton = ({ children, nameID = null, link = null, fullWidth = false, flex, classes = '', align = 'center', justify = 'center', text = 'center'  }) => {
    return (
        <Link to={link === null ? null : `./${ link }`}>
            <button id={ nameID } className={`${ flex && 'display-flex'} align-${ align } justify-${ justify } text-${ text } ${classes} mt-2`}>
                <p5>
                    { children }
                </p5>
            </button>
        </Link>
    )
};
