import getMuiTheme from 'material-ui/styles/getMuiTheme'

// Colors
export const darkBlue     = '#01062A'
export const beige        = '#D9E5CA'
export const pink         = 'rgb(255, 64, 129)'
export const white        = '#ffffff'
export const black        = '#000000'
export const darkGrey     = '#757575'
export const grey         = '#DEDEDE'
export const grey50       = 'rgba(222, 222, 222, 0.5)'
export const grey30       = 'rgba(222, 222, 222, 0.7)'

// Palette
export const palette = {
  primary1Color: darkBlue,
  primary2Color: pink,
  primary3Color: beige,
  accent1Color: pink,
  textColor: black,
  alternateTextColor: white,
  canvasColor: white,
  borderColor: grey,
  disabledColor: grey30
}

export default getMuiTheme({ palette })
