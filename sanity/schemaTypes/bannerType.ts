import { defineField, defineType } from "sanity";

export const bannerType = defineType({
  name: "banner",
  title: "Banner Type",
  type: "document",
  fields: [
    defineField({
      name: "projetos",
      title: "Projetos",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "colecoes",
      title: "Coleções",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "produtos",
      title: "Produtos",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
});
