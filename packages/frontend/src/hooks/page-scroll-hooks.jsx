import { Navigate, useLocation } from 'react-router';

export const location = useLocation();
export const path = location.pathname;
export const pathString = path.slice(1);

export const scrollToSection = ( sectionName ) => {
    const section = document.getElementById(`${sectionName}`);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    } else {
        return <Navigate to={'./error'} replace={true} />
    }
  };

export const handleScroll = () => {
    const currentScroll = window.scrollX;
    const previousScroll = window.scrollX;
    setScrollDirection(currentScroll > previousScroll ? 'left' : 'right');
  };