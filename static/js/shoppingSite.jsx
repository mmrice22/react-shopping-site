function App() {
  // create a state value called melons
  // initial state is an empty object
  const [melons, setMelons] = React.useState({});
  // create state value called shoppingCart and set initial state to empty object
  const [shoppingCart, setShoppingCart] = React.useState({});
  
  // useEffect is a React Hook that makes request to server at /api/melons/
  React.useEffect(() => {
    fetch("/api/melons")
      .then((response) => response.json())
      .then((melonData) => setMelons(melonData));
  }, []);

  function addMelonToCart(melonCode) {
    setShoppingCart((currentShoppingCart) => {
      const newShoppingCart = Object.assign({}, currentShoppingCart);
      // if melonCode already exists in newShoppingCart
      if (newShoppingCart[melonCode]) {
        // increment quanity of that type of melon by 1
        newShoppingCart[melonCode] += 1;
      } else {
        // if that melonCode is not in shopping cart, set its quanity to 1
        newShoppingCart[melonCode] = 1;
      }
      
      return newShoppingCart;
    }) 
  }

  return (
    <ReactRouterDOM.BrowserRouter>
      <Navbar logo="/static/img/watermelon.png" brand="Ubermelon">
        <ReactRouterDOM.NavLink
          to="/shop"
          activeClassName="navlink-active"
          className="nav-link"
        >
          Shop for Melons
        </ReactRouterDOM.NavLink>
        <ReactRouterDOM.NavLink
          to="/cart"
          activeClassName="navlink-active"
          className="nav-link"
        >
          Shopping Cart
        </ReactRouterDOM.NavLink>
      </Navbar>

      <div className="container-fluid">
        <ReactRouterDOM.Route exact path="/">
          <Homepage />
        </ReactRouterDOM.Route>
        <ReactRouterDOM.Route exact path="/shop">
          <AllMelonsPage melons={melons} addMelonToCart={addMelonToCart}/>
        </ReactRouterDOM.Route>
        <ReactRouterDOM.Route exact path="/cart">
          <ShoppingCartPage cart={shoppingCart} melons={melons}/>
        </ReactRouterDOM.Route>
      </div>
    </ReactRouterDOM.BrowserRouter>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
