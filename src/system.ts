import { isMac } from './constants.ts'

export function runProcess({
	mac,
	win,
}: {
	mac: [string, string[]]
	win: [string, string[]]
}) {
	const process = isMac ? mac : win
	return api.runProcess(...process)
}

export function runDetachedProcess({
	mac,
	win,
}: {
	mac: [string, string[]]
	win: [string, string[]]
}) {
	const process = isMac ? mac : win
	return api.runDetachedProcess(...process)
}

export function getSystemInfo() {
	const { cpu, os, uniqueId } = api.getSystemInfo()
	const { output, error } = runProcess({
		mac: ['sw_vers', ['-productVersion']],
		win: ['ver', []],
	})
	if (error) {
		throw new Error(error)
	}
	const versionRegex = /(\d+\.?)+/
	const version = isMac ? output : output.match(versionRegex)?.[0] || ''
	const prettyVersion = version ? `${os} ${version}` : 'Unknown'
	return { os, cpu, version, prettyVersion, uniqueId }
}
