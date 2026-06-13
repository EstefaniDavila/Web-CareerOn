import React, { createContext, useContext, useState, useCallback } from 'react';

const ConfirmContext = createContext();

export const ConfirmProvider = ({ children }) => {
  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    title: '',
    body: '',
    cancelButton: 'Cancelar',
    actionButton: 'Confirmar',
    resolve: null,
  });

  const confirm = useCallback((options) => {
    return new Promise((resolve) => {
      setConfirmState({
        isOpen: true,
        ...options,
        resolve,
      });
    });
  }, []);

  const handleClose = (value) => {
    setConfirmState((prev) => {
      if (prev.resolve) prev.resolve(value);
      return { ...prev, isOpen: false };
    });
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {confirmState.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 m-4 animate-in fade-in zoom-in-95">
            <h2 className="text-xl font-bold mb-2 text-gray-900">{confirmState.title}</h2>
            <p className="text-gray-600 mb-6">{confirmState.body}</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => handleClose(false)}
                className="px-4 py-2 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                {confirmState.cancelButton}
              </button>
              <button
                onClick={() => handleClose(true)}
                className="px-4 py-2 rounded-lg font-medium bg-[var(--color-brand-primary)] text-white hover:opacity-90"
              >
                {confirmState.actionButton}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => useContext(ConfirmContext);
