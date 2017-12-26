export interface Owner{
  key?: string;
  fullname: string;
  username: string;
  email: string;
  status: string;
  phone: number;
  carCount: number;
  carLimit: number;
}
export interface Renter{
  key?: string;
  fullname: string;
  username: string;
  email: string;
  status: string;
  phone: number;
}

export interface User{
  email: string;
  password: string;
}
export interface Accept{
  ownerPlate: string;
  dateBook: string;
  username: string;
  price: number;
  time: number;
}
export interface Reject{
  title: string;
  des: string;
  ownerPlate: string;
  dateBook: string;
  username: string;
}
