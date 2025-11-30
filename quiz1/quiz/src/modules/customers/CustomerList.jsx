import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, customerId: null });
  const navigate = useNavigate();

  useEffect(() => {
    const storedCustomers = localStorage.getItem('customers');
    if (storedCustomers) {
      setCustomers(JSON.parse(storedCustomers));
    }
  }, []);

  const handleDelete = (id) => {
    const updatedCustomers = customers.filter(customer => customer.id !== id);
    setCustomers(updatedCustomers);
    localStorage.setItem('customers', JSON.stringify(updatedCustomers));
    setDeleteModal({ isOpen: false, customerId: null });
  };

  const openDeleteModal = (id) => {
    setDeleteModal({ isOpen: true, customerId: id });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8 animate-slide-up">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Customer Management</h1>
            <p className="text-gray-600">Manage your valued customers</p>
          </div>
          <Button onClick={() => navigate('/customers/add')}>
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Customer
            </span>
          </Button>
        </div>

        {customers.length === 0 ? (
          <Card className="text-center py-16 animate-fade-in">
            <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No customers found</h3>
            <p className="text-gray-500 mb-6">Start by adding your first customer</p>
            <Button onClick={() => navigate('/customers/add')}>Add Your First Customer</Button>
          </Card>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in">
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td>
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                            {customer.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-semibold text-gray-900">{customer.name}</span>
                        </div>
                      </td>
                      <td className="text-gray-700">{customer.phone}</td>
                      <td className="text-gray-600">{customer.address}</td>
                      <td>
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => navigate(`/customers/edit/${customer.id}`)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => openDeleteModal(customer.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, customerId: null })}
        title="Confirm Delete"
      >
        <p className="text-gray-700 mb-6">Are you sure you want to delete this customer? This action cannot be undone.</p>
        <div className="flex space-x-4">
          <Button 
            variant="secondary" 
            onClick={() => setDeleteModal({ isOpen: false, customerId: null })}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={() => handleDelete(deleteModal.customerId)}
            className="flex-1"
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CustomerList;
