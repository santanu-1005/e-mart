import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '';
  const [isLoginForm, setIsLoginForm] = useState(true);

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {redirect && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded">
              <p className="text-blue-700">
                Please sign in to continue to checkout.
              </p>
            </div>
          )}
          
          {isLoginForm ? (
            <LoginForm onSwitchForm={toggleForm} />
          ) : (
            <RegisterForm onSwitchForm={toggleForm} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;