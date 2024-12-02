import {install} from '@github/hotkey'

// Install all the hotkeys on the page
for (const el of document.querySelectorAll('[data-hotkey]')) {
  install(el)
}