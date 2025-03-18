import { DefaultTheme } from 'styled-components'

export function getTheme() {
  return {
    spaces: {
      tiny: '0.25rem',
      small: '0.5rem',
      medium: '1rem',
      large: '1.5rem',
      big: '2rem',
      huge: '3rem',
      veryHuge: '6rem',
    },
    radius: {
      small: '0.5rem',
      default: '1rem',
      large: '2rem',
    },
    colors: {
      primary: '#FF6200',
      secondary: 'purple',
      firstGray: '#EEE',
      secondGray: '#CCC',
      thirdGray: '#AAA',
      fourthGray: '#888',
      white: '#FFF',
      translucidWhite: '#FFFFFF40',
      translucidBlack: '#00000080',
      error: '#FF0000',
    },
    borders: {
      default: '1px solid #EEE',
    },
    fontSizes: {
      small: '12px',
      default: '16px',
    },
    gradients: {
      blackToTransparent: 'linear-gradient(to top, #00000080, #00000000)',
    },
  }
}

export function getSpace(spacing: keyof ReturnType<typeof getTheme>['spaces']) {
  return (props: { theme: DefaultTheme }) => props.theme.spaces[spacing]
}

export function getFontSize(
  size: keyof ReturnType<typeof getTheme>['fontSizes'],
) {
  return (props: { theme: DefaultTheme }) => props.theme.fontSizes[size]
}

export function getBorder(
  border: keyof ReturnType<typeof getTheme>['borders'],
) {
  return (props: { theme: DefaultTheme }) => props.theme.borders[border]
}

export function getColor(color: keyof ReturnType<typeof getTheme>['colors']) {
  return (props: { theme: DefaultTheme }) => props.theme.colors[color]
}

export function getRadius(radius: keyof ReturnType<typeof getTheme>['radius']) {
  return (props: { theme: DefaultTheme }) => props.theme.radius[radius]
}

export function getGradient(
  gradient: keyof ReturnType<typeof getTheme>['gradients'],
) {
  return (props: { theme: DefaultTheme }) => props.theme.gradients[gradient]
}
