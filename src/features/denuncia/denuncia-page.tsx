import React from 'react';
import './denuncia-page-style.css';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../shared/components/header/components';
import { ComplaintForm } from './components/denuncia-content';

export const DenunciaPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="report-flow-container">

      <Header>
        <Header.Left>
          <Header.BackButton onClick={() => navigate(-1)} />
        </Header.Left>

        <Header.Center>
          <Header.Title>Realizar Denúncia</Header.Title>
        </Header.Center>

        <Header.Right>
          <></>
        </Header.Right>
      </Header>
      <br />
      <ComplaintForm />
    </div>
  );
};
