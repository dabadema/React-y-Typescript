import { createContext, Dispatch, ReactNode, useReducer } from 'react';

type ActivityProviderProps = {
    children: ReactNode;
};

type ActivityContextProps = {
    state: ActivityState;
    dispatch: Dispatch<ActivityActions>;
};
import {
    ActivityActions,
    activityReducer,
    ActivityState,
    initialState,
} from '../reducers/activity-reducer';

export const ActivityContext = createContext<ActivityContextProps>({} as ActivityContextProps); // Also we can use (null!)

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
    const [state, dispatch] = useReducer(activityReducer, initialState);

    return (
        <ActivityContext.Provider value={{ state, dispatch }}>{children}</ActivityContext.Provider>
    );
};
