import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../../components/Card';
import Button from '../../components/Button';
import FormInput from '../../components/FormInput';

const EditOrder = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [customers, setCustomers] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [formData, setFormData] = useState({
    customerId: '',
    status: 'Pending'
  });
  const [orderItems, setOrderItems] = useState([{ dishId: '', quantity: 1 }]);

  useEffect(() => {
    const storedCustomers = localStorage.getItem('customers');
    const storedDishes = localStorage.getItem('dishes');
    const storedOrders = localStorage.getItem('orders');
    
    if (storedCustomers) setCustomers(JSON.parse(storedCustomers));
    if (storedDishes) setDishes(JSON.parse(storedDishes));
    
    if (storedOrders) {
      const orders = JSON.parse(storedOrders);
      const order = orders.find(o => o.id === id);
      if (order) {
        setFormData({
          customerId: order.customerId,
          status: order.status
        });
        setOrderItems(order.items);
      } else {
        navigate('/orders');
      }
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...orderItems];
    newItems[index][field] = value;
    setOrderItems(newItems);
  };

  const addItem = () => {
    setOrderItems([...orderItems, { dishId: '', quantity: 1 }]);
  };

  const removeItem = (index) => {
    if (orderItems.length > 1) {
      setOrderItems(orderItems.filter((_, i) => i !== index));
    }
  };

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => {
      const dish = dishes.find(d => d.id === item.dishId);
      return total + (dish ? dish.price * parseInt(item.quantity || 0) : 0);
    }, 0).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const storedOrders = localStorage.getItem('orders');
    const orders = storedOrders ? JSON.parse(storedOrders) : [];
    
    const updatedOrders = orders.map(order =>
      order.id === id
        ? {
            ...order,
            ...formData,
            items: orderItems.filter(item => item.dishId && item.quantity)
          }
        : order
    );
    
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    navigate('/orders');
  };

  const statusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Preparing', label: 'Preparing' },
    { value: 'Ready', label: 'Ready' },
    { value: 'Delivered', label: 'Delivered' },
    { value: 'Cancelled', label: 'Cancelled' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-slide-up">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Order</h1>
          <p className="text-gray-600">Update order information</p>
        </div>

        <Card className="animate-fade-in">
          <form onSubmit={handleSubmit}>
            <FormInput
              label="Customer"
              type="select"
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
              options={customers.map(c => ({ value: c.id, label: c.name }))}
              required
            />

            <FormInput
              label="Order Status"
              type="select"
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={statusOptions}
              required
            />

            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <label className="block text-gray-700 font-semibold">
                  Order Items <span className="text-red-500">*</span>
                </label>
                <Button type="button" variant="success" onClick={addItem} className="!px-4 !py-2 !text-sm">
                  + Add Item
                </Button>
              </div>

              <div className="space-y-4">
                {orderItems.map((item, index) => (
                  <div key={index} className="flex space-x-3 items-end bg-gray-50 p-4 rounded-lg">
                    <div className="flex-1">
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Dish
                      </label>
                      <select
                        value={item.dishId}
                        onChange={(e) => handleItemChange(index, 'dishId', e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-white"
                      >
                        <option value="">Select Dish</option>
                        {dishes.map(dish => (
                          <option key={dish.id} value={dish.id}>
                            {dish.name} - ${dish.price}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="w-32">
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Quantity
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                      />
                    </div>

                    {orderItems.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-800">Order Total:</span>
                <span className="text-2xl font-bold text-green-600">${calculateTotal()}</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => navigate('/orders')}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1"
              >
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Update Order
                </span>
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default EditOrder;
