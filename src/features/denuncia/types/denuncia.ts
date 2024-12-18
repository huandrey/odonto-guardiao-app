

export interface Address {
  hasNoInformation: boolean;
  cep?: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  councilRegion?: {
    setor: string;
    nome: string;
    contato: string[];
  };
}

export interface VictimData {
  name: string;
  birthDate: string;
  gender: 'male' | 'female' | 'other';
}

export enum BodyPart {
  Cabeca = 'Cabeca',
  Rosto = 'Rosto',
  Pescoco = 'Pescoco'
}

export type InjuryLocation = {
  [key in BodyPart]: boolean;
};

export interface CaseDetails {
  hasAggressionSigns: boolean;
  hasEyeInjury: boolean;
  hasBruises: boolean;
  bruisesLocation?: InjuryLocation;
  hasAbrasion: boolean;
  abrasionLocation?: InjuryLocation;
  hasLaceration: boolean;
  lacerationLocation?: InjuryLocation;
  hasBurns: boolean;
  burnsLocation?: InjuryLocation;
  hasBiteMarks: boolean;
  biteMarksLocation?: InjuryLocation;
  hasLabialFreinumLaceration: boolean;
  hasLingualFreinumLaceration: boolean;
  hasPalateTrauma: boolean;
  hasDentalTrauma: boolean;
}

export interface AdditionalInfo {
  extraInformation?: string;
  victimReport?: string;
  guardianVersion?: string;
}

export interface Complaint {
  address: Address;
  victimData: VictimData;
  caseDetails: CaseDetails;
  additionalInfo: AdditionalInfo;
}
