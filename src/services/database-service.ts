import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import { MessageType, notify } from '../utils/notifier';
import { CatalogStructure } from '../stores/catalogs-store';

export const createCatalogStructureService = async (
   uid: string,
   catalogName: string,
   catalogFields: { [key: string]: string }
) => {
   try {
      await addDoc(collection(db, 'catalogs_structure'), {
         userId: uid,
         catalogName,
         catalogFields
      });
   } catch (error) {
      notify('An error has occurred', MessageType.Error);
   }
};

export const getCatalogStrcutureService = async (uid: string): Promise<CatalogStructure[] | null> => {
   try {
      const q = query(collection(db, 'catalogs_structure'), where('userId', '==', uid));
      const querySnapshot = await getDocs(q);
      const catalogsStructures = querySnapshot.docs.map((doc) => doc.data() as CatalogStructure);
      return catalogsStructures;
   } catch (error) {
      notify('An error has occurred', MessageType.Error);
      return null;
   }
};
