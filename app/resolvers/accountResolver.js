import { GET_ACCOUNTS_LOCAL_QUERY } from '../graphql/account';

module.exports = {
  //addProductToCart: (_, { chefId, id, productId, price, name, image, quantity }, { cache }) => {
  addAccounts: (_, {account}, {cache}) => {
    const query = GET_ACCOUNTS_LOCAL_QUERY;
    const data = {userAccounts: account};
    cache.writeQuery({query, data});
    /*const food = {
      id,
      productId,
      price,
      name,
      image,
      quantity,
      __typename: 'FoodItem',
    };
    const product = {id, chefId, kitchenName, food, __typename: 'ProductItem'};

    if (previous.cartItems.length === 0) {
      const data = {cartItems: [product]};
      cache.writeQuery({query, data});
      return {__typename: 'TotalCartItems', totalQuantity: 1};
    }

    const itemExist = previous.cartItems.some(
      (cartItem) => cartItem.chefId === chefId && cartItem.food.id === id,
    );

    let items = 0;
    if (!itemExist) {
      const cartItems = previous.cartItems.concat(product);
      const data = {cartItems: cartItems};
      cache.writeQuery({query, data});
      items = cartItems.length;
    } else {
      const newCartItems = previous.cartItems.filter(
        (cartItem) => !(cartItem.chefId === chefId && cartItem.food.id === id),
      );
      const data = {cartItems: newCartItems};
      cache.writeQuery({query, data});
      items = newCartItems.length;
    }
    return {__typename: 'TotalCartItems', totalQuantity: items};*/
    return null;
  },
};
