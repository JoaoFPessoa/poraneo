import { PackageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Product",
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
      name: "additionalInfo",
      title: "Additional Information",
      type: "text",
    }),
    defineField({
      name: "collection",
      title: "Collection",
      type: "string",
    }),
    defineField({
      name: "technicalDescription",
      title: "Technical Description",
      type: "text",
    }),
    defineField({
      name: "dimensions",
      title: "Dimensions",
      type: "string",
    }),
    defineField({
      name: "specifications",
      title: "Specifications",
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
