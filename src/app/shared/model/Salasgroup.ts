export interface Salas {
    value: string;
  
  }
  
export interface SalasGroup {
    disabled?: boolean;
    name: string;
    salas: Salas[];
  }