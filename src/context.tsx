import React from "react"

import { ReducerAction } from "./models"

type ContextValue = {
	dispatchFilter: React.Dispatch<ReducerAction>
}


export const Context = React.createContext<ContextValue>({
	dispatchFilter: () => {}, // начальное значение для dispatch
})
