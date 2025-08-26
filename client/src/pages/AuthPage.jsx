// src/pages/AuthPage.jsx
import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  const handleLoginSuccess = (user) => {
    // You'll need to handle what happens after a successful login here.
    // For now, an alert is fine, but later you should store the user state.
    alert(`Welcome back, ${user.username}!`);
  };

  const handleRegistrationSuccess = (user) => {
    alert(`Account created for ${user.username}! You can now log in.`);
    setIsLoginView(true); // Switch to the login view after successful registration
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-text mb-6 text-center">
            {isLoginView ? "Log In" : "Create an Account"}
          </h1>
          {isLoginView ? (
            <LoginForm onLoginSuccess={handleLoginSuccess} />
          ) : (
            <RegisterForm onRegistrationSuccess={handleRegistrationSuccess} />
          )}
          <div className="text-center mt-6">
            <button
              onClick={() => setIsLoginView(!isLoginView)}
              className="text-primary hover:underline"
            >
              {isLoginView
                ? "Need an account? Register here."
                : "Already have an account? Log in here."}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthPage;
