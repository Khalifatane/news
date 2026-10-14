import {draftMode} from 'next/headers'
import Link from 'next/link'
import {Suspense} from 'react'
import {NewsletterImage} from '@/components/NewsletterImage'
import {NewsletterFooter, NewsletterHeader} from '@/components/NewsletterShell'
import {getDynamicFetchOptions, sanityFetch, type DynamicFetchOptions} from '@/sanity/lib/live'
import {newsletterHomeQuery} from '@/sanity/lib/newsletter'

export default async function IndexPage() { const {isEnabled} = await draftMode(); return isEnabled ? <Suspense><DynamicHome/></Suspense> : <CachedHome perspective="published" stega={false}/> }
async function DynamicHome() { const props = await getDynamicFetchOptions(); return <CachedHome {...props}/> }
async function CachedHome({perspective, stega}: DynamicFetchOptions) {
  'use cache'
  const {data} = await sanityFetch({query: newsletterHomeQuery, perspective, stega})
  const value: any = data || {}
  const home = value.home || {}
  const categories = Array.isArray(home.categories) ? home.categories.filter(Boolean) : Array.isArray(value.categories) ? value.categories : []
  const articles = Array.isArray(value.latest) && value.latest.length ? value.latest.filter(Boolean) : fallbackArticles
  const featured = Array.isArray(home.featured) && home.featured.filter(Boolean).length ? home.featured.filter(Boolean) : articles.slice(0, 3)
  const hero = featured[0] || articles[0] || fallbackArticles[0]
  const secondary = home.secondary || featured[1] || articles[1] || fallbackArticles[1]
  const next = featured[1] || secondary || articles[1] || fallbackArticles[1]
  const trending = Array.isArray(home.trending) && home.trending.filter(Boolean).length ? home.trending.filter(Boolean) : articles.slice(2, 8)
  const publicationName = home.publicationName || 'NEWSLETTER'
  const latestCount = Number(home.latestCount) || 8

  if (!articles.length && !hero) {
    return (
      <>
        <NewsletterHeader name={publicationName} categories={categories} />
        <main className="newsletter-main">
          <section className="feature-grid">
            <div className="hero-copy">
              <h1>No stories published yet</h1>
              <p>Add articles in Sanity to populate this homepage.</p>
            </div>
          </section>
        </main>
        <NewsletterFooter name={publicationName} categories={categories} links={home.footerLinks || []} />
      </>
    )
  }

  return (
    <>
      <NewsletterHeader name={publicationName} categories={categories} />
      <main className="newsletter-main">
        <section className="feature-grid">
          <Link href={href(hero)} className="hero-card">
            {hero?.coverImage && <NewsletterImage image={hero.coverImage} alt={hero.title || 'Story cover'} className="card-image" />}
            <div className="image-shade" />
            <div className="hero-copy">
              <span>{hero?.category?.title || 'World'}</span>
              <h1>{hero?.title || 'Untitled story'}</h1>
              <small>{byline(hero)}</small>
            </div>
          </Link>
          <div className="feature-side">
            {next && (
              <Link href={href(next)} className="side-story">
                {next.coverImage && <NewsletterImage image={next.coverImage} alt={next.title || 'Story cover'} className="card-image" />}
                <div>
                  <p>{next.excerpt}</p>
                  <h2>{next.title}</h2>
                </div>
              </Link>
            )}
            {secondary && (
              <Link href={href(secondary)} className="side-story">
                {secondary.coverImage && <NewsletterImage image={secondary.coverImage} alt={secondary.title || 'Story cover'} className="card-image" />}
                <div>
                  <h2>{secondary.title}</h2>
                  <small>{byline(secondary)}</small>
                </div>
              </Link>
            )}
          </div>
        </section>
        <section className="news-layout">
          <div>
            <div className="section-title"><h2>Latest News</h2><i /></div>
            <div className="latest-grid">
              {articles.slice(0, latestCount).map((article: any, index: number) => <ArticleCard key={article._id || article.slug || index} article={article} index={index} />)}
            </div>
            <Link className="view-more" href="/search">View More</Link>
          </div>
          <aside className="trending">
            <div className="trending-title">
              <h2>Trending Headlines</h2>
              <Link href="/search">View All</Link>
            </div>
            {trending.map((article: any, index: number) => (
              <Link href={href(article)} className="trend-item" key={article._id || index}>
                {article.coverImage && <NewsletterImage image={article.coverImage} alt={article.title || 'Trending story'} index={index} />}
                <div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <small>{byline(article)}</small>
                </div>
              </Link>
            ))}
          </aside>
        </section>
      </main>
      <NewsletterFooter name={publicationName} categories={categories} links={home.footerLinks || []} />
    </>
  )
}
function href(article: any) { return article?.slug ? `/articles/${article.slug}` : '#' }
function byline(article: any) { return `${article?.author?.name ? `By ${article.author.name} · ` : ''}${article?.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'}) : 'Today'}` }
function ArticleCard({article, index}: any) { return <article className={`latest-card ${index % 3 === 0 ? 'image-card' : ''}`}><Link href={href(article)}>{index % 3 === 0 && <NewsletterImage image={article.coverImage} alt={article.title} className="card-image" index={index}/>}<div className="latest-copy"><h3>{article.title}</h3><small>{byline(article)}</small><p>{article.excerpt}</p></div></Link></article> }
const fallbackArticles: any[] = [{slug:'furor-over-chinese-spy-balloon',title:'Furor Over Chinese Spy Balloon Leads to a Diplomatic Crisis',excerpt:'The Pentagon called the object an intelligence gathering balloon after it crossed into American airspace.',category:{title:'World'},author:{name:'Bruce Marlow'}},{slug:'more-airports-use-greener-glide',title:'More Airports to Use Greener ‘Glide’ Approach to Landing',excerpt:'A quieter, more efficient route toward cleaner air travel.',category:{title:'Climate'},author:{name:'Ginny Dennis'}},{slug:'new-ways-to-see-the-world',title:'The New Ways to See the World',excerpt:'Big stories and ideas shaping the week ahead.',category:{title:'Travel'},author:{name:'Ginny Dennis'}},{slug:'london-to-istanbul-by-train',title:'London to Istanbul by train: This 10-day rail adventure is a slow traveller’s dream',excerpt:'Romantic cross-European train journeys have long been associated with the Orient Express.',category:{title:'Travel'},author:{name:'Ginny Dennis'}},{slug:'food-for-weeknights',title:'10 ways to streamline meal prep for more efficient weeknight cooking',excerpt:'Simple seasonal ideas for a lighter routine.',category:{title:'Food'},author:{name:'Ginny Dennis'}},{slug:'markets-and-trade',title:'Oil prices slip again as spectre of trade war concerns haunts market',excerpt:'Markets brace for another volatile week.',category:{title:'Business'},author:{name:'Ginny Dennis'}}]
