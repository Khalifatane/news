import {HomeIcon} from '@sanity/icons/Home'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'newsletterHome', title: 'Newsletter Homepage', type: 'document', icon: HomeIcon,
  fields: [
    defineField({name: 'publicationName', title: 'Publication name', type: 'string', initialValue: 'NEWSLETTER', validation: (rule) => rule.required()}),
    defineField({name: 'featuredStories', title: 'Featured hero stories', type: 'array', of: [defineArrayMember({type: 'reference', to: [{type: 'article'}]})], validation: (rule) => rule.max(5)}),
    defineField({name: 'secondaryStory', title: 'Secondary featured story', type: 'reference', to: [{type: 'article'}]}),
    defineField({name: 'latestCount', title: 'Number of latest stories', type: 'number', initialValue: 8, validation: (rule) => rule.min(1).max(24)}),
    defineField({name: 'trendingStories', title: 'Trending stories', type: 'array', of: [defineArrayMember({type: 'reference', to: [{type: 'article'}]})], validation: (rule) => rule.max(12)}),
    defineField({name: 'navigationCategories', title: 'Navigation categories', type: 'array', of: [defineArrayMember({type: 'reference', to: [{type: 'category'}]})]}),
    defineField({name: 'footerLinks', title: 'Footer links', type: 'array', of: [defineArrayMember({type: 'object', fields: [defineField({name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required()}), defineField({name: 'url', title: 'URL', type: 'string', validation: (rule) => rule.required()})]})]}),
  ], preview: {prepare: () => ({title: 'Newsletter Homepage', subtitle: 'Homepage layout and editorial selections'})},
})
