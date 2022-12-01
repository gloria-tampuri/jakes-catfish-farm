import { Children, createContext,useState} from 'react';

export const ThemeContext = createContext(null);

export const ThemeContextProvider=({children})=>{

    const [theme, setTheme] = useState('light');

    const themeHandler=()=>{
      setTheme(theme==='light' ? 'dark' : 'light')
    }
    return(
        <ThemeContext.Provider value={{theme, themeHandler}}>
          {children}
        </ThemeContext.Provider>
    )
}