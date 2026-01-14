import type {DispatcherEvent} from "@type32/dispatcher";

export interface MyCustomEvents {
	app: {
		window: {
			newFile: DispatcherEvent,
			openFile: DispatcherEvent<{ path: string }>
		}
	}
}
