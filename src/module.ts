import {defineNuxtModule, addPlugin, addImportsDir, createResolver} from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
}

export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: '@type32/dispatcher',
		configKey: 'dispatcher',
	},
	// Default configuration options of the Nuxt module
	defaults: {},
	setup(_options, _nuxt) {
		const resolver = createResolver(import.meta.url)

		// Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
		addImportsDir(resolver.resolve('runtime/composables'))

		_nuxt.options.alias['@type32/dispatcher'] = resolver.resolve(
			'./runtime/types/dispatcher'
		)
	},
})
