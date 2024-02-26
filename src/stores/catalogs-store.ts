import { create } from 'zustand';
import { createCatalogStructureService, getCatalogStrcutureService } from '../services/database-service';
import { devtools } from 'zustand/middleware';

export interface CatalogStructure {
   catalogName: string;
   userId: string;
   catalogFields: { [key: string]: string };
}

type State = {
   catalogsStructures: CatalogStructure[];
};

type Actions = {
   setCatalogsStructures: (catalogs: CatalogStructure[]) => void;
   createCatalogStructure: (uid: string, catalogName: string, catalogFields: { [key: string]: string }) => void;
   loadCatalogStructures: (uid: string) => void;
   reset: () => void;
};

const initialState = {
   catalogsStructures: []
};

export const useCatalogsStore = create<State & Actions>()(
   devtools((set) => ({
      catalogsStructures: [],
      setCatalogsStructures: (catalogsStructures: CatalogStructure[]) => set({ catalogsStructures }),
      loadCatalogStructures: async (uid: string) => {
         const catalogsStructures = await getCatalogStrcutureService(uid);
         set({ catalogsStructures: catalogsStructures || [] });
      },
      createCatalogStructure: async (uid: string, catalogName: string, catalogFields: { [key: string]: string }) => {
         await createCatalogStructureService(uid, catalogName, catalogFields);
         set((state: any) => ({
            catalogsStructures: [...state.catalogsStructures, { catalogName, userId: uid, catalogFields }]
         }));
      },
      reset: () => set(initialState)
   }))
);
