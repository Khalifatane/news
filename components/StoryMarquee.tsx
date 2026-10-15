import Link from 'next/link'
import {NewsletterImage} from '@/components/NewsletterImage'

type Story = {
  _id?: string
  slug?: string
  title?: string
  excerpt?: string
  category?: {title?: string}
  coverImage?: any
}

function StoryCard({story, index, duplicate = false}: {story: Story; index: number; duplicate?: boolean}) {
  return (
    <Link
      className="story-marquee-card"
      href={story.slug ? `/articles/${story.slug}` : '/search'}
      tabIndex={duplicate ? -1 : undefined}
    >
      <NewsletterImage
        image={story.coverImage}
        alt={duplicate ? '' : story.title || 'Story cover'}
        className="story-marquee-image"
        index={index}
      />
      <span className="story-marquee-copy">
        <span className="story-marquee-category">{story.category?.title || 'Latest'}</span>
        <strong>{story.title || 'Untitled story'}</strong>
        <span>{story.excerpt}</span>
      </span>
    </Link>
  )
}

function MarqueeRow({stories, reverse = false}: {stories: Story[]; reverse?: boolean}) {
  const orderedStories = reverse ? stories.toReversed() : stories
  const repeatedStories = Array.from(
    {length: Math.max(4, orderedStories.length)},
    (_, index) => orderedStories[index % orderedStories.length],
  )

  return (
    <div className="story-marquee-viewport">
      <div className={`story-marquee-track${reverse ? ' story-marquee-track-reverse' : ''}`}>
        {[false, true].map((duplicate) => (
          <div className="story-marquee-group" aria-hidden={duplicate || undefined} key={String(duplicate)}>
            {repeatedStories.map((story, index) => (
              <StoryCard
                story={story}
                index={index}
                duplicate={duplicate}
                key={`${story._id || story.slug || story.title || 'story'}-${index}-${duplicate ? 'copy' : 'story'}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function StoryMarquee({stories}: {stories: Story[]}) {
  if (!stories.length) return null

  const firstRow = stories.slice(0, 6)
  const secondRow = stories.slice(6, 12)

  return (
    <section className="story-marquee" aria-labelledby="story-marquee-title">
      <div className="story-marquee-heading">
        <p className="eyebrow">From the newsroom</p>
        <h2 id="story-marquee-title">Stories worth your time</h2>
      </div>
      <MarqueeRow stories={firstRow} />
      <MarqueeRow stories={secondRow.length ? secondRow : firstRow} reverse />
    </section>
  )
}
