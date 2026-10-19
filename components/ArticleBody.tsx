import {PortableText} from 'next-sanity'
import {VideoEmbed} from './VideoEmbed'
import {NewsletterImage} from './NewsletterImage'

export function ArticleBody({value}: {value: any[]}) {
  if (!Array.isArray(value)) return null
  return <PortableText value={value} components={{
    block: {normal: ({children}) => <p>{children}</p>, h2: ({children}) => <h2>{children}</h2>, blockquote: ({children}) => <blockquote>{children}</blockquote>},
    marks: {link: ({children, value: mark}) => <a href={mark?.href} target="_blank" rel="noreferrer">{children}</a>},
    types: {
      inlineImage: ({value: image}) => (
        <figure>
          <NewsletterImage image={image.image} alt={image.alt || ''} className="article-inline-image" />
          {image.caption && <figcaption>{image.caption}</figcaption>}
        </figure>
      ),
      videoEmbed: ({value: video}) => (
        <VideoEmbed url={video.url} caption={video.caption} captionsUrl={video.captionsUrl} />
      ),
    },
  }} />
}
