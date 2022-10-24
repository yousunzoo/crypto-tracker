import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
    liColor: string;
    liTextColor: string;
    liHoverColor: string;
    titleColor: string;
    btnColor: string;
    itemColor: string;
    itemTextColor: string;
    tabColor: string;
    tabTextColor: string;
    toggleColor: string;
    tabLiColor: string;
  }
}
