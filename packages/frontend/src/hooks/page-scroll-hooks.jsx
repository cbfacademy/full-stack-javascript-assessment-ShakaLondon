import { Navigate } from 'react-router';

export const scrollToSection = ( sectionName ) => {
  
    const section = document.getElementById(`${sectionName}`);

    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    } else {
        return <Navigate to={'./error'} replace={true} />
    }
  };
