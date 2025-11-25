import { isMac } from './constants.ts'
import { runProcess } from './system.ts'

// NOTE: Adaptation from Sindre Sorhus' `env-paths`
// https://github.com/sindresorhus/env-paths

const home = homedir()
const tmp = tempdir()

export function join(...args: string[]) {
	// TODO: Support file paths
	return Array.from(arguments).join('/')
}

function getSystemVariable({ win, mac }: { win: string; mac: string }) {
	const { output, error } = runProcess({
		mac: ['sh', ['-c', `echo "${mac}"`]],
		win: ['cmd.exe', [`/c echo ${win}`]],
	})
	if (error) {
		throw new Error(error)
	}
	const path = output.trim()
	return isMac
		? path.replace(/\/$/, '')
		: path.replaceAll('\\', '/').replace(/"$/, '')
}

function homedir() {
	return getSystemVariable({ win: '%HOMEDRIVE%%HOMEPATH%', mac: '$HOME' })
}

function tempdir() {
	return getSystemVariable({ win: '%TMP%', mac: '$TMPDIR' })
}

function macos(name: string) {
	const library = join(home, 'Library')
	return {
		data: join(library, 'Application Support', name),
		config: join(library, 'Preferences', name),
		cache: join(library, 'Caches', name),
		log: join(library, 'Logs', name),
		temp: join(tmp, name),
	}
}

function windows(name: string) {
	const appData = join(home, 'AppData', 'Roaming')
	const localAppData = join(home, 'AppData', 'Local')
	return {
		// NOTE: `data`, `config`, `cache` and `log` are invented by
		// Sindre Sorhus as Windows isn't opinionated about this
		data: join(localAppData, name, 'Data'),
		config: join(appData, name, 'Config'),
		cache: join(localAppData, name, 'Cache'),
		log: join(localAppData, name, 'Log'),
		temp: join(tmp, name),
	}
}

export function systemPaths(name: string, { suffix = '' } = {}) {
	if (typeof name !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof name}`)
	}

	if (suffix) {
		// NOTE: Add `suffix` to prevent possible conflict with native apps
		name += `-${suffix}`
	}

	return isMac ? macos(name) : windows(name)
}
