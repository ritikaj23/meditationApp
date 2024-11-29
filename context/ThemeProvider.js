import React, { createContext, useContext, useState } from "react";


const ThemeContext = createContext();

// Step 2: Build the theme provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

 
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


export const useTheme = () => {
  return useContext(ThemeContext);
};
