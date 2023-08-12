import {
	FileDownIcon,
	MoonIcon,
	PlusIcon,
	RectangleHorizontalIcon,
	Repeat2Icon,
	SquareIcon,
	SunIcon,
} from 'lucide-react'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { Button } from '~/components/ui/button'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '~/components/ui/tooltip'
import { EditorContext, EditorContextType } from '~/contexts/EditorContext'

const Toolbar = () => {
	const { renderer, dispatch, exportGif } = useContext(EditorContext)
	const { ratio, theme } = renderer

	const router = useRouter()

	const toggleRatio = () => {
		dispatch({
			type: 'SET_RATIO',
			payload: ratio === 'square' ? 'landscape' : 'square',
		})
	}

	const selectTheme = () => {
		dispatch({
			type: 'SET_THEME',
			payload: theme === 'light' ? 'dark' : 'light',
		})
	}


	const replayAnimation = () => {
		dispatch({
			type: 'REPLAY_ANIMATION',
		})
	}

	const addMilestone = () => {
		router.push({ query: { addMilestone: true } })
	}

	return (
		<div className="absolute bottom-0 w-[500px] bg-neutral-50 rounded-t-[28px] border border-neutral-200 p-6 flex items-center justify-evenly gap-x-4">
			<ToggleRatioButton onToggle={toggleRatio} value={ratio} />
			<ToggleThemeButton onToggle={selectTheme} value={theme} />
			<Tooltip delayDuration={0}>
				<TooltipTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						onClick={replayAnimation}
					>
						<Repeat2Icon size={16} />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>
						Replay <b>animation</b> 🔄
					</p>
				</TooltipContent>
			</Tooltip>
			<Tooltip delayDuration={0}>
				<TooltipTrigger asChild>
					<Button size="icon" onClick={addMilestone}>
						<PlusIcon size={16} />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>
						Add a <b>milestone</b> 🏁
					</p>
				</TooltipContent>
			</Tooltip>
			<dd className="w-[1px] h-10 bg-neutral-200" />
			<Tooltip delayDuration={0}>
				<TooltipTrigger asChild>
					<Button variant="outline" size="icon" onClick={exportGif}>
						<FileDownIcon className="text-teal-500" size={16} />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>
						Export 📥
					</p>
				</TooltipContent>
			</Tooltip>
		</div>
	)
}

type ToggleButtonProps = {
	onToggle: () => void
}

type RatioButtonProps = {
	value: EditorContextType['renderer']['ratio']
} & ToggleButtonProps

const ToggleRatioButton = ({ onToggle, value }: RatioButtonProps) => {
	return (
		<Tooltip delayDuration={0}>
			<TooltipTrigger asChild>
				<Button variant="outline" size="icon" onClick={onToggle}>
					{value === 'square' ? (
						<RectangleHorizontalIcon size={16} />
					) : (
						<SquareIcon size={16} />
					)}
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				<p>
					Change to{' '}
					<b>{value === 'square' ? 'landscape' : 'square'}</b> ratio
					📷
				</p>
			</TooltipContent>
		</Tooltip>
	)
}

type ThemeButtonProps = {
	value: EditorContextType['renderer']['theme']
} & ToggleButtonProps

const ToggleThemeButton = ({ onToggle, value }: ThemeButtonProps) => {
	return (
		<Tooltip delayDuration={0}>
			<TooltipTrigger asChild>
				<Button variant="outline" size="icon" onClick={onToggle}>
					{value === 'light' ? (
						<MoonIcon size={16} />
					) : (
						<SunIcon size={16} />
					)}
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				<p>
					Change to <b>{value === 'light' ? 'dark' : 'light'}</b>{' '}
					theme 🎨
				</p>
			</TooltipContent>
		</Tooltip>
	)
}

export default Toolbar
