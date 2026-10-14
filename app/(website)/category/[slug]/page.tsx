import Link from 'next/link'
import {defineQuery} from 'next-sanity'
import {NewsletterImage} from '@/components/NewsletterImage'
import {NewsletterFooter, NewsletterHeader} from '@/components/NewsletterShell'
import {sanityFetch} from '@/sanity/lib/live'
import {articleCardFields, newsletterHomeQuery} from '@/sanity/lib/newsletter'
const query = defineQuery(`{"category": *[_type == "category" && slug.current == $slug][0]{title}, "articles": *[_type == "article" && category->slug.current == $slug] | order(publishedAt desc){${articleCardFields}}}`)
export default async function CategoryPage({params}: PageProps<'/category/[slug]'>) {
  'use cache'
  const {slug} = await params
  const [{data}, {data: homeData}] = await Promise.all([
    sanityFetch({query, params: {slug}, perspective: 'published', stega: false}),
    sanityFetch({query: newsletterHomeQuery, perspective: 'published', stega: false}),
  ])
  const value: any = data || {}
  const home: any = (homeData as any)?.home || {}
  const cats = home.categories || (homeData as any)?.categories || []

  return (
    <>
      <NewsletterHeader name={home.publicationName} categories={cats} />
      <main className="listing-page">
        <p className="eyebrow">Category</p>
        <h1>{value.category?.title || 'Stories'}</h1>
        <div className="listing-grid">
          {(value.articles || []).map((article: any, index: number) => (
            <Link href={`/articles/${article.slug}`} className="listing-card" key={article._id}>
              <NewsletterImage image={article.coverImage} alt={article.title} index={index} />
              <p>{article.category?.title}</p>
              <h2>{article.title}</h2>
              <small>{article.excerpt}</small>
            </Link>
          ))}
        </div>
        {!value.articles?.length && <p>No published stories in this category yet.</p>}
      </main>
      <NewsletterFooter name={home.publicationName} categories={cats} links={home.footerLinks} />
    </>
  )
}
