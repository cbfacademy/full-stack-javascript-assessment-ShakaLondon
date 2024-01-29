import { Navigate, useLocation } from 'react-router';

export const usePathString = () => {
    const location = useLocation();
    const path = location.pathname;
    const pathString = path.split("/").pop()
     
    return pathString;
};

export const navigateTo = ( pathName ) => {
    return <Navigate to={`/${ pathName }`} replace={true} />
}