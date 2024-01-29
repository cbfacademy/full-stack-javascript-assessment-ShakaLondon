import { Link } from "react-router-dom";

export const SVGLink = ({ children, nameID=null, link=null, classes, width=null, height=null, click }) => {
    return (
        <Link id={ nameID } to={ link ? `/${ link }` : '#' } className={`svg-icon-link ${ classes } display-flex justify-center`} style={{ height: height, width: width }} onClick={ click }>
            { children }
        </Link> 
    )
};