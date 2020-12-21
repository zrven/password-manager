const Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_STATE':
      return {
        ...state,
        username: action.payload.username,
        vaultToken: action.payload.vaultToken,
      };
    case 'SET_USER':
      return {
        ...state,
        username: action.payload,
      };
    case 'SET_VAULT_TOKEN':
      return {
        ...state,
        vaultToken: action.payload,
      };
    case 'SET_DEVICE_TOKEN':
      return {
        ...state,
        deviceToken: action.payload,
      };
    case 'MESSAGE':
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
