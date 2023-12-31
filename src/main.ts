import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAngleDown, faAngleUp, faBook, faCalendar, faCalendarAlt, faCircleCheck, faCog, faDroplet, faFileImage, faLeaf, faSearch, faSnowflake, faSquare, faSquareCheck, faSun, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck as farCircleCheck } from '@fortawesome/free-regular-svg-icons'

// import Previewer from 'virtual:vue-component-preview'
import App from './App.vue'
import type { UserModule } from './types'
import generatedRoutes from '~pages'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const routes = setupLayouts(generatedRoutes)

library.add(faCalendar, faSearch, faXmark, faBook, faCalendarAlt, faFileImage, faCog, faCircleCheck,
  farCircleCheck, faAngleDown, faAngleUp, faSquare, faSquareCheck, faSnowflake, faSun, faLeaf, faDroplet)

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
    // ctx.app.use(Previewer)
    ctx.app.component('font-awesome-icon', FontAwesomeIcon)
  },
)
