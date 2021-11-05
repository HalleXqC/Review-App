import { NavLink } from 'react-router-dom'
import cls from './Nav.module.scss'

const Nav = ({color}) => {
    return (
        <div className={cls.root}>
            <div className={cls.leftNav}>
                <img src="/magazine.png" alt="logo" />
                <h4 style={color ? {color: `${color}`} : null}>Review App</h4>
            </div>
            <div className={cls.rightNav}>
                <ul>
                    <li>
                        <NavLink exact to="/home" className={cls.link} style={color ? {color: `${color}`} : null}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/reviews" className={cls.link} style={color ? {color: `${color}`} : null}>Reviews</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/movies" className={cls.link} style={color ? {color: `${color}`} : null}>Movies</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/profile" className={cls.link} style={color ? {color: `${color}`} : null}>Profile</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Nav