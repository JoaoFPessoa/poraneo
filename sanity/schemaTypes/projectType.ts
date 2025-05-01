import { PackageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const projectsType = defineType({
  name: "projects",
  title: "Projetos",
  type: "document",
  icon: PackageIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "local",
      title: "Local",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ano",
      title: "Ano",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tipo",
      title: "Tipo",
      type: "string",
      options: {
        list: [
          { title: "Expografia", value: "expografia" },
          { title: "Arquitetura", value: "arquitetura" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "extra_images",
      title: "Extra Images",
      type: "array",
      of: [{ type: "image" }],
    }),
  ],
});
