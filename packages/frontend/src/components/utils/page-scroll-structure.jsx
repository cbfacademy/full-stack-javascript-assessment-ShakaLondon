import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { handleScroll, scrollToSection } from "../../hooks/page-scroll-hooks";
import { Container } from "./containers";

export const PageScrollStructure = ({ children, nameID = null }) => {

    const [scrollDirection, setScrollDirection] = useState('right');
    
    const pageViewRef = useRef(null);
    const location = useLocation();
    const path = location.pathname;
    const pathString = path.slice(1);

    useEffect(() => {
        scrollToSection(`${pathString == '' ? 'home' : pathString}-page`)
    }, [pathString]);
    
      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    return (
        <div id={ nameID } className={'container'}>
            { children.map ( ( child, index ) => {
                return (
            <div key={index} ref={pageViewRef} fullSize>
                    {/* <HomePage isActive={path === '/' || path === '/home'} direction={scrollDirection}/> */}
                    { child }
            </div>
                )
            })
}
        </div>
    )
}