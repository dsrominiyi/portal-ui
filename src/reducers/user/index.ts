import mockData from '../../../__mocks__/mock-data.json';

export const initialState: User = mockData.users[0];

const actionHandler: ActionHandler = {
  USER_UPDATE_NAME: (state: ReducerState, { payload }: Action) => {
    return {
      ...state,
      user: {
        ...state.user,
        username: payload
      }
    };
  }
};

export default (state = initialState as ReducerState, action: Action) => {
  return actionHandler[action.type] ? actionHandler[action.type](state, action) : state;
};
