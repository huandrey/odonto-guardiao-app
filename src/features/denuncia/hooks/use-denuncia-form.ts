import { useEffect, useState } from 'react';
import { Complaint } from '../types/denuncia';

const STORAGE_KEY = 'encrypted_complaint_data';

const encryptData = (data: any): string => {
  try {
    const jsonString = JSON.stringify(data);
    return btoa(jsonString); // Base64 encoding
  } catch (error) {
    console.error('Erro ao criptografar dados:', error);
    return '';
  }
};

const decryptData = (encryptedData: string): any => {
  try {
    const jsonString = atob(encryptedData);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Erro ao descriptografar dados:', error);
    return null;
  }
};

const initialComplaint: Complaint = {
  address: {
    hasNoInformation: false,
    cep: '',
    street: '',
    number: '',
    neighborhood: '',
    councilRegion: undefined
  },
  victimData: {
    name: '',
    birthDate: '',
    gender: 'other'
  },
  caseDetails: {
    hasAggressionSigns: false,
    hasEyeInjury: false,
    hasBruises: false,
    hasAbrasion: false,
    hasLaceration: false,
    hasBurns: false,
    hasBiteMarks: false,
  },
  additionalInfo: {}
};

export const useComplaintForm = () => {
  const loadInitialData = (): Complaint => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const decryptedData = decryptData(storedData);
        if (decryptedData) {
          return decryptedData as Complaint;
        }
      }
      return initialComplaint;
    } catch (error) {
      console.error('Erro ao carregar dados do localStorage:', error);
      return initialComplaint;
    }
  };

  const [complaint, setComplaint] = useState<Complaint>(loadInitialData);
  const [pdf, setPdf] = useState<Blob | null>(null);

  useEffect(() => {
    try {
      const encryptedData = encryptData(complaint);
      localStorage.setItem(STORAGE_KEY, encryptedData);
    } catch (error) {
      console.error('Erro ao salvar dados no localStorage:', error);
    }
  }, [complaint]);

  const updateComplaint = (field: keyof Complaint, value: unknown) => {
    setComplaint(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const hasExistingComplaintData = (): boolean => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (!storedData) return false;

      const jsonString = atob(storedData); // Base64 decoding
      const complaint = JSON.parse(jsonString) as Complaint;

      // Verifica se tem algum campo preenchido em address
      if (complaint.address) {
        if (complaint.address.hasNoInformation ||
          complaint.address.cep ||
          complaint.address.street ||
          complaint.address.number ||
          complaint.address.neighborhood ||
          complaint.address.councilRegion) {
          return true;
        }
      }

      // Verifica se tem algum campo preenchido em victimData
      if (complaint.victimData) {
        if (complaint.victimData.name ||
          complaint.victimData.birthDate ||
          complaint.victimData.gender !== 'other') {
          return true;
        }
      }

      // Verifica se tem algum campo preenchido em caseDetails
      if (complaint.caseDetails) {
        if (complaint.caseDetails.hasAggressionSigns ||
          complaint.caseDetails.hasEyeInjury ||
          complaint.caseDetails.hasBruises ||
          complaint.caseDetails.hasAbrasion ||
          complaint.caseDetails.hasLaceration ||
          complaint.caseDetails.hasBurns ||
          complaint.caseDetails.hasBiteMarks) {
          return true;
        }
      }

      // Verifica se tem dados adicionais
      if (complaint.additionalInfo && Object.keys(complaint.additionalInfo).length > 0) {
        return true;
      }

      return false;
    } catch (error) {
      console.error('Erro ao verificar dados existentes:', error);
      return false;
    }
  };


  const clearStoredData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setComplaint(initialComplaint);
    } catch (error) {
      console.error('Erro ao limpar dados do localStorage:', error);
    }
  };

  return {
    complaint,
    updateComplaint,
    pdf,
    setPdf,
    clearStoredData,
    hasExistingComplaintData,
  };
};
