export const Container = ({ children, nameID = null, fullWidth = false, flex, classes = '' }) => {
    return (
        <div id={ nameID } className={`container${ fullWidth && '-full-size' } ${ flex && 'display-flex'} ${ classes + 'align-center justify-center text-center' }`}>
            { children }
        </div>
    )
};