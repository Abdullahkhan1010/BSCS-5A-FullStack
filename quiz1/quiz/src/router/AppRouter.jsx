import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Dashboard from '../pages/Dashboard';

// Dishes
import DishList from '../modules/dishes/DishList';
import AddDish from '../modules/dishes/AddDish';
import EditDish from '../modules/dishes/EditDish';

// Cooks
import CookList from '../modules/cooks/CookList';
import AddCook from '../modules/cooks/AddCook';
import EditCook from '../modules/cooks/EditCook';

// Customers
import CustomerList from '../modules/customers/CustomerList';
import AddCustomer from '../modules/customers/AddCustomer';
import EditCustomer from '../modules/customers/EditCustomer';

// Orders
import OrderList from '../modules/orders/OrderList';
import AddOrder from '../modules/orders/AddOrder';
import EditOrder from '../modules/orders/EditOrder';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          
          {/* Dishes Routes */}
          <Route path="/dishes" element={<DishList />} />
          <Route path="/dishes/add" element={<AddDish />} />
          <Route path="/dishes/edit/:id" element={<EditDish />} />
          
          {/* Cooks Routes */}
          <Route path="/cooks" element={<CookList />} />
          <Route path="/cooks/add" element={<AddCook />} />
          <Route path="/cooks/edit/:id" element={<EditCook />} />
          
          {/* Customers Routes */}
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customers/add" element={<AddCustomer />} />
          <Route path="/customers/edit/:id" element={<EditCustomer />} />
          
          {/* Orders Routes */}
          <Route path="/orders" element={<OrderList />} />
          <Route path="/orders/add" element={<AddOrder />} />
          <Route path="/orders/edit/:id" element={<EditOrder />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
