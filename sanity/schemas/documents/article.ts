import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {ImageIcon} from '@sanity/icons/Image'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {videoEmbed} from '@/sanity/schemas/objects/videoEmbed'

const inlineImage = defineArrayMember({
  name: 'inlineImage', title: 'Inline image', type: 'object', icon: ImageIcon,
  fields: [
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}, validation: (rule) => rule.required()}),
    defineField({name: 'alt', title: 'Alternative text', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'caption', title: 'Caption', type: 'string'}),
  ], preview: {select: {title: 'caption', media: 'image'}},
})

export default defineType({
  name: 'article', title: 'Article', type: 'document', icon: DocumentTextIcon,
  groups: [{name: 'editorial', title: 'Editorial'}, {name: 'seo', title: 'SEO'}],
  fields: [
    defineField({name: 'title', title: 'Headline', type: 'string', group: 'editorial', validation: (rule) => rule.required().max(150)}),
    defineField({name: 'slug', title: 'URL slug', type: 'slug', group: 'editorial', options: {source: 'title', maxLength: 96}, validation: (rule) => rule.required()}),
    defineField({name: 'category', title: 'Category', type: 'reference', to: [{type: 'category'}], group: 'editorial', validation: (rule) => rule.required()}),
    defineField({name: 'author', title: 'Author', type: 'reference', to: [{type: 'author'}], group: 'editorial', validation: (rule) => rule.required()}),
    defineField({name: 'publishedAt', title: 'Publication date', type: 'datetime', group: 'editorial', initialValue: () => new Date().toISOString(), validation: (rule) => rule.required()}),
    defineField({name: 'readingTime', title: 'Reading time (minutes)', type: 'number', group: 'editorial', initialValue: 3, validation: (rule) => rule.min(1).required()}),
    defineField({name: 'coverImage', title: 'Cover image', type: 'image', group: 'editorial', options: {hotspot: true}, fields: [defineField({name: 'alt', title: 'Alternative text', type: 'string', validation: (rule) => rule.required()})]}),
    defineField({name: 'excerpt', title: 'Summary / excerpt', type: 'text', rows: 3, group: 'editorial', validation: (rule) => rule.required().max(280)}),
    defineField({name: 'body', title: 'Article body', type: 'array', group: 'editorial', of: [defineArrayMember({type: 'block', styles: [{title: 'Normal', value: 'normal'}, {title: 'Heading', value: 'h2'}, {title: 'Quote', value: 'blockquote'}], marks: {annotations: [{name: 'link', type: 'object', title: 'Link', fields: [defineField({name: 'href', title: 'URL', type: 'url'})]}]}}), inlineImage, videoEmbed]}),
    defineField({name: 'featured', title: 'Featured story', type: 'boolean', group: 'editorial', initialValue: false}),
    defineField({name: 'trending', title: 'Trending story', type: 'boolean', group: 'editorial', initialValue: false}),
    defineField({name: 'seoTitle', title: 'SEO title', type: 'string', group: 'seo', validation: (rule) => rule.max(60)}),
    defineField({name: 'seoDescription', title: 'SEO description', type: 'text', rows: 3, group: 'seo', validation: (rule) => rule.max(160)}),
  ],
  preview: {select: {title: 'title', subtitle: 'category.title', media: 'coverImage'}},
})
