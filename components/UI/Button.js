import React, { Children } from 'react'
import classes from './Button.module.css'

const Button = (props) => {
  return (
    <div>
        <button type='submit' className={classes.action}>{props.children}</button>
    </div>
  )
}

export default Button