import {GET_CART_ITEMS_QUERY, GET_SIGNIN_USER_QUERY} from '../graphql';
import {setStoreData} from '../utils/storage';

module.exports = {
  signinUser: (_, {user}, {cache}) => {
    const {
      id,
      userId,
      token,
      isLoggedIn,
      firstName,
      lastName,
      signedupRole,
    } = user;
    const query = GET_SIGNIN_USER_QUERY;
    //let previous = cache.readQuery({query});
    const data = {
      signinUser: {
        token: token,
        isLoggedIn: isLoggedIn,
        id: id,
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        signedupRole: signedupRole,
        __typename: 'SigninUser',
      },
    };
    cache.writeQuery({query, data});
    setStoreData('@user', data.signinUser);
    const productQuery = GET_CART_ITEMS_QUERY;
    let {cartItems} = cache.readQuery({query});
    if (cartItems) {
      const temp = {cartItems: []};
      cache.writeQuery({productQuery, data: temp});
    }
    return null;
  },
};
