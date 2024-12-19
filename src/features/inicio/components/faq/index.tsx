import { useState } from 'react';
import './style.css';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: "Como faço para registrar uma denúncia?",
      answer: "Para registrar uma denúncia, clique no botão 'Realizar Denúncia' no topo da página. Você precisará fornecer seu número de CRO para validação. Todas as denúncias são tratadas com total sigilo e confidencialidade."
    },
    {
      question: "Minha identidade será mantida em sigilo?",
      answer: "Sim, garantimos total sigilo da sua identidade. O número do CRO é solicitado apenas para validar que você é um profissional registrado, mas essa informação não será vinculada à denúncia."
    },
    {
      question: "Que tipos de casos posso denunciar?",
      answer: "Você pode denunciar qualquer suspeita de violência ou maus-tratos identificados durante o atendimento odontológico, incluindo: violência física, psicológica, negligência, abuso infantil, violência doméstica e outras formas de agressão."
    },
    {
      question: "Como identificar sinais de violência?",
      answer: "Fique atento a sinais como: lesões inexplicadas, marcas recorrentes, comportamento extremamente ansioso ou temeroso do paciente, inconsistências nas explicações sobre lesões, e relutância em responder a perguntas sobre machucados."
    },
    {
      question: "O que acontece após fazer uma denúncia?",
      answer: "Sua denúncia será encaminhada para os órgãos competentes (Conselho Tutelar, delegacias especializadas ou autoridades responsáveis) que tomarão as providências necessárias para investigar e proteger a possível vítima."
    },
    {
      question: "Preciso ter certeza absoluta para fazer uma denúncia?",
      answer: "Não é necessário ter certeza absoluta. Se houver suspeita fundamentada, é importante fazer a denúncia. Os órgãos competentes são responsáveis por investigar e confirmar as suspeitas."
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">Perguntas Frequentes</h2>
      
      {faqItems.map((item, index) => (
        <div 
          key={index}
          className={`faq-item ${activeIndex === index ? 'active' : ''}`}
        >
          <div 
            className="faq-question"
            onClick={() => toggleFAQ(index)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                toggleFAQ(index);
              }
            }}
          >
            {item.question}
          </div>
          <div className="faq-answer">
            <div className="faq-answer-content">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
