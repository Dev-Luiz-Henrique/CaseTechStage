import Logo from "../../assets/react.svg";
import "./Header.scss";

const Header = () => (
    <header className='app-header'>
        <img src={Logo} alt='Logo' className='app-header__logo' />
        <h1 className='app-header__title'>Tech Case</h1>
    </header>
);

export default Header;
