import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import Button from '../../components/Button';
import FormInput from '../../components/FormInput';

const AddCook = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    experience: '',
    availability: ''
  });

  const specialties = [
    { value: 'Italian Cuisine', label: 'Italian Cuisine' },
    { value: 'Chinese Cuisine', label: 'Chinese Cuisine' },
    { value: 'French Cuisine', label: 'French Cuisine' },
    { value: 'Mexican Cuisine', label: 'Mexican Cuisine' },
    { value: 'Indian Cuisine', label: 'Indian Cuisine' },
    { value: 'Japanese Cuisine', label: 'Japanese Cuisine' },
    { value: 'Pastry & Desserts', label: 'Pastry & Desserts' },
    { value: 'Grilling & BBQ', label: 'Grilling & BBQ' },
  ];

  const availabilityOptions = [
    { value: 'Available', label: 'Available' },
    { value: 'Unavailable', label: 'Unavailable' },
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
    
    const storedCooks = localStorage.getItem('cooks');
    const cooks = storedCooks ? JSON.parse(storedCooks) : [];
    
    const newCook = {
      id: Date.now().toString(),
      ...formData,
      experience: parseInt(formData.experience)
    };
    
    cooks.push(newCook);
    localStorage.setItem('cooks', JSON.stringify(cooks));
    
    navigate('/cooks');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-slide-up">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Add New Cook</h1>
          <p className="text-gray-600">Add a new cook to your team</p>
        </div>

        <Card className="animate-fade-in">
          <form onSubmit={handleSubmit}>
            <FormInput
              label="Cook Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., John Doe"
              required
            />

            <FormInput
              label="Specialty"
              type="select"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              options={specialties}
              required
            />

            <FormInput
              label="Experience (Years)"
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="0"
              required
            />

            <FormInput
              label="Availability"
              type="select"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              options={availabilityOptions}
              required
            />

            <div className="flex space-x-4 mt-8">
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => navigate('/cooks')}
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
                  Save Cook
                </span>
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AddCook;
