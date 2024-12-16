<script lang="ts">
	import '../app.css';
    import { Toaster } from "$lib/components/ui/sonner/index";
	let { children } = $props();
</script>
<Toaster />
<!-- <div>
	<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
	<input type="email" name="email" required 
		class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
</div> -->
{@render children()}
