import React from 'react';
import { useApp } from '../context/AppContext';

export default function Toast() {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="toast-floating" role="alert">
      <span>{toastMessage.message}</span>
    </div>
  );
}
