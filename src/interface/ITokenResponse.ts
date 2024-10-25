
export interface ITokenResponse {
  id: number;
  token: number;
  expirationDate: Date;
  createdAt: Date;
  status: TokenStatus;
}


enum TokenStatus {
  available = 'available',
  used = 'used',
  expired = 'expired'
}