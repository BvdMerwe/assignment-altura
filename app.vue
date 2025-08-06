<script lang="ts" setup>
import "~/assets/tokens.css";
</script>
<template>
	<Head>
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" />
		<link
			href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
			rel="stylesheet"
		/>
		<link rel="shortcut icon" href="logo_small.svg" />
	</Head>
	<main data-theme="light">
		<nuxt-page />
	</main>
</template>

<style>
* {
	margin: 0;
	box-sizing: border-box;
}

html,
body {
	height: 100%;
}

body {
	-webkit-font-smoothing: antialiased;
	background-color: var(--background);
	color: var(--background-text-color);
	font-family: "Inter", sans-serif;
	font-optical-sizing: auto;
}

code {
	font-family: monospace;
	font-size: 1em;
	color: var(--primary-500);
	background-color: var(--shade-100);
	padding: 0.25rem;
	border-radius: 0.25rem;
	-webkit-box-decoration-break: clone;
	box-decoration-break: clone;
}

a {
	text-decoration-thickness: 2px;
	text-decoration-color: var(--primary-200);
}

a:visited {
	color: var(--primary-500);
}

img,
picture,
video,
canvas,
svg {
	display: block;
	max-width: 100%;
}

input,
textarea,
select {
	font: inherit;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
	overflow-wrap: break-word;
	hyphens: auto;
}

hr {
	border-style: solid;
	border-color: var(--shade-200);
	margin-block: 2.5rem 1rem;
}
</style>
