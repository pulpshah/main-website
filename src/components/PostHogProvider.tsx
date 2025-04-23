'use client'

import { Suspense, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react'
import posthog from 'posthog-js'

const POSTHOG_KEY  = process.env.NEXT_PUBLIC_POSTHOG_KEY!
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

/**
 * Initialise **once** – avoids re-init on every hot reload / route change.
 */
let posthogLoaded = false
function initPostHog() {
  if (posthogLoaded || typeof window === 'undefined') return
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: 'always',
    capture_pageview: false
  })
  posthogLoaded = true
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(initPostHog, [])        // initialise once on the first client render

  return (
    <PHProvider client={posthog}>
      <SuspendedPageView />
      {children}
    </PHProvider>
  )
}

/* ---------- Manual page-view tracking ---------- */

function PageView() {
  const pathname     = usePathname()
  const searchParams = useSearchParams()
  const ph           = usePostHog()

  useEffect(() => {
    if (!pathname || !ph) return
    const url = window.location.origin + pathname +
                (searchParams.size ? `?${searchParams}` : '')
    ph.capture('$pageview', { $current_url: url })
  }, [pathname, searchParams, ph])

  return null
}

function SuspendedPageView() {
  return (
    <Suspense fallback={null}>
      <PageView />
    </Suspense>
  )
}
