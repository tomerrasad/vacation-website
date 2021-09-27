export const vacationsReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_VACATIONS":
      console.log(action.payload );
      return { ...state, vacations: action.payload };
    default:
      return state;
  }
};
