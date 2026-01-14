import type {MyCustomEvents} from "#shared/types/events";

export function useCustomEventDispatcher() {
	const dispatch = useEventDispatcher<MyCustomEvents>('mychannel')

	function call() {
		console.log('trycal')
		dispatch.emit('app.window.openFile', {
			path: 'alr'
		})
	}

	function newfile() {
		dispatch.emit('app.window.newFile')
	}

	return {
		call,
		newfile,
		dispatch,
		listen: dispatch.on
	}
}
