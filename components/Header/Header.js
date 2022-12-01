import React,{useContext} from 'react'
import classes from './Header.module.css'
import {FaMoon} from 'react-icons/fa'
import {CiLight} from 'react-icons/ci'
import { ThemeContext } from '../../context/theme'

const Header = () => {
  const theme = useContext(ThemeContext)


  return (
    <div className={classes.header}>
    <div className={classes.forpad}>
    <h1>HOMEWELL</h1>
     <div onClick={theme.themeHandler} className={classes.darkcontrol}>
      <div className={classes.icon}>{theme.theme ==='light' ? <FaMoon/>:<CiLight className={classes.CiLight}/>}</div>  
      <p>{theme.theme === 'light' ? 'Dark Mode' : 'Light Mode'}</p>
     </div>
    </div>
    </div>
  )
}

export default Header