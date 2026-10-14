import Link from 'next/link'

export function NewsletterHeader({name = 'NEWSLETTER', categories = []}: {name?: string; categories?: any[]}) {
  const links = categories.length ? categories : ['Politics', 'World', 'Economy', 'Science & Tech', 'Business', 'Travel', 'Climate', 'Lifestyle', 'Food', 'Sports'].map((title) => ({title}))
  return <header className="news-head"><div className="news-head-inner"><div className="brand"><Link href="/">{name}</Link></div><form action="/search" className="search"><input name="q" placeholder="Search for headlines" aria-label="Search for headlines"/><button>SEARCH</button></form><nav>{links.map((item: any) => item.slug ? <Link key={item._id || item.slug} href={`/category/${item.slug}`}>{item.title}</Link> : <span key={item.title}>{item.title}</span>)}</nav></div></header>
}

export function NewsletterFooter({name = 'NEWSLETTER', categories = [], links = []}: {name?: string; categories?: any[]; links?: any[]}) {
  const footerLinks = links.length ? links : ['Privacy Policy', 'Terms of Service', 'Copyright Policy', 'Data Policy', 'Accessibility', 'Help'].map((label) => ({label, url: '#'}))
  return <footer className="news-footer"><div className="news-footer-inner"><div className="brand">{name}</div><div className="footer-middle">{footerLinks.map((item: any) => <a href={item.url} key={item._key || item.label}>{item.label}</a>)}<small>© {new Date().getFullYear()} {name}. All rights reserved</small></div><div className="footer-cats">{categories.map((c: any) => <Link href={c.slug ? `/category/${c.slug}` : '#'} key={c._id || c.title}>{c.title}</Link>)}</div></div></footer>
}
