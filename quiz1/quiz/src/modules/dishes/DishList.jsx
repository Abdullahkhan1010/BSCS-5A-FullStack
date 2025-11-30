import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

const DishList = () => {
  const [dishes, setDishes] = useState([]);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, dishId: null });
  const navigate = useNavigate();

  useEffect(() => {
    const storedDishes = localStorage.getItem('dishes');
    if (storedDishes) {
      setDishes(JSON.parse(storedDishes));
    }
  }, []);

  const handleDelete = (id) => {
    const updatedDishes = dishes.filter(dish => dish.id !== id);
    setDishes(updatedDishes);
    localStorage.setItem('dishes', JSON.stringify(updatedDishes));
    setDeleteModal({ isOpen: false, dishId: null });
  };

  const openDeleteModal = (id) => {
    setDeleteModal({ isOpen: true, dishId: id });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8 animate-slide-up">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Dish Management</h1>
            <p className="text-gray-600">Manage your restaurant's delicious dishes</p>
          </div>
          <Button onClick={() => navigate('/dishes/add')}>
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Dish
            </span>
          </Button>
        </div>

        {dishes.length === 0 ? (
          <Card className="text-center py-16 animate-fade-in">
            <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No dishes found</h3>
            <p className="text-gray-500 mb-6">Start by adding your first dish to the menu</p>
            <Button onClick={() => navigate('/dishes/add')}>Add Your First Dish</Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {dishes.map((dish) => (
              <Card key={dish.id} className="flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{dish.name}</h3>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {dish.category}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">${dish.price}</div>
                </div>
                
                <p className="text-gray-600 mb-6 flex-grow">{dish.description}</p>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="secondary" 
                    className="flex-1"
                    onClick={() => navigate(`/dishes/edit/${dish.id}`)}
                  >
                    <span className="flex items-center justify-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </span>
                  </Button>
                  <Button 
                    variant="danger" 
                    className="flex-1"
                    onClick={() => openDeleteModal(dish.id)}
                  >
                    <span className="flex items-center justify-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </span>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, dishId: null })}
        title="Confirm Delete"
      >
        <p className="text-gray-700 mb-6">Are you sure you want to delete this dish? This action cannot be undone.</p>
        <div className="flex space-x-4">
          <Button 
            variant="secondary" 
            onClick={() => setDeleteModal({ isOpen: false, dishId: null })}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={() => handleDelete(deleteModal.dishId)}
            className="flex-1"
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default DishList;
