import { Link } from "react-router-dom";

export const SVGLink = ({ children, nameID=null, link, classes, width=null, height=null }) => {
    return (
        <>
        {
        link ?
        <Link id={ nameID } to={ `/${ link }` } className={`svg-icon-link ${ classes } display-flex justify-center`} style={{ height: height, width: width }}>
            { children }
        </Link> 
        : <div id={ nameID } className={`svg-icon-link ${ classes } display-flex justify-center`} style={{ height: height, width: width }} >
            { children }
        </div>
    }
    </>
    )
};