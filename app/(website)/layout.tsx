import {SpeedInsights} from '@vercel/speed-insights/next'
import type {Metadata, Viewport} from 'next'
import {VisualEditing} from 'next-sanity/visual-editing'
import {draftMode} from 'next/headers'
import {Toaster} from 'sonner'
import {DraftModeProvider} from '@/components/DraftModeContext'
import {liveWaitFor, SanityLive} from '@/sanity/lib/live'
import {handleError} from './client-functions'
import {DraftModeToast} from './DraftModeToast'

export const metadata: Metadata = {title: {template: '%s | Newsletter', default: 'Newsletter'}, description: 'Independent reporting and stories that matter.'}
export const viewport: Viewport = {themeColor: '#03100f'}
export default async function WebsiteLayout({children}: LayoutProps<'/'>) { const {isEnabled: isDraftMode} = await draftMode(); return <DraftModeProvider isDraftMode={isDraftMode}><div className="min-h-screen">{children}</div><Toaster/><SanityLive onError={handleError} includeDrafts={isDraftMode} waitFor={liveWaitFor}/>{isDraftMode && <><DraftModeToast action={async () => {'use server'; (await draftMode()).disable()}}/><VisualEditing/></>}<SpeedInsights/></DraftModeProvider> }
