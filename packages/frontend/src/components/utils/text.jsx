export const Text = ({ children, nameID=null, size, classes='', align=null, justify=null, text=null }) => {
    return (
        <div>
            <p 
                id={ nameID } 
                className={`${ size } ${ align ? `align-${ align }` : ''} ${ justify ? `justify-${ justify }` : ''} ${ text ? `text-${ text }` : ''} ${classes}`}
                >
                { children }
            </p>
        </div>
    );
};