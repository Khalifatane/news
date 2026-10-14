import {TagIcon} from '@sanity/icons/Tag'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category', title: 'Category', type: 'document', icon: TagIcon,
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title', maxLength: 96}, validation: (rule) => rule.required()}),
    defineField({name: 'order', title: 'Navigation order', type: 'number', initialValue: 99}),
  ],
  orderings: [{title: 'Navigation order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'slug.current'}},
})
