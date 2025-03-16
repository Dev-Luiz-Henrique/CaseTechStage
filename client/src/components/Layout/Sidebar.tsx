import { NavLink } from "react-router-dom";
import "./Sidebar.scss";

const Sidebar = () => (
    <aside className='app-sidebar'>
        <nav className='app-sidebar__nav'>
            <ul className='app-sidebar__list'>
                <li className='app-sidebar__item'>
                    <NavLink to='/' end className='app-sidebar__link'>
                        Dashboard
                    </NavLink>
                </li>
                <li className='app-sidebar__item'>
                    <NavLink to='/areas' className='app-sidebar__link'>
                        Áreas
                    </NavLink>
                </li>
                <li className='app-sidebar__item'>
                    <NavLink to='/units' className='app-sidebar__link'>
                        Unidades
                    </NavLink>
                </li>
                <li className='app-sidebar__item'>
                    <NavLink to='/processes' className='app-sidebar__link'>
                        Processos
                    </NavLink>
                </li>
                <li className='app-sidebar__item'>
                    <NavLink to='/responsibles' className='app-sidebar__link'>
                        Responsáveis
                    </NavLink>
                </li>
            </ul>
        </nav>
    </aside>
);

export default Sidebar;
