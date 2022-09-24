export interface ITheme {
  colors: {
    background: string;
    text: string;
    inputBorder: string;
    link: string;
    success: string;
    tab: {
      background: string;
      inactive: string;
      line: string;
      active: string;
    }
    grays: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
    };
    buttons: {
      fill: {
        background: string;
        text: string;
      };
    };
    white: string;
    black: string;
    card: {
      background: string;
      shadow: string;
    }
  };
}
