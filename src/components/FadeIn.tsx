/**
 * Fades the content of a page in when it opens: the parts of the page
 * (heading, text, cards) slide up one after another.
 *
 * Visitors who turned on "reduce motion" on their device see no animation.
 */

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, type ReactNode } from 'react'

gsap.registerPlugin(useGSAP)

function FadeIn({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // the page's root element, e.g. <section className="work">
      const page = container.current?.firstElementChild
      if (!page) {
        return
      }
      const motion = gsap.matchMedia()
      motion.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(page.children, {
          opacity: 0,
          y: 16,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
        })
      })
    },
    { scope: container },
  )

  return <div ref={container}>{children}</div>
}

export default FadeIn
