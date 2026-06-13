import React, { createContext, useContext, useState, useCallback } from 'react';
import { X } from 'lucide-react';

const ToastContext = createContext();

export const ToastAction = ({ children, altText, ...props }) => (
  <button className="underline text-sm font-medium opacity-80 hover:opacity-100" {...props}>
    {children}
  </button>
);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback(({ title, description, variant = 'default', icon, action }) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, title, description, variant, icon, action }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm pointer-events-none">
        {toasts.map((t) => (
          <div 
            key={t.id} 
            className={`pointer-events-auto flex gap-3 p-4 rounded-xl shadow-lg border transition-all ${
              t.variant === 'destructive' ? 'bg-red-50 border-red-200 text-red-900' : 
              t.variant === 'success' ? 'bg-green-50 border-green-200 text-green-900' :
              'bg-white border-gray-200 text-gray-900'
            }`}
          >
            {t.icon && <div className="mt-0.5">{t.icon}</div>}
            <div className="flex-1">
              {t.title && <h3 className="font-semibold text-sm">{t.title}</h3>}
              {t.description && <p className="text-sm opacity-90 mt-1">{t.description}</p>}
            </div>
            {t.action && <div className="flex items-center ml-2">{t.action}</div>}
            <button onClick={() => removeToast(t.id)} className="opacity-50 hover:opacity-100 p-1 ml-2">
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
