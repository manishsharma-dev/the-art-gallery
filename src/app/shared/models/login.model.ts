export interface LoginModel {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: boolean;
  message: string;
  data: Data;
}

export interface Data {
  userData: UserData;
  token: Token;
}

export interface Token {
  accessToken: string;
}

export interface UserData {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  userType: UserType;
  gender: Country;
  dob: Date;
  country: Country;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  __v: number;
  salt: string;
  encryptionKeyHint: string;
}

export interface Country {
  _id: string;
  cd: string;
  value: string;
  __v: number;
}

export interface UserType {
  _id: string;
  name: string;
  createdBy: string;
  createdDate: Date;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  shortCode: string;
}
