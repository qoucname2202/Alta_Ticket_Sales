import {
  doc,
  setDoc,
  getDocs,
  collection,
  updateDoc,
} from 'firebase/firestore';
import firebase from '../firebase';
import ITicketManager from '../types/ticketManager.type';

const db = firebase;

class TicketManagerServices {
  addTicketManager = async (ticket: ITicketManager) => {
    await setDoc(doc(collection(db, 'ticket')), ticket);
  };

  getTicketManager = async () => {
    let ticketList: ITicketManager[] = [];
    const querySnapshot = await getDocs(collection(db, 'ticket'));
    querySnapshot.forEach(doc => {
      let ticket: ITicketManager = {
        id: doc.id,
        codeBooking: doc.data().codeBooking,
        nameEvent: doc.data().nameEvent,
        codePackage: doc.data().codePackage,
        numberTicket: doc.data().numberTicket,
        dateUsed: doc.data().dateUsed,
        dateExpired: doc.data().dateExpired,
        dateRelease: doc.data().dateRelease,
        status: doc.data().status,
        gateCheckin: doc.data().gateCheckin,
      };
      ticketList.push(ticket);
    });
    return ticketList;
  };
  updateTicketManager = async (ticket: ITicketManager) => {
    const refTicket = await doc(collection(db, 'ticket'), ticket.id);
    let ticketClone = { ...ticket };
    delete ticketClone.id;
    const updateTicket = await updateDoc(refTicket, {
      ...ticketClone,
    });
    return updateTicket;
  };
}
export default new TicketManagerServices();
