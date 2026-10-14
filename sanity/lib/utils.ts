import {createImageUrlBuilder, type SanityImageSource} from '@sanity/image-url'

import {dataset, projectId} from '@/sanity/lib/api'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: SanityImageSource | null | undefined) => {
  if (!source) {
    return undefined
  }

  if (typeof source === 'string') {
    return source
  }

  const asset = 'asset' in source ? source.asset : undefined

  if (asset && typeof asset === 'object' && typeof asset.url === 'string') {
    return asset.url
  }

  // Ensure that source image contains a valid reference
  if ('asset' in source && !source?.asset?._ref) {
    return undefined
  }

  return imageBuilder?.image(source).auto('format').fit('max')
}

export function urlForOpenGraphImage(image: SanityImageSource | null | undefined) {
  const imageUrl = urlForImage(image)

  if (typeof imageUrl === 'string') {
    return imageUrl
  }

  return imageUrl?.width(1200).height(627).fit('crop').url()
}

export function resolveHref(documentType?: string, slug?: string | null): string | undefined {
  switch (documentType) {
    case 'home':
      return '/'
    case 'page':
      return slug ? `/${slug}` : undefined
    case 'project':
      return slug ? `/projects/${slug}` : undefined
    case 'article':
      return slug ? `/articles/${slug}` : undefined
    default:
      console.warn('Invalid document type:', documentType)
      return undefined
  }
}
