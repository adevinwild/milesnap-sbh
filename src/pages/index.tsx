import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { Inter } from 'next/font/google'
import { Button } from '~/components/ui/button'
import Editor from '~/features/editor'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	const user = useUser()
	const supabase = useSupabaseClient()

	const signInWithGitHub = async () => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: 'github',
		})

		if (error) console.log('Error: ', error)
	}

	if (!user) {
		return (
			<div className="absolute top-0 left-0 w-full h-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
				<div className="flex flex-col items-center justify-center">
					<h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
						Welcome to{' '}
						<span className="text-yellow-500">milesnap</span>
					</h1>
					<p className="text-gray-700 dark:text-gray-300">
						Sign in to get started
					</p>
					<hr className="my-4" />
					<div className="grid space-y-4">
						<Button className="w-full" onClick={signInWithGitHub}>
							Sign in with GitHub
						</Button>
					</div>
				</div>
			</div>
		)
	}

	return (
		<main
			className={`flex relative  h-full items-center justify-center ${inter.className} overflow-hidden`}
		>
			<Editor />
		</main>
	)
}
