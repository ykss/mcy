import { useEffect, useRef } from "react"

/**
 * 스크롤 진입 시 [data-fade] 요소를 아래→위 페이드인으로 표시합니다.
 *
 * 사용법:
 *   const ref = useFadeIn()
 *   <section ref={ref}>
 *     <h2 data-fade data-delay="0">제목</h2>
 *     <p  data-fade data-delay="100">첫 번째 (100ms 지연)</p>
 *   </section>
 *
 * data-delay: 애니메이션 지연 시간 (ms 단위 숫자 문자열, 기본값 "0")
 */
const useFadeIn = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const items = Array.from(container.querySelectorAll<HTMLElement>("[data-fade]"))

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.style.animationDelay = `${el.dataset.delay ?? 0}ms`
            el.classList.add("animate-fade-up")
            observer.unobserve(el)
          }
        })
      },
      { threshold },
    )

    items.forEach(item => observer.observe(item))

    return () => observer.disconnect()
  }, [threshold])

  return ref
}

export default useFadeIn
