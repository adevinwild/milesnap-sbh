import { createContext, useReducer } from 'react'
import { v4 as uuid } from 'uuid'

export type Milestone = {
	id: string
	label: string
	value: number
	icon?: string
	details?: string
	showDetailsAfterValue?: boolean
}

export type MilestoneContextType = {
	milestones: Milestone[]
	dispatch: React.Dispatch<MilestoneContextAction>
}

const defaultContextValue: MilestoneContextType = {
	milestones: [
		{
			id: '1',
			label: 'First Milestone',
			value: 500,
			icon: 'user',
		},
	],
	dispatch: () => {},
}

type MilestoneContextAction =
	| { type: 'ADD_MILESTONE'; payload: Omit<Milestone, 'id'> }
	| { type: 'REMOVE_MILESTONE'; payload: string }

const reducer = (
	state: MilestoneContextType,
	action: MilestoneContextAction,
) => {
	switch (action.type) {
		case 'ADD_MILESTONE':
			return {
				...state,
				milestones: [
					...state.milestones,
					{
						...action.payload,
						id: uuid(),
					},
				],
			}
		case 'REMOVE_MILESTONE':
			return {
				...state,
				milestones: state.milestones.filter(
					(milestone) => milestone.id !== action.payload,
				),
			}
		default:
			return state
	}
}

export const MilestoneContext =
	createContext<MilestoneContextType>(defaultContextValue)

export const MilestoneContextProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const [state, dispatch] = useReducer(reducer, defaultContextValue)

	return (
		<MilestoneContext.Provider value={{ ...state, dispatch }}>
			{children}
		</MilestoneContext.Provider>
	)
}
