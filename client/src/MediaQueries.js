const size = {
  mobileL: '126px',
  mobileAltMax: '425px',
  mobileMax: '999px',
  tablet: '1000px',
  tabletMax: '1250px',
  tabletAlt: '426px',
  tabletAltMax: '768px',
}

export const breakpoints = {
  mobileMin: '480px',
  mobileMax: '959px',
  tabletMin: '960px',
  tabletMax: '1199px',
  desktopMin: '1200px',
  largeDesktopMin: '1440px',
}

export const MediaQueries = {
  mobileL: `(min-width: ${size.mobileL})`,
  mobileMax: `(max-width: ${size.mobileMax})`,
  mobileAltMax: `(max-width: ${size.mobileAltMax})`,
  tablet: `(min-width: ${size.tablet})`,
  tabletMax: `(max-width: ${size.tabletMax})`,
  tabletAlt: `(min-width: ${size.tabletAlt})`,
  tabletAltMin: `(min-width: ${size.tabletAltMax})`,
  tabletAltMax: `(max-width: ${size.tabletAltMax})`,
}
