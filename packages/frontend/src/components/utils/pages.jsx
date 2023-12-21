export const ViewPage = ({ children, name }) => {
    return (
        <div id={`${ name }`} className='view-page'>
            { children }
        </div>
    )
};