import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, orderId: null });
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrders = localStorage.getItem('orders');
    const storedCustomers = localStorage.getItem('customers');
    const storedDishes = localStorage.getItem('dishes');
    
    if (storedOrders) setOrders(JSON.parse(storedOrders));
    if (storedCustomers) setCustomers(JSON.parse(storedCustomers));
    if (storedDishes) setDishes(JSON.parse(storedDishes));
  }, []);

  const getCustomerName = (customerId) => {
    const customer = customers.find(c => c.id === customerId);
    return customer ? customer.name : 'Unknown';
  };

  const getDishName = (dishId) => {
    const dish = dishes.find(d => d.id === dishId);
    return dish ? dish.name : 'Unknown';
  };

  const calculateTotal = (orderItems) => {
    return orderItems.reduce((total, item) => {
      const dish = dishes.find(d => d.id === item.dishId);
      return total + (dish ? dish.price * item.quantity : 0);
    }, 0).toFixed(2);
  };

  const handleDelete = (id) => {
    const updatedOrders = orders.filter(order => order.id !== id);
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    setDeleteModal({ isOpen: false, orderId: null });
  };

  const openDeleteModal = (id) => {
    setDeleteModal({ isOpen: true, orderId: id });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Preparing': return 'bg-blue-100 text-blue-800';
      case 'Ready': return 'bg-green-100 text-green-800';
      case 'Delivered': return 'bg-purple-100 text-purple-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8 animate-slide-up">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Order Management</h1>
            <p className="text-gray-600">Manage customer orders efficiently</p>
          </div>
          <Button onClick={() => navigate('/orders/add')}>
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Order
            </span>
          </Button>
        </div>

        {orders.length === 0 ? (
          <Card className="text-center py-16 animate-fade-in">
            <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No orders found</h3>
            <p className="text-gray-500 mb-6">Start by creating your first order</p>
            <Button onClick={() => navigate('/orders/add')}>Create Your First Order</Button>
          </Card>
        ) : (
          <div className="space-y-4 animate-fade-in">
            {orders.map((order) => (
              <Card key={order.id} className="hover:shadow-2xl">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <h3 className="text-xl font-bold text-gray-900 mr-3">
                        Order #{order.id.slice(-6)}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-gray-700">
                        <span className="font-semibold">Customer:</span> {getCustomerName(order.customerId)}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Order Items:</h4>
                      <ul className="space-y-2">
                        {order.items.map((item, index) => (
                          <li key={index} className="flex justify-between text-gray-700">
                            <span>{getDishName(item.dishId)} × {item.quantity}</span>
                            <span className="font-medium">
                              ${((dishes.find(d => d.id === item.dishId)?.price || 0) * item.quantity).toFixed(2)}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="border-t mt-3 pt-3 flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span className="text-green-600">${calculateTotal(order.items)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    <Button 
                      variant="secondary" 
                      onClick={() => navigate(`/orders/edit/${order.id}`)}
                      className="!px-4 !py-2"
                    >
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </span>
                    </Button>
                    <Button 
                      variant="danger" 
                      onClick={() => openDeleteModal(order.id)}
                      className="!px-4 !py-2"
                    >
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </span>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, orderId: null })}
        title="Confirm Delete"
      >
        <p className="text-gray-700 mb-6">Are you sure you want to delete this order? This action cannot be undone.</p>
        <div className="flex space-x-4">
          <Button 
            variant="secondary" 
            onClick={() => setDeleteModal({ isOpen: false, orderId: null })}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={() => handleDelete(deleteModal.orderId)}
            className="flex-1"
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default OrderList;
