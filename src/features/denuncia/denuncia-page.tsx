import React from 'react';
import './denuncia-page-style.css';
import { ComplaintForm } from './components/denuncia-content';

export const DenunciaPage: React.FC = () => {
  return (
    <div className="report-flow-container">
      <br />
      <ComplaintForm />
    </div>
  );
};
