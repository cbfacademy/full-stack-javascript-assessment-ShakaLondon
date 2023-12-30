export const Container = ({ children, nameID=null, size=null, height=null, width=null, flex, classes='', align='center', justify='center', text='center' }) => {
    return (
        <div 
            id={ nameID } 
            className={`container${ size ? `-full-${size}` : ''} ${ flex ? 'display-flex' : ''} align-${ align } justify-${ justify } text-${ text } ${classes}`}
            style={{ width: width, height: height }}>
            { children }
        </div>
    );
};

export const Box = ({ children, nameID=null, height=null, width=null, flex, classes='', align='center', justify='center', text='center' }) => {
    return (
        <div 
            id={ nameID } 
            className={`${ flex ? 'display-inline-flex' : ''} align-${ align } justify-${ justify } text-${ text } ${classes}`}
            style={{ width: width, height: height }}>
            { children }
        </div>
    );
};