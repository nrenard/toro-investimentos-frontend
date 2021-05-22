/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useState,
  useCallback,
  useContext,
  memo,
  useEffect,
} from 'react';

import changeState from 'helpers/changeState';
import { isAuthenticated } from 'helpers/auth';
import actions from './actions';

import { IState, IActions } from './dtos';

export const initialState = {
  loading: false,
  error: null,
  user: null,
};

interface IData {
  data: IState;
  actions: IActions;
}

export const UserContext = React.createContext<IData>({
  data: initialState,
  actions: actions({ data: initialState, changeState: changeState(() => {}) }),
});

export const useUser = (): IData => useContext(UserContext);

export default function withUserProvider(
  WrappedComponent: React.FC,
  state: IState = initialState,
): React.FC {
  const WithUser = (props: any) => {
    const [data, setData] = useState(state);

    const value = useCallback(
      () => ({
        data,
        actions: actions({ data, changeState: changeState(setData) }),
      }),
      [data],
    );

    const dataValue: IData = value();

    useEffect(() => {
      if (isAuthenticated()) dataValue.actions.getUser();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <UserContext.Provider value={dataValue}>
        <WrappedComponent {...props} />
      </UserContext.Provider>
    );
  };

  return memo(WithUser);
}
