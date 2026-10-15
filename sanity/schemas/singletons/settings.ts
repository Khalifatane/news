import {CogIcon} from '@sanity/icons/Cog'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'menuItems',
      title: 'Menu Item list',
      description: 'Links displayed on the header of your site.',
      type: 'array',
      of: [
        {
          title: 'Reference',
          type: 'reference',
          to: [
            {
              type: 'home',
            },
            {
              type: 'page',
            },
            {
              type: 'project',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'tickerEnabled',
      title: 'Show market ticker',
      description: 'Ticker figures are entered and maintained by editors; they are not live market data.',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'tickerItems',
      title: 'Market ticker items',
      description: 'Add the symbol, displayed price, change text, and direction for each ticker item.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'symbol', title: 'Symbol', type: 'string', validation: (rule) => rule.required().max(100)}),
            defineField({name: 'price', title: 'Displayed value', type: 'string', validation: (rule) => rule.required().max(250)}),
            defineField({name: 'change', title: 'Change text', type: 'string', validation: (rule) => rule.required().max(100)}),
            defineField({
              name: 'direction',
              title: 'Direction',
              type: 'string',
              options: {list: [{title: 'Up', value: 'up'}, {title: 'Down', value: 'down'}, {title: 'Unchanged', value: 'neutral'}], layout: 'radio'},
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {select: {title: 'symbol', subtitle: 'change'}},
        }),
      ],
      validation: (rule) => rule.max(24),
    }),
    defineField({
      name: 'footer',
      description: 'This is a block of text that will be displayed at the bottom of the page.',
      title: 'Footer Info',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Url',
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Displayed on social cards and search engine results.',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Settings',
        subtitle: 'Menu Items, Footer Info, and Open Graph Image',
      }
    },
  },
})
