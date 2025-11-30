import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import Button from '../../components/Button';
import FormInput from '../../components/FormInput';

const AddDish = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: ''
  });

  const categories = [
    { value: 'Appetizer', label: 'Appetizer' },
    { value: 'Main Course', label: 'Main Course' },
    { value: 'Dessert', label: 'Dessert' },
    { value: 'Beverage', label: 'Beverage' },
    { value: 'Salad', label: 'Salad' },
    { value: 'Soup', label: 'Soup' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const storedDishes = localStorage.getItem('dishes');
    const dishes = storedDishes ? JSON.parse(storedDishes) : [];
    
    const newDish = {
      id: Date.now().toString(),
      ...formData,
      price: parseFloat(formData.price)
    };
    
    dishes.push(newDish);
    localStorage.setItem('dishes', JSON.stringify(dishes));
    
    navigate('/dishes');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-slide-up">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Add New Dish</h1>
          <p className="text-gray-600">Create a new dish for your menu</p>
        </div>

        <Card className="animate-fade-in">
          <form onSubmit={handleSubmit}>
            <FormInput
              label="Dish Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Grilled Salmon"
              required
            />

            <FormInput
              label="Price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              required
            />

            <FormInput
              label="Category"
              type="select"
              name="category"
              value={formData.category}
              onChange={handleChange}
              options={categories}
              required
            />

            <FormInput
              label="Description"
              type="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the dish..."
              required
            />

            <div className="flex space-x-4 mt-8">
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => navigate('/dishes')}
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
                  Save Dish
                </span>
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AddDish;
