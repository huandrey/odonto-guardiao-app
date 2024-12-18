declare module 'jspdf-autotable' {
  import { jsPDF } from 'jspdf';

  interface AutoTableOptions {
    head: string[][];
    body: any[][];
  }

  export function autoTable(doc: jsPDF, options: AutoTableOptions): void;
}
