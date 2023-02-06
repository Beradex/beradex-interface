import { transparentize } from 'polished'
import React, { useMemo } from 'react'
import { Text, TextProps } from 'rebass'
import styled, {
  createGlobalStyle,
  css,
  DefaultTheme,
  ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components'
import { useIsDarkMode } from '../state/user/hooks'
import { Colors } from './styled'
export * from './components'
import '@fontsource/rubik'

export const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280,
}

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    ;(accumulator as any)[size] = (a: any, b: any, c: any) => css`
      @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
        ${css(a, b, c)}
      }
    `
    return accumulator
  },
  {}
) as any

const white = '#FFFFFF'
const black = '#000000'

export function colors(darkMode: boolean): Colors {
  return {
    // base
    white,
    black,

    // text
    text1: darkMode ? '#FFFFFF' : '#000000',
    text2: darkMode ? '#C3C5CB' : '#565A69',
    text3: darkMode ? '#6C7284' : '#888D9B',
    text4: darkMode ? '#565A69' : '#C3C5CB',
    text5: darkMode ? '#2C2F36' : '#EDEEF2',

    // backgrounds / greys
    bg01: 'black',
    bg0: darkMode ? 'rgba(4, 4, 4, 0.9)' : 'rgba(16, 16, 18, 0.9)',
    bg1: darkMode ? '#12141A' : '#FFFFFF',
    bg2: darkMode ? '#00050F' : '#F7F8FA', //MAIN BG
    bg3: darkMode ? '#1C1F26' : '#EDEEF2',
    bg4: darkMode ? '#565A69' : '#CED0D9',
    bg5: darkMode ? '#7c5237' : '#888D9B',
    bg6: darkMode ? '#41546e' : '#6C7284',

    //specialty colors
    modalBG: darkMode ? 'rgba(0,0,0,.425)' : 'rgba(0,0,0,0.3)',
    advancedBG: darkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.6)',

    //primary colors
    primary1: darkMode ? '#ffc000' : '#74350c',
    primary2: darkMode ? '#f07622' : '#e97a2f',
    primary3: darkMode ? '#f07622' : '#ee975d',
    primary4: darkMode ? '#af4804' : '#612903', // inner buttons
    primary5: darkMode ? '#612903' : '#E3DFF3',

    primary1_30: 'rgba(0,0,0,.425)',
    primaryTransparent: 'rgba(120, 120, 120, 0.17)',

    // color text
    primaryText1: darkMode ? '#ee975d' : '#e3a507',

    // secondary colors
    secondary1: darkMode ? '#d06016' : '#ff007a',
    secondary2: darkMode ? '#001715' : '#F6DDE8',
    secondary3: darkMode ? '#001617' : '#FDEAF1',

    secondary1_30: 'rgba(116, 88, 9, 0.3)',
    secondary1_10: 'rgba(144, 90, 8, 0.1)',

    dark0: 'rgba(9, 8, 8, 0.9)', //switch token buttonBG
    dark1: 'rgba(224, 143, 3, 0.9)',
    //dark2: 'rgba(10,14,36, 0.9)',
    dark2: 'rgba(14, 14, 14, 0.8)',
    dark3: 'rgba(224, 143, 3, 0.9)',
    dark4: 'rgba(114, 66, 0, 1)',
    dark5: 'transparent',
    darkTransparent: 'rgba(18, 16, 18, 0.9)',
    darkTransparent2: 'rgba(59, 34, 0, 0.32)',
    darkTransparent3: 'rgba(18, 16, 18,0.8)',

    bgGradient: `linear-gradient(90deg, rgba(18, 16, 18, 0.9) 0%, rgba(57, 33, 0, 0.9) 35%, rgba(18, 16, 18, 0.9) 100%)`,

    // other
    red1: 'rgba(242,65,65,0.3)',
    red2: '#F82D3A',
    red3: '#D60000',
    green1: '#27AE60',
    yellow1: '#e3a507',
    yellow2: '#ff8f00',
    yellow3: '#F3B71E',
    blue1: '#2172E5',
    blue2: '#5199FF',

    error: '#FD4040',
    success: '#27AE60',
    warning: '#ff8f00',

    // dont wanna forget these blue yet
    // blue4: darkMode ? '#153d6f70' : '#C4D9F8',
    // blue5: darkMode ? '#153d6f70' : '#EBF4FF',
  }
}

