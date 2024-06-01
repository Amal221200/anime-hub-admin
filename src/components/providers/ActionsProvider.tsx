"use client"
import { ActionsProviderType, ActionsType } from '@/lib/types'
import { createContext } from 'react'


export const ActionsContext = createContext<ActionsProviderType | undefined>(undefined)


const ActionsProvider = ({ children, actions }: { children: React.ReactNode, actions: ActionsType }) => {
    return (
        <ActionsContext.Provider value={{ actions }}>
            {children}
        </ActionsContext.Provider>
    )
}

export default ActionsProvider