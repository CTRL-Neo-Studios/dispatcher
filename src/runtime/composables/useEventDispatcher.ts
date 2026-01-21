import mitt from 'mitt'
import type {Emitter} from 'mitt'
import {onUnmounted} from 'vue'
import type {DispatcherEventMap, GetDispatcherPayloadType, DispatcherPathsToProps} from "../types/dispatcher"

// Cache for multiple channels
const channelCache = new Map<string, {
	emitter: Emitter<Record<string, any>>
	wildEmitter: Emitter<Record<string, any>>
}>()

// Counter for auto-generated unique keys
let autoKeyCounter = 0

export function useEventDispatcher<TEvents extends DispatcherEventMap>(channelKey?: string) {
	type EventPath = DispatcherPathsToProps<TEvents>

	// If no key provided, generate a unique one for this instance
	const key = channelKey ??  `__auto_${autoKeyCounter++}`

	// Get or create channel for this key
	if (!channelCache.has(key)) {
		channelCache.set(key, {
			emitter: mitt(),
			wildEmitter: mitt()
		})
	}

	const { emitter, wildEmitter } = channelCache.get(key)!

	// Track all listeners added in this component (use string for runtime values)
	const listeners: Array<{ event:  string, handler:  Function, type: 'typed' | 'wild' }> = []

	return {
		emit: <K extends EventPath>(
			event: K,
			... args: GetDispatcherPayloadType<TEvents, K> extends void
				? []
				:  [payload: GetDispatcherPayloadType<TEvents, K>]
		) => {
			emitter.emit(event as EventPath, args[0])
		},

		on: <K extends EventPath>(
			event: K,
			handler: (payload:  GetDispatcherPayloadType<TEvents, K>) => void
		) => {
			emitter.on(event as EventPath, handler as any)
			listeners.push({ event: event as string, handler, type: 'typed' })
		},

		off: <K extends EventPath>(
			event: K,
			handler:  (payload: GetDispatcherPayloadType<TEvents, K>) => void
		) => {
			emitter.off(event as EventPath, handler as any)
			// Remove from tracking
			const index = listeners.findIndex(l => l.event === (event as string) && l.handler === handler)
			if (index > -1) listeners.splice(index, 1)
		},

		once: <K extends EventPath>(
			event: K,
			handler: (payload: GetDispatcherPayloadType<TEvents, K>) => void
		) => {
			const onceHandler = (payload: any) => {
				handler(payload)
				emitter.off(event as EventPath, onceHandler)
				// Remove from tracking since it auto-removes
				const index = listeners.findIndex(l => l. event === (event as string) && l.handler === onceHandler)
				if (index > -1) listeners.splice(index, 1)
			}
			emitter.on(event as EventPath, onceHandler)
			listeners.push({ event: event as string, handler: onceHandler, type: 'typed' })
		},

		yeet: (event: string, payload?: any) => {
			wildEmitter.emit(event, payload)
		},

		catch: (event: string, handler: (payload: any) => void) => {
			wildEmitter.on(event, handler)
			listeners.push({ event, handler, type: 'wild' })
		},

		uncatch: (event: string, handler: (payload: any) => void) => {
			wildEmitter. off(event, handler)
			// Remove from tracking
			const index = listeners.findIndex(l => l.event === event && l. handler === handler)
			if (index > -1) listeners.splice(index, 1)
		},

		clear: () => {
			emitter.all.clear()
			wildEmitter.all.clear()
			listeners.length = 0
		},

		unmount: () => {
			listeners.forEach(({ event, handler, type }) => {
				if (type === 'typed') {
					emitter.off(event as EventPath, handler as any)
				} else {
					wildEmitter.off(event, handler as any)
				}
			})
		},

		// Expose the channel key for debugging
		get channelKey() {
			return key
		}
	}
}
