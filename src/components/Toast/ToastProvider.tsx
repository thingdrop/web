import { createContext, useState, useContext, useCallback } from 'react';
import ToastContainer from './ToastContainer';

const ToastContext = createContext(null);

let id = 1;

type ToastOptions = {
  content: string;
  timeout?: number;
};

type ToastProviderProps = {
  children: any;
};

function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(
    (toastOptions: ToastOptions) => {
      setToasts((toasts) => [
        {
          id: id++,
          ...toastOptions,
        },
        ...toasts,
      ]);
    },
    [setToasts],
  );

  const removeToast = useCallback(
    (id) => {
      setToasts((toasts) => toasts.filter((t) => t.id !== id));
    },
    [setToasts],
  );

  return (
    <ToastContext.Provider
      value={{
        addToast,
        removeToast,
      }}
    >
      <ToastContainer toasts={toasts} />
      {children}
    </ToastContext.Provider>
  );
}

const useToast = () => {
  const toastHelpers = useContext(ToastContext);

  return toastHelpers;
};

export { ToastContext, ToastProvider, useToast };
