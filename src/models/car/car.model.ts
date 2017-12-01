export interface Car{
  key?: string;
  type: string;
  make: string;
  model: string;
  transmission: string;
  year: number;
  plate: string;
  rentPrice: number;
  availability: string;
}

export interface PlateNumber{
  key?: string;
  plateNum:string;
}
