import {
  doc,
  setDoc,
  getDocs,
  collection,
  updateDoc,
} from 'firebase/firestore';
import firebase from '../firebase';
import ITicketPackage from '../types/ticketPackage.type';

const db = firebase;

class TicketPackageServices {
  // TODO: Add ticket package to the database
  addTicketPackage = async (ticket: ITicketPackage) => {
    await setDoc(doc(collection(db, 'ticket-package')), ticket);
  };
  // TODO: Get device to the database
  getTicketPackage = async () => {
    let ticketList: ITicketPackage[] = [];
    const querySnapshot = await getDocs(collection(db, 'ticket-package'));
    querySnapshot.forEach(doc => {
      let ticket: ITicketPackage = {
        id: doc.id,
        packageCode: doc.data().packageCode,
        packageName: doc.data().packageName,
        fare: doc.data().fare,
        fareCombo: doc.data().fareCombo,
        dateExpired: doc.data().dateExpired,
        dateRelease: doc.data().dateRelease,
        status: doc.data().status,
      };
      ticketList.push(ticket);
    });
    return ticketList;
  };
  //TODO: Update device to the database
  updateTicketPackage = async (ticket: ITicketPackage) => {
    const refDevice = await doc(collection(db, 'ticket-package'), ticket.id);
    let ticketClone = { ...ticket };
    delete ticketClone.id;
    const updateTicket = await updateDoc(refDevice, {
      ...ticketClone,
    });
    return updateTicket;
  };
}
export default new TicketPackageServices();
