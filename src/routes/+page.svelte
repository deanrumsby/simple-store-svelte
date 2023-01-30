<script lang="ts">
	import { writable } from '$lib';

	const store = writable(5);
</script>

<p>{$store}</p>
