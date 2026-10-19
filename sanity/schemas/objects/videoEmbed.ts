import {PlayIcon} from '@sanity/icons/Play'
import {defineArrayMember, defineField} from 'sanity'

const videoHosts = ['youtube.com', 'youtube-nocookie.com', 'youtu.be', 'vimeo.com', 'cloudinary.com']

export const videoEmbed = defineArrayMember({
  name: 'videoEmbed',
  title: 'Video',
  type: 'object',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'url',
      title: 'Video URL',
      description: 'Paste a YouTube, Vimeo, or Cloudinary video URL.',
      type: 'url',
      validation: (rule) =>
        rule.required().uri({scheme: ['https']}).custom((value) => {
          if (!value) return true

          try {
            const hostname = new URL(value).hostname.toLowerCase()
            return videoHosts.some((host) => hostname === host || hostname.endsWith(`.${host}`))
              ? true
              : 'Use a YouTube, Vimeo, or Cloudinary URL.'
          } catch {
            return 'Enter a valid video URL.'
          }
        }),
    }),
    defineField({name: 'caption', title: 'Caption', type: 'string'}),
    defineField({
      name: 'captionsUrl',
      title: 'Captions file URL',
      description: 'Required for Cloudinary-hosted video; provide a WebVTT (.vtt) captions file.',
      type: 'url',
      validation: (rule) =>
        rule.uri({scheme: ['https']}).custom((value, context) => {
          const videoUrl = (context.parent as {url?: string} | undefined)?.url
          const isCloudinaryVideo = videoUrl && new URL(videoUrl).hostname.toLowerCase() === 'res.cloudinary.com'
          if (isCloudinaryVideo && !value) {
            return 'Captions are required for Cloudinary-hosted video.'
          }
          return true
        }),
    }),
  ],
  preview: {select: {title: 'caption', subtitle: 'url'}},
})