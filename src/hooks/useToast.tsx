import React, { createContext, useContext, useState } from "react";

interface ToastContextType {
  toast: (options: { title: string; description: string }) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Provider
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [message, setMessage] = useState<{
    title: string;
    description: string;
  } | null>(null);

  const toast = ({ title, description }: { title: string; description: string }) => {
    setMessage({ title, description });
    setTimeout(() => setMessage(null), 2000);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {message && (
        <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in">
          <strong>{message.title}</strong>: {message.description}
        </div>
      )}
    </ToastContext.Provider>
  );
};

// Hook
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};