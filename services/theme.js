//this js contains color name for both dark and light mode and a function to insert 
//this colors as css root variables
const themes = {
  light: {
    hover: "#486dbd1f",
    active: "#EDF7FA",
    element: "#EDF7FA",
    background: "#F2F2F5",
    primary: "#0090B8",
    grey: "#dadce7",
    darkGreyText: "#45495D",
    greyText: "#656A81",
    lightGrey: "#E6EAEE",
    lightBlue: "#D9E8FF",
    cardBg: "#fff",
    lightGreen: "#88D4AB",
    lightRed: "#F89EA2",
    lightestGrey: "#F6F8FA",
    lightBlue_2: "#D9E8FF",
  },
  dark: {
    hover: "#486dbd3d",
    active: "#d2eff811",
    element: "#EDF7FA",
    background: "#2a2e30",
    primary: "#0090B8",
    grey: "#3a3a3b",
    darkGreyText: "#fff",
    greyText: "#fff",
    lightGrey: "#fff",
    lightBlue: "#7ea6e3",
    cardBg: "#1E1E1E",
    lightBlue_2: "#D9E8FF",
  },
};

export const ThemingService = {
  changeTheme(themeVal) {
    this.setTheme(themes[themeVal]);
  },
  // this function insert colors to css root variables as requested theme 
  setTheme(themeVal) {
    Object.keys(themeVal).forEach((k) =>
      document.documentElement.style.setProperty(`--${k}`, themeVal[k])
    );
  },
};
