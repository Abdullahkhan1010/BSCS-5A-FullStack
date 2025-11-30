import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

const CookList = () => {
  const [cooks, setCooks] = useState([]);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, cookId: null });
  const navigate = useNavigate();

  useEffect(() => {
    const storedCooks = localStorage.getItem('cooks');
    if (storedCooks) {
      setCooks(JSON.parse(storedCooks));
    }
  }, []);

  const handleDelete = (id) => {
    const updatedCooks = cooks.filter(cook => cook.id !== id);
    setCooks(updatedCooks);
    localStorage.setItem('cooks', JSON.stringify(updatedCooks));
    setDeleteModal({ isOpen: false, cookId: null });
  };

  const openDeleteModal = (id) => {
    setDeleteModal({ isOpen: true, cookId: id });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8 animate-slide-up">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Cook Management</h1>
            <p className="text-gray-600">Manage your talented kitchen staff</p>
          </div>
          <Button onClick={() => navigate('/cooks/add')}>
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Cook
            </span>
          </Button>
        </div>

        {cooks.length === 0 ? (
          <Card className="text-center py-16 animate-fade-in">
            <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No cooks found</h3>
            <p className="text-gray-500 mb-6">Start by adding your first cook to the team</p>
            <Button onClick={() => navigate('/cooks/add')}>Add Your First Cook</Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {cooks.map((cook) => (
              <Card key={cook.id} className="flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {cook.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gray-900">{cook.name}</h3>
                    <p className="text-sm text-gray-500">{cook.experience} years experience</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                    {cook.specialty}
                  </span>
                  <span className={`ml-2 inline-block px-3 py-1 text-sm font-medium rounded-full ${
                    cook.availability === 'Available' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {cook.availability}
                  </span>
                </div>
                
                <div className="flex space-x-2 mt-auto">
                  <Button 
                    variant="secondary" 
                    className="flex-1"
                    onClick={() => navigate(`/cooks/edit/${cook.id}`)}
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
                    onClick={() => openDeleteModal(cook.id)}
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
        onClose={() => setDeleteModal({ isOpen: false, cookId: null })}
        title="Confirm Delete"
      >
        <p className="text-gray-700 mb-6">Are you sure you want to delete this cook? This action cannot be undone.</p>
        <div className="flex space-x-4">
          <Button 
            variant="secondary" 
            onClick={() => setDeleteModal({ isOpen: false, cookId: null })}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={() => handleDelete(deleteModal.cookId)}
            className="flex-1"
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CookList;
