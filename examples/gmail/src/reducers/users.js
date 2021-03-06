import {
  ADD_USER, REMOVE_USER, SHOW_USER, HIDE_USER, HIDE_ALL_USERS,
  REQUEST_FETCH_USER_PRESENCE, SUCCESS_FETCH_USER_PRESENCE, FAILURE_FETCH_USER_PRESENCE
} from '../actions';

export const initial = {
  show: [],
  list: [],
  entities: {}
};

const base = {
  presence: null,
  status: '',
  error: false
};

const handlers = {
  [ADD_USER]: (state, action) => {
    const { name, email } = action.payload;
    if (state.list.indexOf(email) !== -1) {
      return state; // dedup
    }
    return {
      ...state,
      list: [ ...state.list, email ],
      entities: { ...state.entities, [email]: { ...base, name } }
    };
  },
  [REMOVE_USER]: (state, action) => {
    const { email } = action.payload;
    const newState = {
      ...state,
      list: state.list.filter(item => item !== email),
      entities: { ...state.entities }
    };
    delete newState.entities[email];
    return newState;
  },
  [SHOW_USER]: (state, action) => {
    const { email } = action.payload;
    if (state.show.indexOf(email) !== -1) {
      return state; // dedup
    }
    if (state.list.indexOf(email) === -1) {
      return state; // not found
    }
    return {
      ...state,
      show: [ ...state.show, email ]
    };
  },
  [HIDE_USER]: (state, action) => {
    const { email } = action.payload;
    if (state.show.indexOf(email) === -1) {
      return state; // not found
    }
    return {
      ...state,
      show: state.show.filter(item => item !== email)
    };
  },
  [HIDE_ALL_USERS]: (state, action) => {
    return {
      ...state,
      show: []
    };
  },
  [REQUEST_FETCH_USER_PRESENCE]: (state, action) => {
    const { email } = action.payload;
    return {
      ...state,
      entities: {
        ...state.entities,
        [email]: {
          ...state.entities[email],
          status: 'working'
        }
      }
    };
  },
  [SUCCESS_FETCH_USER_PRESENCE]: (state, action) => {
    const { email, presence } = action.payload;
    return {
      ...state,
      entities: {
        ...state.entities,
        [email]: {
          ...state.entities[email],
          presence,
          status: 'done',
          error: false
        }
      }
    };
  },
  [FAILURE_FETCH_USER_PRESENCE]: (state, action) => {
    const { email } = action.payload;
    return {
      ...state,
      entities: {
        ...state.entities,
        [email]: {
          ...state.entities[email],
          status: 'done',
          error: true
        }
      }
    };
  }
};

export default function usersReducer(state = initial, action) {
  const handler = handlers[action.type];
  if (!handler) { return state; }
  return handler(state, action);
};
