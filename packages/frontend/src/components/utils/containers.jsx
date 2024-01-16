import { forwardRef } from "react";

export const Container = ({ children, nameID=null, size=null, height=null, width=null, flex, classes='', align=null, justify=null, text=null }) => {
    return (
        <div 
            id={ nameID } 
            className={`container ${ size ? `container-full-${size}` : ''} ${ flex ? 'display-flex' : ''} ${ align ? `align-${ align }` : ''} ${ justify ? `justify-${ justify }` : ''} ${ text ? `text-${ text }` : ''} ${classes}`}
            style={{ width: width, height: height }}>
            { children }
        </div>
    );
};

export const PageContainer = ({ children, nameID=null, size=null, height=null, width=null, flex, classes='', align=null, justify=null, text=null }) => {
    return (
        <div 
            id={ nameID } 
            className={`page-container container${ size ? `-full-${size}` : ''} ${ flex ? 'display-flex' : ''} ${ align ? `align-${ align }` : ''} ${ justify ? `justify-${ justify }` : ''} ${ text ? `text-${ text }` : ''} ${classes}`}
            style={{ width: width, height: height }}>
            { children }
        </div>
    );
};

export const Box = ({ children, nameID=null, height=null, width=null, flex, classes='', align=null, justify=null, text=null, onBoxClicked}) => {
    return (
        <div 
            id={ nameID } 
            className={`${ flex ? 'display-inline-flex' : ''} ${ align ? `align-${ align }` : ''} ${ justify ? `justify-${ justify }` : ''} ${ text ? `text-${ text }` : ''} ${classes}`}
            style={{ width: width, height: height }}
            onClick={ onBoxClicked }>
            { children }
        </div>
    );
};

export const BoxRef = forwardRef(({ children, nameID=null, height=null, width=null, flex, classes='', align=null, justify=null, text=null, onBoxClicked}, ref) => {
    return (
        <div 
            id={ nameID } 
            ref={ ref }
            className={`${ flex ? 'display-inline-flex' : ''} ${ align ? `align-${ align }` : ''} ${ justify ? `justify-${ justify }` : ''} ${ text ? `text-${ text }` : ''} ${classes}`}
            style={{ width: width, height: height }}
            onClick={ onBoxClicked }>
            { children }
        </div>
    );
});

export const Column = ({ children, nameID=null, height='100%', small=16, med=16, large=16, flex, classes='', align=null, justify=null, text=null }) => {
    return (
        <div 
            id={ nameID } 
            className={`${ flex ? 'display-inline-flex' : ''} col col-small-${ small } col-med-${ med } col-large-${ large } ${ align ? `align-${ align }` : ''} ${ justify ? `justify-${ justify }` : ''} ${ text ? `text-${ text }` : ''} ${classes}`}
            style={{ height: height }}>
            { children }
        </div>
    );
};
