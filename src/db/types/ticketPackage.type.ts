export interface FareItems {
  price: number;
  amount: number;
}

export default interface TicketPackage {
  id?: string;
  packageCode: string;
  packageName: string;
  fare: number;
  fareCombo: FareItems;
  dateExpired: Date;
  dateRelease: Date;
  status: Boolean;
}
