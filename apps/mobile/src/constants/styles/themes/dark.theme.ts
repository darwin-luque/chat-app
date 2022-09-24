import { ITheme } from '../types';

export const darkTheme: ITheme = {
  colors: {
    background: '#16162C',
    text: '#F6F6F6',
    link: '#4e0eff',
    inputBorder: '#F6F6F6',
    success: '#4BCA81',
    grays: {
      100: '#F6F6F6',
      200: '#EAEAEA',
      300: '#D8D8D8',
      400: '#C4C4C4',
      500: '#A0A0A0',
      600: '#7A7A7A',
      700: '#454545',
    },
    buttons: {
      fill: {
        background: '#F6F6F6',
        text: '#16162C',
      },
    },
    tab: {
      background: '#16162C',
      inactive: '#F6F6F6',
      line: '#0f0f22',
      active: '#4e0eff',
    }
  },
};
