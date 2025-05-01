import { PackageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const collectionsType = defineType({
  name: "collections",
  title: "Coleções",
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
