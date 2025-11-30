import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../../components/Card';
import Button from '../../components/Button';
import FormInput from '../../components/FormInput';

const EditCustomer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const storedCustomers = localStorage.getItem('customers');
    if (storedCustomers) {
      const customers = JSON.parse(storedCustomers);
      const customer = customers.find(c => c.id === id);
      if (customer) {
        setFormData(customer);
      } else {
        navigate('/customers');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const storedCustomers = localStorage.getItem('customers');
    const customers = storedCustomers ? JSON.parse(storedCustomers) : [];
    
    const updatedCustomers = customers.map(customer => 
      customer.id === id ? formData : customer
    );
    
    localStorage.setItem('customers', JSON.stringify(updatedCustomers));
    navigate('/customers');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-slide-up">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Customer</h1>
          <p className="text-gray-600">Update customer information</p>
        </div>

        <Card className="animate-fade-in">
          <form onSubmit={handleSubmit}>
            <FormInput
              label="Customer Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Jane Smith"
              required
            />

            <FormInput
              label="Phone Number"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g., +1 234 567 8900"
              required
            />

            <FormInput
              label="Address"
              type="textarea"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter full address..."
              required
            />

            <div className="flex space-x-4 mt-8">
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => navigate('/customers')}
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
                  Update Customer
                </span>
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default EditCustomer;
