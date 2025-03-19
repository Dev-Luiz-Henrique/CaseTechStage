import Logo from "../../assets/images/logo.svg";
import "./Header.scss";

const Header = () => (
    <header className='app-header'>
        <img src={Logo} alt='Logo' className='app-header__logo' />
        <h1 className='app-header__title'>TECH CASE</h1>
    </header>
);

export default Header;
