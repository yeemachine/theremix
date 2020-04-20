import App from './App.svelte';

// if ("serviceWorker" in navigator) {
//     navigator.serviceWorker
//         .register("sw.js")
//         .then(() => console.log("registered service worker!"));
// }

// navigator.serviceWorker.getRegistrations().then(function(registrations) {
// 	for(let registration of registrations) {
// 	 registration.unregister()
//    } })

const app = new App({
	target: document.body
});

export default app;