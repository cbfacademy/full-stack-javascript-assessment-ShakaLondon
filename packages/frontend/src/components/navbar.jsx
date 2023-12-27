import { Container } from "./utils/containers";
import { ReactComponent as CircleArrowLeft } from '../assets/svg/circle-arrow-left.svg'
import { ReactComponent as MenuBars } from '../assets/svg/menu-bars.svg'

export const Navbar = () => {
    return (
            <Container flex size='width' height='5rem' justify='between' classes='bg-grey-one fixed'>
                <CircleArrowLeft style={{ height: '2rem', width: '2rem' }}/>
                <MenuBars style={{ height: '2rem', width: '2rem' }}/>
            </Container>
    )
};