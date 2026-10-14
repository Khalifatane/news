import {urlForImage} from '@/sanity/lib/utils'

const FALLBACKS = [
  'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1516383607781-913a19294fd1?auto=format&fit=crop&w=1400&q=85',
]

export function NewsletterImage({image, alt, className, index = 0}: {image?: any; alt: string; className?: string; index?: number}) {
  const imageUrl = image ? urlForImage(image) : undefined
  const src = typeof imageUrl === 'string'
    ? imageUrl
    : imageUrl?.width(1400).height(900).fit('crop').url() || FALLBACKS[index % FALLBACKS.length]
  return <img className={className} src={src} alt={image?.alt || alt} />
}
