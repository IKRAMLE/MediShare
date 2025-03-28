import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { User, Settings as SettingsIcon, Package, LogOut, Save } from 'lucide-react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const Settings = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notifyNewRentals: true,
    notifyMessages: true,
    notifyUpdates: false,
    darkMode: false
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setIsLoggedIn(true);
      setUserData(parsedUser);
      setFormData(prev => ({
        ...prev,
        name: parsedUser.name || '',
        email: parsedUser.email || ''
      }));
    } else {
      // Redirect to login if not logged in
      navigate('/login2');
      // Toast message would be here
      alert("Authentification requise. Veuillez vous connecter pour accéder aux paramètres");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    // Toast message would be here
    alert("Vous avez été déconnecté avec succès");
    navigate('/login2');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSwitchChange = (name, checked) => {
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update user data in localStorage
    if (userData) {
      const updatedUser = {
        ...userData,
        name: formData.name,
        email: formData.email,
        settings: {
          notifyNewRentals: formData.notifyNewRentals,
          notifyMessages: formData.notifyMessages,
          notifyUpdates: formData.notifyUpdates,
          darkMode: formData.darkMode
        }
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUserData(updatedUser);
      
      // Toast message would be here
      alert("Vos paramètres ont été mis à jour avec succès");
    }
  };

  if (!isLoggedIn || !userData) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen flex flex-col mt-10">
      <Header/>
      
      <div className="flex-grow py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#f0f7ff]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex flex-col items-center mb-8">
                <div className="h-24 w-24 rounded-full bg-[#108de4] flex items-center justify-center text-white text-3xl mb-4">
                  <User size={40} />
                </div>
                <h2 className="text-xl font-bold text-[#084b88]">{userData.email}</h2>
                <p className="text-[#0070cc]">Membre depuis {new Date().toLocaleDateString()}</p>
              </div>
              
              <div className="space-y-2">
                <Link 
                  to="/profile" 
                  className="flex items-center p-3 rounded-lg text-[#0070cc] hover:bg-[#f0f7ff] transition-colors"
                >
                  <User className="h-5 w-5 mr-3" />
                  Profil
                </Link>
                <Link 
                  to="/dashboard" 
                  className="flex items-center p-3 rounded-lg text-[#0070cc] hover:bg-[#f0f7ff] transition-colors"
                >
                  <Package className="h-5 w-5 mr-3" />
                  Mes Produits
                </Link>
                <Link 
                  to="/settings" 
                  className="flex items-center p-3 rounded-lg text-[#0070cc] bg-[#f0f7ff] hover:bg-[#e0f0fe] transition-colors"
                >
                  <SettingsIcon className="h-5 w-5 mr-3" />
                  Paramètres
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex w-full items-center p-3 rounded-lg text-red-700 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Déconnexion
                </button>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="md:col-span-3 bg-white rounded-2xl shadow-lg p-6">
              <h1 className="text-2xl font-bold text-[#084b88] mb-6">Paramètres du Compte</h1>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold text-[#0070cc] mb-4">Informations du Profil</h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom Complet</label>
                          <input 
                            id="name" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleInputChange}
                            placeholder="Votre nom complet"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#108de4] focus:ring focus:ring-[#108de4] focus:ring-opacity-50"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Adresse Email</label>
                          <input 
                            id="email" 
                            name="email" 
                            type="email" 
                            value={formData.email} 
                            onChange={handleInputChange}
                            placeholder="Votre adresse email"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#108de4] focus:ring focus:ring-[#108de4] focus:ring-opacity-50"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Numéro de Téléphone</label>
                          <input 
                            id="phone" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleInputChange}
                            placeholder="Votre numéro de téléphone"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#108de4] focus:ring focus:ring-[#108de4] focus:ring-opacity-50"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <hr className="border-t border-gray-200" />
                  
                  <div>
                    <h2 className="text-xl font-semibold text-[#0070cc] mb-4">Préférences de Notification</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-[#084b88] font-medium">Nouvelles Demandes de Location</h3>
                          <p className="text-[#108de4] text-sm">Recevoir des notifications lorsque quelqu'un demande votre équipement</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={formData.notifyNewRentals}
                            onChange={(e) => handleSwitchChange('notifyNewRentals', e.target.checked)}
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-[#bae0fd] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#108de4]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-[#084b88] font-medium">Nouveaux Messages</h3>
                          <p className="text-[#108de4] text-sm">Être notifié lorsque vous recevez de nouveaux messages</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={formData.notifyMessages}
                            onChange={(e) => handleSwitchChange('notifyMessages', e.target.checked)}
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-[#bae0fd] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#108de4]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-[#084b88] font-medium">Mises à Jour de la Plateforme</h3>
                          <p className="text-[#108de4] text-sm">Restez informé des nouvelles fonctionnalités et mises à jour</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={formData.notifyUpdates}
                            onChange={(e) => handleSwitchChange('notifyUpdates', e.target.checked)}
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-[#bae0fd] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#108de4]"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <hr className="border-t border-gray-200" />
                  
                  <div>
                    <h2 className="text-xl font-semibold text-[#0070cc] mb-4">Apparence</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-[#084b88] font-medium">Mode Sombre</h3>
                          <p className="text-[#108de4] text-sm">Passer au thème sombre</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={formData.darkMode}
                            onChange={(e) => handleSwitchChange('darkMode', e.target.checked)}
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-[#bae0fd] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#108de4]"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button 
                      type="submit" 
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0070cc] hover:bg-[#0058a6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#108de4]"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Sauvegarder les Modifications
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Settings;