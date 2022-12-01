import React,{useContext}from 'react'
import { ThemeContext } from '../../context/theme'



const Layout = ({children}) => {
    const theme =useContext(ThemeContext)
    console.log(theme);
    
  return (
    <div className={theme.theme}>
        {children}
    </div>
  )
}

export default Layout