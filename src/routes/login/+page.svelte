<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Checkbox } from '$lib/components/ui/checkbox';
	// import { toast } from 'svelte-sonner';
	import { showToast } from '$lib/components/ui/sonner/blocks.js';

	let showResetPassword = $state(false);
</script>

<!-- <Toaster /> -->
<div class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8">
		{#if !showResetPassword}
			<!-- Login Section -->
			<Button onclick={() => showToast('success', 'hello', 'first toast')}>Show toast</Button>
			<Button onclick={() => showToast('error', 'hello', 'second toast')}>Regular Toast</Button>
			<Card>
				<CardHeader>
					<CardTitle />
					<h1 class="text-center text-3xl font-medium">Login</h1>
				</CardHeader>
				<CardContent>
					<form id="formLogin" class="space-y-6">
						<div>
							<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
							<input
								type="email"
								id="email"
								name="email"
								required
								class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
							/>
						</div>
						<div>
							<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
							<input
								type="password"
								id="password"
								name="password"
								required
								class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
							/>
						</div>

						<div class="flex items-center space-x-2">
							<Checkbox id="chkRemember" name="remember-me" />
							<label
								for="chkRemember"
								class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Remember me
							</label>
						</div>

						<Button type="submit" class="w-full" variant="default">Sign in</Button>
					</form>
					<div class="mt-4 text-center">
						<button
							onclick={() => (showResetPassword = true)}
							class="text-sm text-black hover:text-gray-500"
						>
							Forgot your password?
						</button>
					</div>
				</CardContent>
			</Card>
		{:else}
			<!-- Reset Password Section -->
			<Card>
				<CardHeader>
					<CardTitle />
					<h1 class="text-center text-3xl font-medium">Login</h1>
				</CardHeader>
				<CardContent>
					<form class="space-y-6">
						<div>
							<label for="reset-email" class="block text-sm font-medium text-gray-700">Email</label>
							<input
								type="email"
								id="reset-email"
								name="email"
								required
								class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
							/>
						</div>
						<Button type="submit" class="w-full" variant="default">Reset Password</Button>
					</form>
					<div class="mt-4 text-center">
						<button
							onclick={() => (showResetPassword = false)}
							class="text-sm text-black hover:text-gray-500"
						>
							Back to login
						</button>
					</div>
				</CardContent>
			</Card>
		{/if}
	</div>
</div>
