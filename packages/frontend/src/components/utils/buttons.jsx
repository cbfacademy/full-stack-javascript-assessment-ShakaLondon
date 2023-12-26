import { Link } from "react-router-dom";

export const PrimaryButton = ({ children, nameID = null, link = null, fullWidth = false, flex, classes = '' }) => {
    return (
        <Link to={link === null ? null : `./${ link }`}>
            <button id={ nameID } className={`container${ fullWidth && '-full-size' } ${ flex && 'display-flex'} ${ classes + ' primary-button align-center justify-center text-center'} mt-2`}>
                <p5>
                    { children }
                </p5>
            </button>
        </Link>
    )
};