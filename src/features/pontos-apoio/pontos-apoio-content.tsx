import React, { useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import './pontos-apoio-style.css';

interface District {
  name: string;
  neighborhoods: string[];
}

const districts: District[] = [
  {
    name: "NORTE",
    neighborhoods: ["Alto Branco", "Lauritzen", "Palmeira", "Prata"]
  },
  {
    name: "SUL",
    neighborhoods: ["Catolé", "Sandra Cavalcante", "Itararé", "Jardim Paulistano"]
  },
  {
    name: "LESTE",
    neighborhoods: ["Liberdade", "Jardim Quarenta", "Centenário", "José Pinheiro"]
  },
  {
    name: "OESTE",
    neighborhoods: ["Bodocongó", "Malvinas", "Serrotão", "Dinamérica"]
  }
];

export const PontosApoioContent: React.FC = () => {
  const [expandedDistrict, setExpandedDistrict] = useState<string | null>(null);

  const toggleDistrict = (districtName: string) => {
    setExpandedDistrict(expandedDistrict === districtName ? null : districtName);
  };

  return (
    <div className="support-points-container">
      <h1>Pontos de Apoio a Denúncia</h1>

      <div className="main-address">
        <MapPin size={24} />
        <p><strong>Endereço Principal:</strong> Santo Antônio, Campina Grande - PB, 58406-000</p>
      </div>

      <div className="districts-container">
        <h2>Distritos do Conselho Tutelar</h2>
        {districts.map((district) => (
          <div key={district.name} className="district-card">
            <div
              className="district-header"
              onClick={() => toggleDistrict(district.name)}
            >
              <h3>{district.name}</h3>
              <ChevronDown
                size={20}
                className={`chevron ${expandedDistrict === district.name ? 'rotated' : ''}`}
              />
            </div>
            {expandedDistrict === district.name && (
              <div className="neighborhood-list">
                <h4>Bairros:</h4>
                <ul>
                  {district.neighborhoods.map((neighborhood) => (
                    <li key={neighborhood}>{neighborhood}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="map-container">
        <img src="/path/to/your/map-image.png" alt="Mapa dos Pontos de Apoio" className="map-image" />
      </div>
    </div>
  );
};
