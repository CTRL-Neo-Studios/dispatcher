// Event wrapper type
export type DispatcherEvent<T = void> = { __payload: T }

// Helper to check if something is an Event wrapper
type IsDispatcherEvent<T> = T extends DispatcherEvent<any> ? true : false

// Extract paths only to Event<> wrappers (stop traversing there)
type DispatcherPathsToProps<T, Prefix extends string = ''> = {
	[K in keyof T]: IsDispatcherEvent<T[K]> extends true
		? `${Prefix}${K & string}` // Stop here - this is an endpoint
		: T[K] extends object
			? DispatcherPathsToProps<T[K], `${Prefix}${K & string}.`> // Keep traversing
			: never
}[keyof T]

// Get the payload type from a dot-notation path
type GetDispatcherPayloadType<T, Path extends string> =
	Path extends `${infer Key}.${infer Rest}`
		? Key extends keyof T
			? GetDispatcherPayloadType<T[Key], Rest>
			: never
		: Path extends keyof T
			? T[Path] extends DispatcherEvent<infer P>
				? P
				: never
			: never

// Main event map type
export type DispatcherEventMap = Record<string, any>
