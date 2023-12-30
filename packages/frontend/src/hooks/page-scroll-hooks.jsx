import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router';
import { profileOpen } from '../redux/slices/app-state-slice';
import { usePathString } from './location-path-hooks';
import { useAppDispatch } from './redux-hooks';

export const scrollToSection = ( sectionName ) => {
  
    const section = document.getElementById(`${sectionName}`);

    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    } else {
        return <Navigate to={'./error'} replace={true} />
    }
  };
