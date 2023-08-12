import {
	UserIcon,
	TrophyIcon,
	LineChartIcon,
	DollarSignIcon,
	EuroIcon,
	IndianRupeeIcon,
	JapaneseYenIcon,
	InstagramIcon,
	LinkedinIcon,
	YoutubeIcon,
	HeartIcon,
	MousePointerClickIcon,
	ShareIcon,
	ThumbsUpIcon,
	ZapIcon,
	Briefcase,
	BriefcaseIcon,
} from 'lucide-react'
import AddMilestoneModal from './add-milestone-modal'
import Toolbar from './toolbar'
import Visualizer from './visualizer'

type Props = {}

const Editor = (props: Props) => {
	return (
		<>
			<Visualizer />
			<Toolbar />
			<AddMilestoneModal />
		</>
	)
}

export const editorIcons = {
	business: {
		name: 'Business',
		icons: [
			{
				id: 'user',
				name: 'User',
				icon: <UserIcon size={24} />,
			},
			{
				id: 'trophy',
				name: 'Trophy',
				icon: <TrophyIcon size={24} />,
			},
			{
				id: 'line-chart',
				name: 'LineChart',
				icon: <LineChartIcon size={24} />,
			},
			{
				id: 'line-chart-debug',
				name: 'LineChart',
				icon: <BriefcaseIcon size={24} />,
			},
		],
	},
	currencies: {
		name: 'Currencies',
		icons: [
			{
				id: 'dollar-sign',
				name: 'DollarSign',
				icon: <DollarSignIcon size={24} />,
			},
			{
				id: 'euro',
				name: 'Euro',
				icon: <EuroIcon size={24} />,
			},
			{
				id: 'indian-rupee',
				name: 'IndianRupee',
				icon: <IndianRupeeIcon size={24} />,
			},
			{
				id: 'japanese-yen',
				name: 'JapaneseYen',
				icon: <JapaneseYenIcon size={24} />,
			},
		],
	},
	socialMedias: {
		name: 'Social Medias',
		icons: [
			{
				id: 'x',
				name: 'X',
				icon: <span className="text-[20px] w-6 h-6 flex items-center justify-center">𝕏</span>,
			},
			{
				id: 'instagram',
				name: 'Instagram',
				icon: <InstagramIcon size={24} />,
			},
			{
				id: 'linkedin',
				name: 'Linkedin',
				icon: <LinkedinIcon size={24} />,
			},
			{
				id: 'youtube',
				name: 'Youtube',
				icon: <YoutubeIcon size={24} />,
			},
		],
	},
	interactions: {
		name: 'Interactions',
		icons: [
			{
				id: 'heart',
				name: 'Heart',
				icon: <HeartIcon size={24} />,
			},
			{
				id: 'mouse-pointer-click',
				name: 'MousePointerClick',
				icon: <MousePointerClickIcon size={24} />,
			},
			{
				id: 'share',
				name: 'Share',
				icon: <ShareIcon size={24} />,
			},
			{
				id: 'thumbs-up',
				name: 'ThumbsUp',
				icon: <ThumbsUpIcon size={24} />,
			},
		],
	},
}

export default Editor
