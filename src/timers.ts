interface TimerCallbacks {
	onTimeout(): void
}

export function timeout(callback: () => void, wait: number) {
	class Callbacks implements TimerCallbacks {
		onTimeout = callback
	}
	const cb = new Callbacks()
	const timer = new api.Timer(cb)
	timer.setInterval(wait)
	timer.setRepeating(false)
	timer.start()
	return timer.stop
}

export function interval(callback: () => void, wait: number) {
	class Callbacks {
		onTimeout = callback
	}
	const cb = new Callbacks()
	const timer = new api.Timer(cb)
	timer.setInterval(wait)
	timer.setRepeating(true)
	timer.start()
	return timer.stop
}

export function debounce(callback: () => void, wait: number) {
	let timer: api.Timer | null = null
	return () => {
		class Callbacks {
			onTimeout = callback
		}
		if (timer) {
			timer.stop()
		}
		const cb = new Callbacks()
		timer = new api.Timer(cb)
		timer.setInterval(wait)
		timer.setRepeating(false)
		timer.start()
	}
}

export function wait(callback: () => void) {
	class Callbacks implements TimerCallbacks {
		onTimeout = callback
	}
	const cb = new Callbacks()
	const timer = new api.Timer(cb)
	timer.setInterval(0)
	timer.setRepeating(false)
	timer.start()
}
