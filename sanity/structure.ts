import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("post").title("Posts"),
      S.documentTypeListItem("author").title("Authors"),
      S.divider(),
      S.documentTypeListItem("product").title("Products"),
      S.documentTypeListItem("collections").title("Coleções"),
      S.documentTypeListItem("projects").title("Projetos"),
      S.documentTypeListItem("banner").title("Banner"),

      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            "post",
            "category",
            "author",
            "product",
            "collections",
            "projects",
            "banner",
          ].includes(item.getId()!)
      ),
    ]);
