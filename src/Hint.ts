import { Align } from './enums.ts'

export class Hint extends ui.HLayout {
	constructor(hint: string, icon: string) {
		super()

		const textColor = '#919191'
		const hintLayout = new ui.VLayout()
		const hintLabel = new ui.Label(hint)
		hintLabel.setTextColor(textColor)
		hintLabel.setAlignment(Align.CENTRE)

		const imageLayout = new ui.HLayout()
		const hintImage = new ui.Image(icon)
		imageLayout.addStretch()
		imageLayout.add(hintImage)
		imageLayout.addStretch()

		hintLayout.addStretch()
		hintLayout.add(imageLayout, hintLabel)
		hintLayout.addStretch()

		const hintContainer = new ui.Container()
		hintContainer.setLayout(hintLayout)
		hintContainer.setSize(200, 100)

		this.add(hintContainer)
	}
}
