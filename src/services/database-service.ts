import { addDoc, collection, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import { MessageType, notify } from '../utils/notifier';
import { CatalogStructure } from '../stores/catalogs-store';
import { CatalogField } from '../views/catalogs/CatalogForm';

export const createCatalogStructureService = async (uid: string, catalogName: string, catalogFields: CatalogField[]) => {
   try {
      await addDoc(collection(db, 'catalogs_structure'), {
         catalogId: crypto.randomUUID(),
         userId: uid,
         catalogName,
         catalogFields
      });
      notify('Catalog created successfully', MessageType.Success);
   } catch (error) {
      notify('An error has occurred', MessageType.Error);
   }
};

export const deleteCatalogStructureService = async (catalogId: string) => {
   try {
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
