import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import Link from 'next/link'
import {ArticleBody} from '@/components/ArticleBody'
import {NewsletterImage} from '@/components/NewsletterImage'
import {NewsletterFooter, NewsletterHeader} from '@/components/NewsletterShell'
import {sanityFetch, sanityFetchMetadata} from '@/sanity/lib/live'
import {articleQuery, newsletterHomeQuery} from '@/sanity/lib/newsletter'

export async function generateMetadata({params}: PageProps<'/articles/[slug]'>): Promise<Metadata> {
  const {slug} = await params
  const {data} = await sanityFetchMetadata({
    query: articleQuery,
    params: {slug},
    perspective: 'published',
  })
  const article: any = data

  return {
    title: article?.seoTitle || article?.title,
    description: article?.seoDescription || article?.excerpt,
  }
}

export default async function ArticlePage({params}: PageProps<'/articles/[slug]'>) {
  'use cache'
  const {slug} = await params
  const [{data: articleData}, {data: homeData}] = await Promise.all([
    sanityFetch({query: articleQuery, params: {slug}, perspective: 'published', stega: false}),
    sanityFetch({query: newsletterHomeQuery, perspective: 'published', stega: false}),
  ])
  const article: any = articleData
  if (!article) notFound()
  const home: any = (homeData as any)?.home || {}
  const categories = home.categories || (homeData as any)?.categories || []

  return (
    <>
      <NewsletterHeader name={home.publicationName} categories={categories} />
      <main className="article-page">
        <div className="article-cover">
          <NewsletterImage image={article.coverImage} alt={article.coverImage?.alt || article.title} className="card-image" />
        </div>
        <article className="article-content">
          <Link href={article.category?.slug ? `/category/${article.category.slug}` : '/'} className="article-category">
            {article.category?.title || 'News'}
          </Link>
          <h1>{article.title}</h1>
          <div className="article-meta">
            <NewsletterImage image={article.author?.image} alt={article.author?.name || 'Author'} className="avatar" />
            <span>By {article.author?.name || 'Newsletter staff'}</span>
            <span>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'}) : 'Today'}</span>
            <span>{article.readingTime || 3} min read</span>
            <div className="article-actions" aria-label="Article actions">
              <button aria-label="Comment">◯</button>
              <button aria-label="Share">↗</button>
              <button aria-label="Bookmark">♧</button>
            </div>
          </div>
          <p className="article-intro">{article.excerpt}</p>
          <ArticleBody value={article.body} />
        </article>
      </main>
      <NewsletterFooter name={home.publicationName} categories={categories} links={home.footerLinks} />
    </>
  )
}
