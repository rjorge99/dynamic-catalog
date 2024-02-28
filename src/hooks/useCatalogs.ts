import { useCatalogsStore } from '../stores/catalogs-store';

export const useCatalogs = () => {
   const {
      catalogsStructures,
      setCatalogsStructures,
      loadCatalogStructures,
      createCatalogStructure,
      reset
   } = useCatalogsStore((store) => store);

   return {
      catalogsStructures,
      setCatalogsStructures,
      loadCatalogStructures,
      createCatalogStructure,
      reset
   };
};
