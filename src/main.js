import App from './App.svelte';

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