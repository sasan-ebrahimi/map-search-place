import { moderateScale } from 'react-native-size-matters';

/**
 * Declare and export some size for spacing, fonts, etc
 * To be used in other views
 * moderateScale method is used to adapt size based on screen resolution and size
 * So the views will be shown properly in different screen sizes
 */
export const SPACE_XXSMALL = moderateScale(4)
export const SPACE_XSMALL = moderateScale(6)
export const SPACE_SMALL = moderateScale(8)
export const SPACE_MEDIUM = moderateScale(10)
export const SPACE_LARGE = moderateScale(12)
export const SPACE_XLARGE= moderateScale(14)
export const SPACE_XXLARGE= moderateScale(16)

export const FONT_SIZE_XSMALL= moderateScale(10)
export const FONT_SIZE_SMALL= moderateScale(12)
export const FONT_SIZE_NORMAL= moderateScale(14)
export const FONT_SIZE_LARGE= moderateScale(16)
export const FONT_SIZE_XLARGE= moderateScale(18)

export const FONT_SIZE_TITLE = FONT_SIZE_LARGE
export const FONT_SIZE_SUB_TITLE = FONT_SIZE_SMALL

export const MARKER_ICON_SIZE = moderateScale(25)