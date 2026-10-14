import {UserIcon} from '@sanity/icons/User'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'author', title: 'Author', type: 'document', icon: UserIcon,
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'bio', title: 'Biography', type: 'text', rows: 4}),
    defineField({name: 'image', title: 'Profile image', type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', title: 'Alternative text', type: 'string'})]}),
  ],
  preview: {select: {title: 'name', media: 'image'}},
})
