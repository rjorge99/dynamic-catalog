import { create } from 'zustand';
import {
   createCatalogStructureService,
   deleteCatalogStructureService,
   getCatalogStrcutureService
} from '../services/database-service';
import { devtools } from 'zustand/middleware';
import { CatalogField } from '../views/catalogs/CatalogForm';

export interface CatalogStructure {
   catalogId: string;
   catalogName: string;
   userId: string;
   catalogFields: CatalogField[];
}

type State = {
   catalogsStructures: CatalogStructure[];
};

type Actions = {
   setCatalogsStructures: (catalogs: CatalogStructure[]) => void;
   createCatalogStructure: (uid: string, catalogName: string, catalogFields: CatalogField[]) => void;
   deleteCatalog: (catalogId: string) => void;
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
      createCatalogStructure: async (uid: string, catalogName: string, catalogFields: CatalogField[]) => {
         await createCatalogStructureService(uid, catalogName, catalogFields);
         set((state: any) => ({
            catalogsStructures: [...state.catalogsStructures, { catalogName, userId: uid, catalogFields }]
         }));
      },
      reset: () => set(initialState),
      deleteCatalog: async (catalogId: string) => {
         await deleteCatalogStructureService(catalogId);
         set((state: any) => ({
            catalogsStructures: state.catalogsStructures.filter((catalog: CatalogStructure) => catalog.catalogId !== catalogId)
         }));
      }
   }))
);
