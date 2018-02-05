import { createMuiTheme } from 'material-ui/styles';
// Dark Theme

//Primary colors
const primaryLight               = '#ffff6b'
const primaryMain                = '#fdd835'
const primaryDark                = '#f97d00'
const primaryContrastText        = '#000000'

//Secondary colors
const secondaryLight             = '#3b7680'
const secondaryMain              = '#004a54'
const secondaryDark              = '#00222b'
const secondaryContrastText      = '#ffffff'

//Background
const paperDark                  = '#000046'
const defaultDark                = '#000046'
const appBarDark                 = '#000046'
const contentFrameDark           = '#000046'
const chipDark                   = '#000046'
const avatarDark                 = '#000046'

const theme = createMuiTheme({
   palette: {
     primary: {
       light: primaryLight,
       main: primaryMain,
       dark: primaryDark,
       contrastText: primaryContrastText,
     },
     secondary: {
       light: secondaryLight,
       main: secondaryMain,
       dark: secondaryDark,
       contrastText: secondaryContrastText,
     },
     background: {
       paperDark: paperDark,
       defaultDark: defaultDark,
       appBarDark: appBarDark,
       contentFrameDark: contentFrameDark,
       chipDark: chipDark,
       avatarDark: avatarDark
     },
     status: {
   danger: 'orange',
 },
   }
 })

export default theme
