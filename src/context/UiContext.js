import React,{ createContext, useState } from 'react';

export const UiContext = createContext();

export const UiProvider = ({ children }) => {

    const [occultMenu, setHideMenu] = useState(false);

    const showMenu = () => {
        setHideMenu( false );
    }

    const hideMenu = () => {
        setHideMenu( true );
    }

    return (
        
        <UiContext.Provider value={{
            occultMenu,
            showMenu,
            hideMenu
        }}>
            { children }
        </UiContext.Provider>

    )
}
