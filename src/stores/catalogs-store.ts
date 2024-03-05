import { create } from 'zustand';
import {
   createCatalogStructureService,
   deleteCatalogStructureService,
   getCatalogStrcutureService,
   getCatalogStructureByIdService,
   updateCatalogStructureByIdService
} from '../services/database-service';
import { devtools } from 'zustand/middleware';
import { CatalogField, CatalogStructure } from '../types/types';

type State = {
   catalogsStructures: CatalogStructure[];
};

type Actions = {
   setCatalogsStructures: (catalogs: CatalogStructure[]) => void;
   createCatalogStructure: (uid: string, catalogName: string, catalogFields: CatalogField[]) => void;
   deleteCatalog: (catalogId: string) => void;
   getCatalogStructureById: (catalogId: string) => Promise<CatalogStructure | null>;
   loadCatalogStructures: (uid: string) => void;
   updateCatalogStructureById: (catalogId: string, uid: string, catalogName: string, catalogFields: CatalogField[]) => void;
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
         const catalogId = await createCatalogStructureService(uid, catalogName, catalogFields);

         if (catalogId)
            set((state: any) => ({
               catalogsStructures: [...state.catalogsStructures, { catalogName, userId: uid, catalogFields, catalogId }]
            }));
      },
      reset: () => set(initialState),
      deleteCatalog: async (catalogId: string) => {
         await deleteCatalogStructureService(catalogId);
         set((state: any) => ({
            catalogsStructures: state.catalogsStructures.filter((catalog: CatalogStructure) => catalog.catalogId !== catalogId)
         }));
      },
      getCatalogStructureById: async (catalogId: string): Promise<CatalogStructure | null> => {
         const catalog = await getCatalogStructureByIdService(catalogId);
         if (catalog) return catalog;
         else return null;
      },
      updateCatalogStructureById: async (catalogId: string, uid: string, catalogName: string, catalogFields: CatalogField[]) => {
         await updateCatalogStructureByIdService(catalogId, uid, catalogName, catalogFields);
         set((state: any) => ({
            catalogsStructures: state.catalogsStructures.map((catalog: CatalogStructure) => {
               if (catalog.catalogId === catalogId) {
                  return {
                     ...catalog,
                     catalogName,
                     catalogFields
                  };
               }
               return catalog;
            })
         }));
      }
   }))
);
