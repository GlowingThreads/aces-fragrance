// Tiny scripts placed at the very start of <body> so they run before the page is first painted.

// Opening curtain (components/Curtain.js): it plays on the first page of a visit only. This remembers that
// it has played and marks <html> on later pages, so CSS leaves the curtain out straight away.
export const introScript = `(function(){try{if(sessionStorage.getItem("intro")){document.documentElement.setAttribute("data-intro","seen")}else{sessionStorage.setItem("intro","1")}}catch(e){}})();`;

// Ecwid: its script is loaded after the page, so it must not use document.write.
export const ecwidScript = "window.ecwid_script_defer=true;window.ecwid_dynamic_widgets=true;";
