export interface CatalogField {
   id: string;
   name: string;
   type: string;
}

export interface CatalogStructure {
   catalogId: string;
   catalogName: string;
   userId: string;
   catalogFields: CatalogField[];
}

export const FIELD_TYPES = {
   text: 'Text',
   number: 'Number',
   date: 'Date'
};
