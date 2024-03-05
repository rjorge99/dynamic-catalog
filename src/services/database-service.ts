import { addDoc, collection, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import { MessageType, notify } from '../utils/notifier';
import { CatalogField, CatalogStructure } from '../types/types';

export const createCatalogStructureService = async (
   uid: string,
   catalogName: string,
   catalogFields: CatalogField[]
): Promise<string | null> => {
   try {
      const catalogId = crypto.randomUUID();
      await addDoc(collection(db, 'catalogs_structure'), {
         catalogId,
         userId: uid,
         catalogName,
         catalogFields
      });
      notify('Catalog created successfully', MessageType.Success);
      return catalogId;
   } catch (error) {
      notify('An error has occurred', MessageType.Error);
      return null;
   }
};

export const deleteCatalogStructureService = async (catalogId: string) => {
   try {
      console.log('dfsdf');
      const q = query(collection(db, 'catalogs_structure'), where('catalogId', '==', catalogId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
         await deleteDoc(doc.ref);
      });

      notify('Catalog deleted successfully   ', MessageType.Success);
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
