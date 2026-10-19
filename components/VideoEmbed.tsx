type VideoSource = {kind: 'iframe' | 'video'; src: string}

function getVideoSource(value: string): VideoSource | null {
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:') return null

    const hostname = url.hostname.toLowerCase().replace(/^www\./, '')

    if (hostname === 'youtu.be') {
      const id = url.pathname.split('/').filter(Boolean)[0]
      return id && /^[\w-]+$/.test(id)
        ? {kind: 'iframe', src: `https://www.youtube-nocookie.com/embed/${id}`}
        : null
    }

    if (hostname === 'youtube.com' || hostname.endsWith('.youtube.com')) {
      const segments = url.pathname.split('/').filter(Boolean)
      const id = url.pathname === '/watch'
        ? url.searchParams.get('v')
        : ['embed', 'shorts', 'live'].includes(segments[0])
          ? segments[1]
          : null
      return id && /^[\w-]+$/.test(id)
        ? {kind: 'iframe', src: `https://www.youtube-nocookie.com/embed/${id}`}
        : null
    }

    if (hostname === 'youtube-nocookie.com' || hostname.endsWith('.youtube-nocookie.com')) {
      return /^\/embed\/[\w-]+$/.test(url.pathname)
        ? {kind: 'iframe', src: url.toString()}
        : null
    }

    if (hostname === 'vimeo.com' || hostname.endsWith('.vimeo.com')) {
      const segments = url.pathname.split('/').filter(Boolean)
      const id = segments.at(-1)
      return id && /^\d+$/.test(id)
        ? {kind: 'iframe', src: `https://player.vimeo.com/video/${id}`}
        : null
    }

    if (hostname === 'res.cloudinary.com' && url.pathname.includes('/video/upload/')) {
      return {kind: 'video', src: url.toString()}
    }
  } catch {
    return null
  }

  return null
}

export function VideoEmbed({url, caption, captionsUrl}: {url?: string; caption?: string; captionsUrl?: string}) {
  if (!url) return null
  const source = getVideoSource(url)
  if (!source) return null
  const title = caption || 'Embedded video'

  return (
    <figure className="my-6 space-y-2">
      <div className="relative aspect-video overflow-hidden">
        {source.kind === 'video' ? (
          <video className="h-full w-full" controls playsInline preload="metadata" aria-label={title}>
            <source src={source.src} />
            <track kind="captions" src={captionsUrl} srcLang="en" label="English" />
            Your browser does not support the video element.
          </video>
        ) : (
          <iframe
            className="absolute inset-0 h-full w-full border-0"
            src={source.src}
            title={title}
            loading="lazy"
            sandbox="allow-scripts allow-presentation"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )}
      </div>
      {caption && <figcaption className="font-sans text-sm text-gray-600">{caption}</figcaption>}
    </figure>
  )
}