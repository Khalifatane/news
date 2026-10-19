import Link from 'next/link'
import Image from 'next/image'
import mastheadLogo from '../Sunu Ndar 02.png'

export function NewsletterHeader({name = 'Sunu Ndar', categories = []}: {name?: string; categories?: any[]}) {
  const date = new Intl.DateTimeFormat('fr-SN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date())
  const links = categories.length
    ? categories
    : [
        {title: 'À la une', slug: ''},
        {title: 'Politique', slug: 'politique'},
        {title: 'Société', slug: 'societe'},
        {title: 'Économie', slug: 'economie'},
        {title: 'Culture', slug: 'culture'},
        {title: 'Sport', slug: 'sport'},
      ]

  return (
    <header className="news-head">
      <div className="news-utility">
        <time dateTime={new Date().toISOString().slice(0, 10)}>{date}</time>
        <nav aria-label="Liens rapides" className="utility-nav">
          <Link href="/category/film">Film</Link>
          <Link href="/category/politique">Politique</Link>
          <Link href="/category/sport">Sport</Link>
        </nav>
      </div>
      <div className="news-masthead">
        <p>Le journal de Saint-Louis</p>
        <Link href="/" className="brand masthead-logo" aria-label={`${name}, accueil`}>
          <Image src={mastheadLogo} alt="" width={1902} height={827} preload />
        </Link>
      </div>
      <div className="news-primary-nav">
        <nav aria-label="Navigation principale">
          {links.map((item: any, index: number) => (
            <Link
              className={index === 0 ? 'is-active' : undefined}
              href={item.slug ? `/category/${item.slug}` : '/'}
              key={item._id || item.slug || item.title}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <Link href="/search" className="search-link" aria-label="Rechercher">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.3" /><path d="m16 16 4.2 4.2" /></svg>
        </Link>
      </div>
    </header>
  )
}

export function NewsletterFooter({name = 'Sunu Ndar', categories = [], links = []}: {name?: string; categories?: any[]; links?: any[]}) {
  const footerLinks = links.length ? links : ['Privacy Policy', 'Terms of Service', 'Copyright Policy', 'Data Policy', 'Accessibility', 'Help'].map((label) => ({label, url: '#'}))
  return <footer className="news-footer"><div className="news-footer-inner"><div className="brand">{name}</div><div className="footer-middle">{footerLinks.map((item: any) => <a href={item.url} key={item._key || item.label}>{item.label}</a>)}<small>© {new Date().getFullYear()} {name}. All rights reserved</small></div><div className="footer-cats">{categories.map((c: any) => <Link href={c.slug ? `/category/${c.slug}` : '#'} key={c._id || c.title}>{c.title}</Link>)}</div></div></footer>
}
