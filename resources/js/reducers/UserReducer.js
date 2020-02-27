// import Stores_Appointment from '../store/appointment';
const UserStats = {
  user : {}
}

const UserReducer = (state = UserStats, action) => {
  switch (action.type) {
    case 'SET_USER':
      // console.log(action)
      state = {
        ...state,
        ...action.data,
      };
      break;
   
  }

  return state;
};

export default UserReducer;
