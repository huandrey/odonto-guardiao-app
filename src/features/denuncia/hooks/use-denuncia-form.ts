import { useState } from 'react';
import { Complaint } from '../types/denuncia';

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
    hasLabialFreinumLaceration: false,
    hasLingualFreinumLaceration: false,
    hasPalateTrauma: false,
    hasDentalTrauma: false
  },
  additionalInfo: {}
};

export const useComplaintForm = () => {
  const [complaint, setComplaint] = useState<Complaint>(initialComplaint);
  const [pdf, setPdf] = useState<Blob | null>(null);

  const updateComplaint = (field: keyof Complaint, value: unknown) => {
    setComplaint(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return {
    complaint,
    updateComplaint,
    pdf,
    setPdf,
  };
};
