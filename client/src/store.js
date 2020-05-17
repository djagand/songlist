import React, { createContext, useContext, useReducer } from "react";
import { initialStates, actions } from './action';

const StoreContext = createContext(initialStates);

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        const update = actions[action.type](state, action.payload);

        return { ...state, ...update };
    }, initialStates);

    return (
        <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>
    )
};

export const useStore = () => {
    const { state, dispatch } = useContext(StoreContext);

    return { state, dispatch };
};
