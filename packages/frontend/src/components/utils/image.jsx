import { Box } from "./containers";

export const Image = ({ children, nameID=null, src='', alt='', height=null, width=null, classes='', align='self-center', justify='center', text='center' }) => {
    return (
        <Box id={ nameID } height={ height } width={ width } align={ align } justify={ justify } text={ text }>
            <img src={ src } alt={ alt } className={ classes }/>
        </Box>
    );
};