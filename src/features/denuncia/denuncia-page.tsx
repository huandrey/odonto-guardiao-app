import React from 'react';
import './denuncia-page-style.css';
import { ComplaintForm } from './components/denuncia-content';
import { useScrollToTop } from '../../shared/hooks/use-scroll-to-top';

export const DenunciaPage: React.FC = () => {
  useScrollToTop();

  return (
    <div className="report-flow-container">
      <br />
      <ComplaintForm />
    </div>
  );
};
