<script lang="ts" setup></script>

<template>
	<main>
		<img src="/goose.png" class="goose" />
		<h1>Hello there, future goose!</h1>
		<p>
			This is your technical assessment, in here we expect you to show the best
			you can do. We expect to see clean code and a good UI with accessibility
			in mind. We expect that this assessment won't take more than 8 hours.
		</p>
		<h2>What we are looking for</h2>
		<ul>
			<li>A good code structure</li>
			<li>Usage of composables</li>
			<li>Code with extensibility in mind</li>
			<li>Use up to date (s)css properties</li>
			<li>Usage of typescript</li>
			<li>Clear documentation (if it helps, add a readme.md)</li>
		</ul>

		<h2>The assignment</h2>
		<p>
			You are asked to create a overview of all translation keys in Altura. In
			this view you must be able to filter on <code>key</code>, Translation
			values in different locales and the <code>updatedAt</code> date.
		</p>
		<h3>Requirements</h3>
		<ul>
			<li>I can see a list of all translation keys</li>
			<ul>
				<li>I can see the key, translation value and the last updated date</li>
				<li>
					When hovering over a row, I see a tooltip with the full translation
					value for each locale.
				</li>
			</ul>
			<li>I can filter on keys using a search input</li>
			<li>I can filter on translation keys using a date range</li>
			<li>I can see on which page I am and how many pages there are</li>
			<ul>
				<li>I am able to change the page</li>
				<li>I am able to change the page size</li>
			</ul>
			<li>When no keys are found, I see a empty state</li>
		</ul>
		<p>The keys are hosted on our directus instance, you can it here:</p>
		<p>
			<code>https://directus.altura.io/items/translationKeys</code>
		</p>
		<p>
			We already took the liberty to write typescript types for you. You can
			find them in the <code>types.d.ts</code> file of this project.
		</p>
		<p>
			Documentation about filtering in the directus api can be found
			<a
				href="https://directus.io/docs/guides/connect/filter-rules"
				target="_blank"
			>
				here.
			</a>
			One note to add is that you are allowed to use the directus sdk, but bonus
			points if you don't.
		</p>

		<h3>How it should look</h3>
		<p>
			You can use the following design as a reference, but feel free to make it
			your own.
		</p>
		<img src="/design.png" class="design" />

		<h2>Turning the assignment in</h2>
		<p>
			You get 3 days to complete this assignment.
			We expect you to create a new repository on your own github account. You can use this repository as a template.
			When you are done, please send us a link to your repository. We will review your code and get back to you as soon as possible.
			If you want to make it private, you should add `roy-ermers` as a collaborator.
		</p>
		<hr />
		<p>If you have any questions, feel free to ask! You can find me at:</p>
		<a href="mailto:roy@altura.io">roy@altura.io</a>
		<a href="https://www.linkedin.com/in/roy-ermers-34b414186">LinkedIn</a>
	</main>
</template>
<style scoped>
h1 {
	text-align: center;
}

main {
	display: grid;
	place-content: center;
	min-height: 100vh;
	max-width: 40rem;
	gap: 0.5rem;
	margin: 0 auto;
	padding-block: 2.5rem;
	line-height: 1.5;
}

.goose {
	width: 10rem;
	justify-self: center;
}

.design {
	border: 1px solid var(--shade-200);
	border-radius: 0.5rem;
	box-shadow:
		rgba(0, 0, 0, 0.12) 0px 0px 2px 0px,
		rgba(0, 0, 0, 0.14) 0px 1px 2px 0px;
}
</style>
