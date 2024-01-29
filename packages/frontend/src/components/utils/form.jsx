import { forwardRef, useEffect, useRef, useState } from "react";
import { handleInputClick } from '../../hooks/form-hooks'
import { Box } from "./containers";
import { Text } from "./text";

export const FormGroup = ({ children, nameID=null, onSubmit, height='100%', width='100%', classes='', align=null, justify=null, text=null }) => {
    return (
        <div 
            id={ nameID } 
            className={`form-group container display-flex ${ align ? `align-${ align }` : ''} ${ justify ? `justify-${ justify }` : ''} ${ text ? `text-${ text }` : ''} ${ classes }`}
            style={{ height: height, width: width }}>
            <form onSubmit={ (e) => onSubmit(e) } method="post">
                { children }
            </form>
        </div>
    );
};

export const ImageInput = ({ nameID=null, classes='', addFile }) => {
    return (
        <input id={ nameID } className={`image-input ${ classes } align-center`} type="file" name="image" onChange={(e) => addFile(e)}/>
    );
};

export const FloatingInput = forwardRef(({ nameID=null, inputHeight=null, show, type, placeholder, label, handleChange, value, inputName, isDisabled=false }, ref) => {
    return (
       ( show || value )? <input id={ nameID } disabled={ isDisabled } value={ value } name={ inputName } ref={ ref } className={`input-text`} style={{ height: inputHeight }} type={ type } placeholder={ placeholder } onChange={ (e) => handleChange( e ) }/> : null
    );
});

export const FormInput = ({ nameID=null, inputHeight=null, inputWidth=null, show, inputName, type, placeholder, label, handleChange, value, size, classes }) => {
    return (
        <input id={ nameID } value={ value } name={ inputName } className={`input-${type} ${size} ${classes}`} style={{ height: inputHeight, width: inputWidth }} type={ type } placeholder={ placeholder } onChange={ (e) => handleChange( e )} />
    );
};

export const FormFloatingInput = ({ nameID=null, inputHeight=null, type, placeholder, label, handleChange, inputName, value, isDisabled, classes }) => {
    const inputRef = useRef(null);
    const [show, setShow] = useState(false)

    const toggle = ( e ) => {
        if ( !inputRef.current ) {
            setShow(true)
        }
    }

    const handleClickOutside = ( e ) => {
        if ( inputRef.current && !inputRef.current.contains(e.target) && inputRef.current.value === '') {
            if (!e.target.classList.contains('svg-icon') && !e.target.classList.contains('svg-icon-link') && !e.target.classList.contains('file-upload-input') ) {
            e.preventDefault();
            }
            setShow(false);
        }
      };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
          document.removeEventListener("click", handleClickOutside, false);
        };
      }, []);

    useEffect(() => {
        handleInputClick(inputRef)
      }, [show])

    return (
        <Box  nameID={ nameID } flex align='center' classes='mb-1 input-text-box flex-wrap' onBoxClicked={ ( e ) => { toggle( e ) }}>
        <Text nameID={ `${nameID}-title` }  size={ show ? 'p6' : 'p5'}>{ label }</Text>
            <FloatingInput nameID={ `${nameID}-input` } ref={ inputRef } show={ show } isDisabled={ isDisabled } type={ type } value={ value } inputName={ inputName } placeholder={ placeholder } label={ label } handleChange={ handleChange } classes={ `mt-1 ${classes}` }/>
        </Box>
    );
};