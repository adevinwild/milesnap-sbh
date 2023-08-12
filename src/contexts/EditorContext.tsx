import html2canvas from 'html2canvas'
import { createContext, useReducer, useRef } from 'react'

export type EditorContextType = {
	renderer: {
		ratio: 'square' | 'landscape'
		theme: 'light' | 'dark'
	}
	replayAnimationKey: number
	exportGif: () => void
	isRecording: boolean
	visualizerRef?: React.RefObject<HTMLDivElement>
	canvasRef?: React.RefObject<HTMLCanvasElement>
	dispatch: React.Dispatch<EditorContextAction>
}

const defaultContextValue: EditorContextType = {
	renderer: {
		ratio: 'square',
		theme: 'light',
	},
	isRecording: false,
	replayAnimationKey: 0,
	exportGif: () => {},
	dispatch: () => {},
}

type EditorContextAction =
	| { type: 'SET_RATIO'; payload: 'square' | 'landscape' }
	| { type: 'SET_THEME'; payload: 'light' | 'dark' }
	| { type: 'REPLAY_ANIMATION' }

const reducer = (state: EditorContextType, action: EditorContextAction) => {
	switch (action.type) {
		case 'SET_RATIO':
			return {
				...state,
				renderer: {
					...state.renderer,
					ratio: action.payload,
				},
			}
		case 'SET_THEME':
			return {
				...state,
				renderer: {
					...state.renderer,
					theme: action.payload,
				},
			}
		case 'REPLAY_ANIMATION':
			return {
				...state,
				replayAnimationKey: state.replayAnimationKey + 1,
			}

		default:
			return state
	}
}

export const EditorContext =
	createContext<EditorContextType>(defaultContextValue)

export const EditorContextProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const [state, dispatch] = useReducer(reducer, defaultContextValue)
	const visualizerRef = useRef<HTMLDivElement>(null)
	const canvasRef = useRef<HTMLCanvasElement>(null)

	const isRecordingStarted = useRef(false)
	const isStoppedRecording = useRef(false)

	const recordVideo = async () => {
		dispatch({
			type: 'REPLAY_ANIMATION',
		})
		await new Promise((resolve) => setTimeout(resolve, 0))

		const elementToRecord = visualizerRef.current
		if (!elementToRecord) return

		const canvas = canvasRef.current
		if (!canvas) return

		canvas.width = elementToRecord.clientWidth * 2
		canvas.height = elementToRecord.clientHeight * 2

		// @ts-ignore
		const recorder = new window.RecordRTC(canvas, {
			type: 'canvas',
		})

		const ctx = canvas.getContext('2d')
		if (!ctx) return

		const updateCanvas = async (): Promise<void> => {
			if (!isRecordingStarted) {
				setTimeout(updateCanvas, 500)
				return
			}

			const elementAsCanvas = await html2canvas(elementToRecord)

			ctx.clearRect(0, 0, canvas.width, canvas.height)
			ctx.drawImage(elementAsCanvas, 0, 0, canvas.width, canvas.height)

			if (isStoppedRecording.current) {
				return
			}

			requestAnimationFrame(updateCanvas)
		}

		isStoppedRecording.current = false
		isRecordingStarted.current = true
		await updateCanvas()
		recorder.startRecording()

		await new Promise((resolve) => setTimeout(resolve, 6000))
		recorder.stopRecording(() => {
			const blob = recorder.getBlob()
			const url = URL.createObjectURL(blob)

			const a = document.createElement('a')
			a.href = url
			a.download = `milesnap-${Date.now()}.webm`
			a.click()
		})
	}

	return (
		<EditorContext.Provider
			value={{
				...state,
				dispatch,
				visualizerRef,
				canvasRef,
				isRecording: isRecordingStarted.current,
				exportGif: recordVideo,
			}}
		>
			{children}
		</EditorContext.Provider>
	)
}
