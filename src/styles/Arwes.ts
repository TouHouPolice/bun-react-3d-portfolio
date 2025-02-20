import { BleepsProviderSettings } from '@arwes/react'
import {
  type ThemeSettingsUnit,
  type ThemeSettingsMultiplier,
  type ThemeSettingsColor,
  type ThemeSettingsStyle,
  type ThemeUnit,
  type ThemeMultiplier,
  type ThemeColor,
  type ThemeStyle,
  type ThemeCreatorStructure,
  createCreateTheme,
  createThemeMultiplier,
  createThemeUnit
} from '@arwes/theme'

interface ThemeSettings {
  space: ThemeSettingsUnit
  spacen: ThemeSettingsMultiplier
  outline: ThemeSettingsMultiplier
  font: ThemeSettingsStyle
  color: {
    primary: ThemeSettingsColor
    secondary: ThemeSettingsColor
  }
}

interface Theme {
  space: ThemeUnit
  spacen: ThemeMultiplier
  outline: ThemeMultiplier
  font: ThemeStyle
  color: {
    primary: ThemeColor
    secondary: ThemeColor
  }
}

const themeStructure: ThemeCreatorStructure = {
  space: 'unit',
  spacen: 'multiplier',
  outline: 'multiplier',
  font: 'style',
  color: {
    primary: 'color',
    secondary: 'color',
  }
}

const themeDefaults: ThemeSettings = {
  // Values to be multiplied by a provided integer.
  // REM units.
  space: createThemeUnit((index) => `${index * 0.25}rem`),
  // Pixel units.
  spacen: createThemeMultiplier((index) => index * 4),
  outline: 1,
  // A list of styles with any CSS properties.
  font: [
    { fontFamily: 'Electrolize', fontWeight: 600, fontSize: '2rem' },
    { fontFamily: 'Tomorrow', fontWeight: 500, fontSize: '2rem' },
    { fontFamily: '"Titillium Web"', fontWeight: 300, fontSize: '1.5rem' }
  ],
  color: {
    // A function to return a HSLA value as [number, number, number, number?].
    // The colors go from light to dark.
    primary: (i) => [199, 65 + i, 90.5 - i * 9.44],
    secondary: (i) => [60, 60 + i, 92.5 - i * 9.44],
  }
}

const createTheme = createCreateTheme<ThemeSettings, Theme>(themeStructure, themeDefaults)

const theme = createTheme({
  outline: 3
})

type BleepsNames = 'click' | 'type' | 'hover'
const bleepsSettings: BleepsProviderSettings<BleepsNames> = {
  master: { volume: 0.5 },
  categories: {
      background: { volume: 0.25 },
      transition: { volume: 0.5 },
      interaction: { volume: 0.75 },
      notification: { volume: 1 }
  },
  bleeps: {
      hover: {
        category: 'background',
        sources: [
            { src: '/assets/sounds/hover.webm', type: 'audio/webm' }
        ]
      },
      click: {
        category: 'interaction',
        sources: [
            { src: '/assets/sounds/click.webm', type: 'audio/webm' }
        ],
      },
      type: {
          category: 'background',
          sources: [
              { src: '/assets/sounds/type.mp3', type: 'audio/mpeg' }
          ]
      }

  }
}

export { theme, bleepsSettings }

export type { BleepsNames }