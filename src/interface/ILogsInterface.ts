
export interface ILogsInterface {
  id: number;
  name: string;
  email: string;
  token: number;
  status: TokenStatus;
  expirationDate: Date;
  createdAt: Date;
}

export enum TokenStatus {
  available = 'available',
  used = 'used',
  expired = 'expired'
}