// import original module declarations
import 'styled-components'
import { getTheme } from './services/theme'

// and extend them!
declare module 'styled-components' {
  export type DefaultTheme = ReturnType<typeof getTheme>
}
