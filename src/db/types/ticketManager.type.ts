export enum Status {
  PENDING = 'pending',
  USED = 'used',
  EXPIRED = 'expired',
}
export default interface TicketManager {
  id?: string;
  codeBooking: string;
  numberTicket: string;
  nameEvent: string;
  status: Status;
  dateUsed?: Date;
  dateExpired: Date;
  gateCheckin?: Number;
  dateRelease: Date;
  codePackage: string;
}
