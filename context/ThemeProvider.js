import React, { createContext, useContext, useState } from "react";


const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

 
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      console.log("Toggling theme to:", newTheme); 
      return newTheme;
    });
  };
  

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
      throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
  };
  
