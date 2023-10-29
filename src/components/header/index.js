import { FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Loguot } from "../../store/modules/authReducer/actions";
import { azulescuro } from "../../config/colors";


// pegar dados de uma ação
import { Nav, DivRotas, LinkStyled, LabelStyled } from "./styled";


export default function Header(){
    const isLoggedIn = useSelector(state => {
        return state.authreducer.isLoggedIn;
    });

    const locationuser = useLocation()
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(Loguot());
    }

    const isActiveRoute = (routePath) => {
        return locationuser.pathname === routePath;
      };    


    return (
        <Nav hidden={!isLoggedIn}>
                <LinkStyled to="/Login" hidden={isLoggedIn}>
                    <DivRotas className={isActiveRoute('/Login') ? 'active' : ''}>
                        <FaSignInAlt size={30} color={azulescuro}/>                
                        <LabelStyled>Login</LabelStyled>
                    </DivRotas>
                </LinkStyled>
                <LinkStyled to="/" hidden={!isLoggedIn}>
                    <DivRotas className={isActiveRoute('/') ? 'active' : ''}>
                        <FaUser size={30} color={azulescuro}/>
                        <LabelStyled>Empresa</LabelStyled>
                    </DivRotas>
                </LinkStyled>
                <LinkStyled onClick={ handleClick } hidden={!isLoggedIn}>
                    <DivRotas >
                        <FaSignOutAlt size={30} color={azulescuro}/>
                        <LabelStyled>Sair</LabelStyled>
                    </DivRotas>
                </LinkStyled>            
        </Nav>
    );
}

