export const ViewPage = ({ children, nameID = null, flex, classes='', align=null, justify=null,  }) => {
    return (
        <div id={ nameID } className={ `view-page ${ flex ? 'display-flex' : '' } ${ classes } ${ align ? `align-${ align }` : ''} ${ justify ? `justify-${ justify }` : ''}`} >
            { children }
        </div>
    )
};