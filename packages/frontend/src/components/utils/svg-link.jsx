import { Link } from "react-router-dom";

export const SVGLink = ({ children, nameID=null, link }) => {
    return (
        <Link id={ nameID } to={`/${ link }`} className='svg-icon-link' >
            { children }
        </Link>
    )
};