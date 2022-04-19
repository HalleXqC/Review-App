import { NavLink } from 'react-router-dom'
import cls from './Nav.module.scss'

const Nav = ({color}) => {

    const links = [
        {
            route: '/',
            value: 'Home',
            id: 1,
        },
        {
            route: '/reviews',
            value: 'Reviews',
            id: 2,
        },
        {
            route: '/movies',
            value: 'Movies',
            id: 3,
        },
        {
            route: '/profile',
            value: 'Profile',
            id: 4,
        }
    ]

    return (
        <div className={cls.root}>
            <div className={cls.leftNav}>
                <img src="/magazine.png" alt="logo" />
                <h4 style={color ? {color: `${color}`} : null}>Review App</h4>
            </div>
            <div className={cls.rightNav}>
                <ul>
                    {
                        links.map(item => (
                            <li key={item.id}>
                                <NavLink 
                                  exact 
                                  to={item.route} 
                                  className={cls.link} 
                                  activeClassName={cls.active} 
                                  style={color ? {color: `${color}`} : null}
                                >
                                  {item.value}
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Nav