export function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),

    grids: {
      sm: 8,
      md: 12,
      lg: 24,
    },

    //shadows
    shadow1: darkMode ? '#000' : '#2F80ED',

    // media queries
    mediaWidth: mediaWidthTemplates,

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `,
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useIsDarkMode()

  const themeObject = useMemo(() => theme(darkMode), [darkMode])

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
  color: ${({ color, theme }) => (theme as any)[color]};
`

export const TYPE = {
  main(props: TextProps) {
    return <TextWrapper fontWeight={200} color={'text2'} {...props} />
  },
  link(props: TextProps) {
    return <TextWrapper fontWeight={200} color={'primary1'} {...props} />
  },
  label(props: TextProps) {
    return <TextWrapper fontWeight={200} color={'text1'} {...props} />
  },
  black(props: TextProps) {
    return <TextWrapper fontWeight={200} color={'text1'} {...props} />
  },
  white(props: TextProps) {
    return <TextWrapper fontWeight={200} color={'white'} {...props} />
  },
  body(props: TextProps) {
    return <TextWrapper fontWeight={200} fontSize={16} color={'text1'} {...props} />
  },
  largeHeader(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={24} {...props} />
  },
  mediumHeader(props: TextProps) {
    return <TextWrapper fontWeight={300} fontSize={20} {...props} />
  },
  subHeader(props: TextProps) {
    return <TextWrapper fontWeight={200} fontSize={14} {...props} />
  },
  small(props: TextProps) {
    return <TextWrapper fontWeight={300} fontSize={11} {...props} />
  },
  blue(props: TextProps) {
    return <TextWrapper fontWeight={200} color={'blue1'} {...props} />
  },
  yellow(props: TextProps) {
    return <TextWrapper fontWeight={300} color={'yellow3'} {...props} />
  },
  darkGray(props: TextProps) {
    return <TextWrapper fontWeight={300} color={'text3'} {...props} />
  },
  gray(props: TextProps) {
    return <TextWrapper fontWeight={300} color={'bg3'} {...props} />
  },
  italic(props: TextProps) {
    return <TextWrapper fontWeight={300} fontSize={12} fontStyle={'italic'} color={'text2'} {...props} />
  },
  error({ error, ...props }: { error: boolean } & TextProps) {
    return <TextWrapper fontWeight={300} color={error ? 'red1' : 'text2'} {...props} />
  },
}

export const ThemedBackground = styled.div<{ backgroundColor?: string | undefined }>`
  position: fixed;
  /* top: 0; */
  top: 30vh;
  /* left: calc(-100vw / 2); */
  right: 0;
  pointer-events: none;
  /* max-width: 100vw !important; */
  width: 100vw;
  /* width: 200vw; */
  height: 200vh;
  mix-blend-mode: color;
  /* background: ${({ backgroundColor }) =>
    `radial-gradient(50% 50% at 50% 50%, ${
      backgroundColor ? backgroundColor : '#522900'
    } 0%, rgba(57, 33, 0, 0.9) 100%)`}; */
  background: transparent radial-gradient(closest-side at 50% 50%, #522900 0%, #20212400 0%) 0% 0% no-repeat padding-box;
  opacity: 0.2;
  transform: translateY(-100vh);
  will-change: background;
  transition: background 450ms ease;
`
/* @supports (font-variation-settings: normal) {
  html, input, textarea, button {
    font-family: 'Silkscreen', sans-serif;
    src: url(./public/fonts/VCR OSD Mono.ttf) format ('ttf');
    text-transform: uppercase;
  }
}
*/
export const FixedGlobalStyle = createGlobalStyle`
html, input, textarea, button {
  font-family: 'Rubik';
  font-display: fallback;
  font-display: fallback;
}
@supports (font-variation-settings: normal) {
  html, input, textarea, button {
    font-family: 'Rubik';
    font-display: fallback;
    lineHeight: 1;
  }
}

html,
body {
  margin: 0;
  padding: 0;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
body::-webkit-scrollbar {
  display: none;
}


 a {
   color: ${colors(false).blue1};
 }

* {
  box-sizing: border-box;
}

button {
  user-select: none;
}

html {
  font-size: 1rem;
  font-variant: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(141, 71, 0, 0);
  font-feature-settings: 'ss01' on, 'ss02' on,  'cv01' on, 'cv03' on;

}
`

export const ThemedGlobalStyle = createGlobalStyle`
html {
  color: ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.bg01};
}

body {
  min-height: 100vh;
  background-position: 0 -30vh;
  background-repeat: no-repeat;
  background-image: ${({ theme }) =>
    `radial-gradient(50% 50% at 50% 50%, ${transparentize(0.85, theme.primary4)} 0%, ${transparentize(
      1,
      theme.bg1
    )} 100%)`};
}
`
