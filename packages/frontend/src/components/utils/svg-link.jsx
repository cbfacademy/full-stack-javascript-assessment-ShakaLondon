import { Link } from "react-router-dom";

export const SVGLink = ({ children, link }) => {
    return (
        <Link to={`/${ link }`} className='svg-icon' >
            { children }
        </Link>
    )
};