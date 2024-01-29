import { useEffect, useRef } from "react";
import { usePathString } from "../../hooks/location-path-hooks";
import { scrollToSection } from "../../hooks/page-scroll-hooks";

export const PageScrollStructure = ({ children, nameID = null }) => {
    
    const pageViewRef = useRef(null);

    useEffect(() => {
        scrollToSection(`${ usePathString() == '' ? 'home' : usePathString()}-page`)
    }, [pathString]);

    return (
        <div id={ nameID } className={'page-scroll-structure'}>
            { children.map ( ( child, index ) => {
                return (
            <div key={index} ref={pageViewRef}>
                { child }
            </div>
                )
            })
}
        </div>
    )
}