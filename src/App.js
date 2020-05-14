import React from 'react'
import { Route , BrowserRouter as Router, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import FloatCart from './components/FloatCart'
import Checkout from './pages/Checkout'
import CompletedOrder from './pages/CompletedOrder'
import Vegetable from './pages/Vegetable'
import Oil from './pages/Oil'
import Rice from './pages/Rice'
import VegetableDetail from './components/foods/vegetable/Detail'
import RiceDetail from './components/foods/rice/Detail'
import OilDetail from './components/foods/oil/Detail'
import Categories from './pages/Categories'
import TrackID from './pages/TrackID'
import OrderID from './pages/OrderID'
import InvoiceID from './pages/InvoiceID'
// import WishList from './pages/WishList'
import Sidebar from './components/layout/Sidebar'
import Search from './components/Search'
import Default from './pages/Default'

function App() {
  return (
    <React.Fragment>

      <Router>

        <Sidebar />

        <Search />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/invoice/:id" component={InvoiceID} />
          <Route path="/order/:id" component={OrderID} />
          <Route path="/completed/:id" component={CompletedOrder} />
          <Route path="/vegetable/:slug" component={VegetableDetail} />
          <Route path="/rice/:slug" component={RiceDetail} />
          <Route path="/oil/:slug" component={OilDetail} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/category/vegetables" component={Vegetable} />
          <Route path="/category/oils" component={Oil} />
          <Route path="/category/rices" component={Rice} />
          <Route path="/categories" component={Categories} />
          <Route path="/track" component={TrackID} />
          {/* <Route path="/wishlist" component={WishList} /> */}
          <Route component={Default} />
        </Switch>

        <FloatCart />

      </Router>
      
    </React.Fragment>
  )
}

export default App
