import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { authorType } from "./authorType";
import { productType } from "./productType";
import { collectionsType } from "./collectionsType";
import { projectsType } from "./projectType";
import { bannerType } from "./bannerType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    productType,
    collectionsType,
    projectsType,
    bannerType,
  ],
};
