import "./Footer.scss";

const Footer = () => (
    <footer className='app-footer'>
        <p className='app-footer__text'>
            &copy; {new Date().getFullYear()} Todos os direitos reservados.
        </p>
    </footer>
);

export default Footer;
