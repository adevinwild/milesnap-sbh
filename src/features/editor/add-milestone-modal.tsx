import { zodResolver } from '@hookform/resolvers/zod'
import {
	DollarSignIcon,
	EuroIcon,
	HeartIcon,
	IndianRupeeIcon,
	InstagramIcon,
	JapaneseYenIcon,
	LineChartIcon,
	LinkedinIcon,
	MousePointerClickIcon,
	ShareIcon,
	ThumbsUpIcon,
	TrashIcon,
	TrophyIcon,
	UserIcon,
	YoutubeIcon,
} from 'lucide-react'
import { useRouter } from 'next/router'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '~/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '~/components/ui/popover'
import { Switch } from '~/components/ui/switch'
import { useToast } from '~/components/ui/use-toast'
import { MilestoneContext } from '~/contexts/MilestoneContext'
import { editorIcons } from '.'

const FormSchema = z.object({
	label: z
		.string()
		.nonempty({ message: 'Label is required' })
		.max(50, {
			message: 'Label is too long. max 50 characters',
		})
		.min(2, {
			message: 'Label must be at least 2 characters long',
		}),
	value: z
		.number()
		.nonnegative({ message: 'Value is required' })
		.max(1e9, { message: 'Value is too large. max 1,000,000,000 (1B)' }),
	details: z
		.string()
		.max(6, {
			message: 'Details is too long. max 6 characters',
		})
		.optional(),
	showDetailsAfterValue: z.boolean().optional(),
	icon: z.string().nullish(),
})

const AddMilestoneModal = () => {
	const router = useRouter()
	const [opened, setOpen] = useState(false)

	const { toast } = useToast()
	const { dispatch } = useContext(MilestoneContext)

	const {
		register,
		handleSubmit,
		control,
		formState,
		watch,
		reset,
		setValue,
	} = useForm<z.infer<typeof FormSchema>>({
		mode: 'all',
		defaultValues: {
			icon: null,
			showDetailsAfterValue: false,
		},
		resolver: zodResolver(FormSchema),
	})

	const currentIcon = watch('icon')

	const IconSelected = () =>
		useMemo(() => {
			return Object.values(editorIcons)
				.flatMap((category) => category.icons)
				.find((i) => i.id === currentIcon)?.icon
		}, [])

	const submit = handleSubmit((data) => {
		dispatch({
			type: 'ADD_MILESTONE',
			payload: {
				...data,
				icon: currentIcon ?? undefined,
			},
		})
		toast({
			title: 'Milestone added',
			description: 'Your milestone has been added to the list.',
		})
		reset()
		setOpen(false)
	})

	const formattedValue = new Intl.NumberFormat('en-US').format(
		watch('value') ?? 0,
	)

	useEffect(() => {
		if (!router) return

		if (router.query.addMilestone) {
			setOpen(true)
			router.replace({ query: {} })
		}
	}, [router])

	return (
		<Dialog open={opened} onOpenChange={setOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a milestone 🏁</DialogTitle>
					<DialogDescription>
						Create a new milestone to showcase your achievements in
						style. Customize the milestone details and choose a
						beautiful template to make it stand out on social media.
					</DialogDescription>
				</DialogHeader>
				<form className="flex flex-col gap-6 mt-8" autoComplete='off'>
					<input type="hidden" autoComplete='none' />
					<div className="grid w-full items-center justify-center text-center gap-1.5">
						<Popover>
							<PopoverTrigger>
								<div className="flex items-center justify-center relative bg-neutral-100 w-14 cursor-pointer  transition-all duration-200  h-14 rounded-full border border-neutral-200">
									{!currentIcon && <Label>Icon</Label>}
									{!!currentIcon && (
										<Button
											className="absolute left-[100%] top-0"
											variant="link"
											size="icon"
											type="button"
											onClick={(e) => {
												e.stopPropagation()
												setValue('icon', null)
											}}
										>
											<TrashIcon size={16} />
										</Button>
									)}

									<IconSelected />
								</div>
							</PopoverTrigger>
							<PopoverContent>
								<IconsTable
									onSelect={(v) => setValue('icon', v)}
								/>
							</PopoverContent>
						</Popover>
					</div>
					<div className="grid w-full items-center gap-1.5">
						<Label htmlFor="milestone-label">Label</Label>
						<Label
							htmlFor="milestone-label"
							className="text-xs text-neutral-400"
						>
							You can also use Emojis on the Label
						</Label>
						<Input
							id="milestone-label"
							autoComplete='none'
							type="text"
							placeholder="Monthly Recurring Revenue (MRR)"
							{...register('label')}
						/>
						<small className="text-xs text-red-500">
							{formState.errors.label?.message}
						</small>
					</div>
					<div className="flex items-center justify-between gap-6">
						<div className="grid w-full max-w-sm items-center gap-1.5">
							<div className="flex items-center justify-between">
								<Label htmlFor="milestone-value">Value</Label>
							</div>
							<Controller
								name="value"
								control={control}
								render={({ field }) => (
									<Input
										id="milestone-value"
										type="text"
										placeholder="1,337"
										value={formattedValue || ''}
										onChange={(v) => {
											const num = Number(
												v.currentTarget.value.replace(
													/,/g,
													'',
												),
											)

											if (Number.isNaN(num)) {
												return
											}

											field.onChange(num)
										}}
									/>
								)}
							/>
							<small className="text-xs text-red-500">
								{formState.errors.value?.message}
							</small>
						</div>
						<div className="grid items-center gap-1.5">
							<div className="flex items-center justify-between">
								<Label htmlFor="milestone-details">
									Details
								</Label>
								<Label
									htmlFor="milestone-details"
									className="text-xs text-neutral-400 font-light"
								>
									(optional)
								</Label>
							</div>
							<Input
								id="milestone-details"
								type="text"
								placeholder="USD"
								{...register('details')}
							/>
							<small className="text-xs text-red-500">
								{formState.errors.details?.message}
							</small>
						</div>
					</div>

					{!!watch('details') && (
						<div className="flex items-center justify-between gap-1.5 mt-1.5">
							<div className="flex flex-col gap-2">
								<Label htmlFor="milestone-show-details-after-value">
									Show Details After Value
								</Label>
								<span className="text-xs text-neutral-400 font-light">
									For example: 1,337€
								</span>
							</div>
							<Controller
								name="showDetailsAfterValue"
								control={control}
								render={({ field }) => (
									<Switch
										id="milestone-show-details-after-value"
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								)}
							/>
						</div>
					)}
				</form>
				<DialogFooter className="mt-8">
					<div className="flex items-center gap-4 justify-end w-full">
						<Button
							variant="secondary"
							size="sm"
							type="button"
							onClick={() => setOpen(false)}
						>
							Cancel
						</Button>
						<Button onClick={submit} size="sm">
							Create
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

type IconsTableProps = {
	onSelect: (icon: string) => void
}

const IconsTable = ({ onSelect }: IconsTableProps) => {
	return (
		<div className="flex flex-col gap-2 p-4">
			<span className="text-sm font-medium">Choose an icon</span>
			<div className="flex flex-col gap-2">
				{Object.values(editorIcons).map((category) => (
					<div key={category.name} className="flex flex-col gap-1.5">
						<span className="text-xs text-neutral-400">
							{category.name}
						</span>
						<div className="grid grid-cols-4 gap-1.5">
							{category.icons.map((icon) => (
								<Button
									key={icon.id}
									variant="ghost"
									onClick={() => onSelect(icon.id)}
								>
									{icon.icon}
								</Button>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default AddMilestoneModal
