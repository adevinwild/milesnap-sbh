import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

import { EditorContextProvider } from '~/contexts/EditorContext'
import { TooltipProvider } from '~/components/ui/tooltip'
import { MilestoneContextProvider } from '~/contexts/MilestoneContext'
import { Toaster } from '~/components/ui/toaster'
import { Database } from '../../database.types'

export default function App({ Component, pageProps }: AppProps) {
	const [supabaseClient] = useState(() =>
		createPagesBrowserClient<Database>(),
	)

	return (
		<SessionContextProvider
			supabaseClient={supabaseClient}
			initialSession={pageProps.initialSession}
		>
			<TooltipProvider>
				<EditorContextProvider>
					<MilestoneContextProvider>
						<Component {...pageProps} />
						<Toaster />
					</MilestoneContextProvider>
				</EditorContextProvider>
			</TooltipProvider>
		</SessionContextProvider>
	)
}
