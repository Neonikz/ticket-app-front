import { useContext, useEffect } from 'react'
import { UiContext } from '../context/UiContext'

export const useHideMenu = ( occult ) => {

    const { showMenu, hideMenu } = useContext( UiContext );

    useEffect(() => {
        
        occult ? hideMenu() : showMenu() 

    }, [ occult, hideMenu, showMenu ]);

}
