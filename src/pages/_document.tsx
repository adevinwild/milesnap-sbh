import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<script
					async
					src="https://www.webrtc-experiment.com/screenshot.js"
				/>
				<script src="/RecordRTC.js" async />

			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
