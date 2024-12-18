import React from 'react';
import { ComplaintForm } from './components/denuncia-content/denuncia-content';
import './denuncia-page-style.css';
import { Sidebar } from '../../shared/components/sidebar';
import { useSidebar } from '../../shared/components/sidebar/use-sidebar';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../shared/components/header/components';

export const DenunciaPage: React.FC = () => {
  const navigate = useNavigate();
  const { isSidebarOpen, toggleSidebar } = useSidebar();

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
      {/* <Header
        title="Realizar Denúncia"
        isMenuOpen={isSidebarOpen}
        onMenuClick={toggleSidebar}
      /> */}
      <br />
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => toggleSidebar()}
      />
      <ComplaintForm />
    </div>
  );
};
