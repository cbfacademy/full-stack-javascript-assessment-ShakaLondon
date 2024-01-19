import { Box } from "./containers";

export const Image = ({ children, nameID=null, src='', alt='', height=null, boxHeight=null, width=null, boxWidth=null, classes='', imgClasses='', align=null, justify=null, ref=null }) => {
    return (
        <Box id={ nameID } height={ boxHeight } width={ boxWidth } classes={ `${classes} ${ align ? `align-${ align }` : ''} ${ justify ? `justify-${ justify }` : ''}`} >
            <img src={ src } alt={ alt } className={ imgClasses } style={{ height: height, width: width }} ref={ref}/>
        </Box>
    );
};