import Link from 'next/link'
import {defineQuery} from 'next-sanity'
import {NewsletterImage} from '@/components/NewsletterImage'
import {NewsletterFooter, NewsletterHeader} from '@/components/NewsletterShell'
import {sanityFetch} from '@/sanity/lib/live'
import {articleCardFields, newsletterHomeQuery} from '@/sanity/lib/newsletter'
const searchQuery = defineQuery(`*[_type == "article" && defined(slug.current) && (title match $term || excerpt match $term || pt::text(body) match $term)] | order(publishedAt desc)[0...30]{${articleCardFields}}`)
export default async function SearchPage({searchParams}: PageProps<'/search'>) {
  const {q = ''} = await searchParams

  return <SearchResults q={Array.isArray(q) ? q[0] ?? '' : q} />
}

async function SearchResults({q}: {q: string}) {
  'use cache'
  const term = q ? `*${q}*` : '*'
  const [{data: articles}, {data: homeData}] = await Promise.all([
    sanityFetch({query: searchQuery, params: {term}, perspective: 'published', stega: false}),
    sanityFetch({query: newsletterHomeQuery, perspective: 'published', stega: false}),
  ])
  const home: any = (homeData as any)?.home || {}
  const cats = home.categories || (homeData as any)?.categories || []

  return (
    <>
      <NewsletterHeader name={home.publicationName} categories={cats} />
      <main className="listing-page">
        <p className="eyebrow">Search</p>
        <h1>{q ? `Results for “${q}”` : 'Search stories'}</h1>
        <form className="search-page">
          <input name="q" defaultValue={q} placeholder="Search headlines and article content" />
          <button>Search</button>
        </form>
        <div className="listing-grid">
          {(articles as any[] || []).map((article, index) => (
            <Link href={`/articles/${article.slug}`} className="listing-card" key={article._id}>
              <NewsletterImage image={article.coverImage} alt={article.title} index={index} />
              <p>{article.category?.title}</p>
              <h2>{article.title}</h2>
              <small>{article.excerpt}</small>
            </Link>
          ))}
        </div>
        {!(articles as any[])?.length && <p>No matching published articles found.</p>}
      </main>
      <NewsletterFooter name={home.publicationName} categories={cats} links={home.footerLinks} />
    </>
  )
}
