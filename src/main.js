import App from './App.svelte';

let deferredPrompt;

// window.addEventListener('beforeinstallprompt', (e) => {
//   // Prevent the mini-infobar from appearing on mobile
//   e.preventDefault();
//   // Stash the event so it can be triggered later.
//   deferredPrompt = e;
//   // Update UI notify the user they can install the PWA
//   showInstallPromotion();
//   alert('PWA available')
// });


if ("serviceWorker" in navigator) {
	//register service worker
    navigator.serviceWorker
        .register("./sw.js", {scope: '/'})
        .then(() => console.log("registered service worker!"));
}

//Unregister Service Worker
// navigator.serviceWorker.getRegistrations().then(function(registrations) {
// 	for(let registration of registrations) {
// 	 registration.unregister()
// } })

const app = new App({
	target: document.body
});

function handleFirstTab(e) {
	if (e.keyCode === 9) {
	  document.body.classList.add('user-is-tabbing');
	  
	  window.removeEventListener('keydown', handleFirstTab);
	  window.addEventListener('mousedown', handleMouseDownOnce);
	}
  }
  
  function handleMouseDownOnce() {
	document.body.classList.remove('user-is-tabbing');
	
	window.removeEventListener('mousedown', handleMouseDownOnce);
	window.addEventListener('keydown', handleFirstTab);
  }
  
  window.addEventListener('keydown', handleFirstTab);

export default app;