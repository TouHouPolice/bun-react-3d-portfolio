import {
    createThemeUnit,
    createThemeMultiplier,
    createThemeColor,
    createThemeBreakpoints
  } from 'arwes'
  
  const theme = Object.freeze({
    // REM units.
    space: createThemeUnit((index) => `${index * 0.25}rem`),
  
    // Pixel units.
    spacen: createThemeMultiplier((index) => index * 4),
  
    // Media query breakpoints.
    breakpoints: createThemeBreakpoints([
      { key: '3sm', value: '375px' },
      { key: '2sm', value: '410px' },
      { key: 'sm', value: '640px' },
      { key: 'md', value: '768px' },
      { key: 'lg', value: '1024px' },
      { key: 'xl', value: '1280px' },
      { key: '2xl', value: '1536px' },
      { key: '3xl', value: '1980px' }
    ]),
  
    // Color palettes.
    colors: {
      primary: createThemeColor(i => [180, 10 + i, 92.5 - i * 9.44]),
      secondary: createThemeColor(i => [60, 10 + i, 92.5 - i * 9.44])
    },
  
    // Typography.
    fontFamily: {
      header: ['Tomorrow', 'sans-serif'],
      body: ['Roboto', 'sans-serif']
    }
  })
  
  export { theme }