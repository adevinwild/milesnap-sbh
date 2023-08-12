import clsx from 'clsx'
import { TrashIcon } from 'lucide-react'
//@ts-ignore

import { useContext, useMemo, useRef } from 'react'
import AnimatedCounter from '~/components/animated-counter'
import { Button } from '~/components/ui/button'
import { EditorContext } from '~/contexts/EditorContext'
import { Milestone, MilestoneContext } from '~/contexts/MilestoneContext'
import { editorIcons } from '.'

type Props = {}

const Visualizer = (props: Props) => {
	const {
		renderer,
		replayAnimationKey,
		visualizerRef,
		canvasRef,
		isRecording,
	} = useContext(EditorContext)
	const { milestones, dispatch } = useContext(MilestoneContext)

	const { ratio, theme } = renderer

	const ratioStyles = {
		square: 'w-[640px] h-[640px]',
		landscape: 'w-[660px] h-[360px]',
	}[ratio]

	const themeStyles = {
		light: 'bg-neutral-100 border-neutral-200',
		dark: 'bg-neutral-950 border-neutral-900',
	}[theme]

	const deleteMilestone = (id: string) => {
		dispatch({
			type: 'REMOVE_MILESTONE',
			payload: id,
		})
	}

	return (
		<>
			<canvas
				ref={canvasRef}
				className="absolute left-[10000px] top-[10000px]"
			></canvas>
			<div
				ref={visualizerRef}
				key={replayAnimationKey}
				className={clsx(
					'p-6 shadow-sm relative border transition-all place-content-center duration-300 rounded-[20px] grid  gap-6 overflow-hidden',
					ratioStyles,
					themeStyles,
					isRecording ? 'rounded-none' : 'rounded-[20px]',
				)}
			>
				{milestones.map((milestone) => (
					<Milestone
						key={milestone.id}
						{...milestone}
						theme={theme}
						square={ratio === 'square'}
						onDelete={() => deleteMilestone(milestone.id)}
					/>
				))}
			</div>
		</>
	)
}

type MilestoneProps = {
	theme: 'light' | 'dark'
	onDelete: () => void
	square: boolean
} & Milestone

const Milestone = ({
	theme,
	label,
	value,
	details,
	icon,
	showDetailsAfterValue,
	square,
	onDelete,
}: MilestoneProps) => {
	const themeStyles = {
		light: 'bg-white border-neutral-200',
		dark: 'bg-neutral-900 shadow-inner shadow-neutral-950 border-neutral-800',
	}[theme]

	const iconThemeStyles = {
		light: 'bg-neutral-100 text-neutral-600 ring-neutral-200',
		dark: 'bg-transparent text-neutral-500  ring-neutral-500 shadow-inner shadow-neutral-950',
	}[theme]

	const IconSelected = () =>
		useMemo(() => {
			return Object.values(editorIcons)
				.flatMap((category) => category.icons)
				.find((i) => i.id === icon)?.icon
		}, [])

	return (
		<div
			className={clsx(
				'milestone p-6 rounded border capitalize relative transition-all duration-300  flex gap-4 items-center h-full min-h-[100px] max-h-[100px] min-w-[20rem] overflow-hidden w-full group',
				themeStyles,
				square ? 'col-span-1 max-w-sm' : 'last:col-span-2',
			)}
		>
			<Button
				onClick={onDelete}
				size="icon"
				variant="destructive"
				className="absolute right-6 top-6 opacity-0 group-hover:opacity-100 transition-all duration-300"
			>
				<TrashIcon size={16} />
			</Button>
			{!!icon && (
				<div
					className={clsx(
						'ring-1 rounded-full flex items-center justify-center p-2 transition-all duration-300',
						iconThemeStyles,
					)}
				>
					<IconSelected />
				</div>
			)}
			<div className="grid gap.1.5 ">
				<span
					className={clsx(
						'text-base font-medium transition-all duration-300',
						theme === 'dark'
							? 'text-neutral-500'
							: 'text-neutral-400',
					)}
				>
					{label}
				</span>
				<span
					className={clsx(
						'text-3xl font-bold flex items-center gap-0.5 transition-all duration-300',
						theme === 'dark'
							? 'text-neutral-100'
							: 'text-neutral-800',
					)}
				>
					{!!details && !showDetailsAfterValue && (
						<span>{details}</span>
					)}
					<AnimatedCounter value={value} />
					{!!details && showDetailsAfterValue && (
						<span>{details}</span>
					)}
				</span>
			</div>
		</div>
	)
}

export default Visualizer
