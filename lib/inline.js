// A tiny script placed at the very start of <body> so it runs before the page is first painted.
// Ecwid: its script is loaded after the page, so it must not use document.write.
export const ecwidScript = "window.ecwid_script_defer=true;window.ecwid_dynamic_widgets=true;";
