/**
 * Extended version of `ui.PageView` where pages can be added and shown by name.
 * @example
 * const layout = new ui.VLayout()
 * const text = new ui.Label('Hello')
 * layout.add(text)
 * const pages = new NamedPageView()
 * pages.addPage('hello', layout)
 * pages.showPage('hello')
 */
export class NamedPageView extends ui.PageView {
	#pages: string[] = []
	addPage = (name: string, layout: ui.Layouts) => {
		if (this.#pages.includes(name)) {
			throw new Error(`Page "${name}" already exists`)
		}
		this.#pages.push(name)
		this.add(layout)
	}
	showPage = (name: string) => {
		const index = this.#pages.indexOf(name)
		if (index === -1) {
			throw new Error(`Page "${name}" does not exist`)
		}
		this.setPage(index)
	}
}
