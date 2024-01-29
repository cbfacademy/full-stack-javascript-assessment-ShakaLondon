export const handleInputClick = ( inputRef ) => {
    inputRef.current && inputRef.current.focus()
};

// export const handleClickOutside = ( e, inputRef ) => {
//     if ( inputRef.current && !inputRef.current.contains(e.target) && inputRef.current.value === '') {
//         e.preventDefault();
//         console.log(inputRef.current?.value)
//         setShow(false);
//     }
//   };