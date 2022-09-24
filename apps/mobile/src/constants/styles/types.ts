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
    };
    buttons: {
      fill: {
        background: string;
        text: string;
      };
    };
  };
}
