export default function scrollHandler(e, loading, setPagination) {
	if (!loading && parseInt((window.innerHeight + window.scrollY).toFixed(0)) >= document.body.scrollHeight) {
		setPagination(prev => {
			return {...prev, current: prev.current + 1, nextPage: prev.nextPage + 1}
		})


	}
}
