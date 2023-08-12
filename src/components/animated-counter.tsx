import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

export default function AnimatedCounter({
	value,
	direction = 'up',
}: {
	value: number
	direction?: 'up' | 'down'
}) {
	const ref = useRef<HTMLSpanElement>(null)
	const motionValue = useMotionValue(direction === 'down' ? value : 0)
	const springValue = useSpring(motionValue, {
		damping: 75,
		stiffness: 100,
	})
	const isInView = useInView(ref, { once: true, margin: '-100px' })

	useEffect(() => {
		if (isInView) {
			motionValue.set(direction === 'down' ? 0 : value)
		}
	}, [motionValue, isInView])

	const animationCompleted = useRef(false)

	useEffect(() => {
		springValue.on('change', (latest) => {
			if (ref.current) {
				ref.current.textContent = Intl.NumberFormat('en-US').format(
					latest.toFixed(0),
				)

				if (latest.toFixed(0) === value.toString()) {
					if (!animationCompleted.current) {
						animationCompleted.current = true
						springValue.stop()
					}
				}
			}
		})

	}, [springValue])

	return <span ref={ref} />
}
