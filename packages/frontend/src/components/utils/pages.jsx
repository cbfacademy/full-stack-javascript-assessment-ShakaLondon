export const ViewPage = ({ children, nameID = null, flex }) => {
    return (
        <div id={ nameID } className={ `view-page ${ flex && 'display-flex'}` } >
            { children }
        </div>
    )
};