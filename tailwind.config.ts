import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transitionTimingFunction: {
        "custom-ease": "cubic-bezier(0.1, 0.57, 0.1, 1)",
      },
      backgroundColor: {
        kia: "#a32525",
        nc: "#1d467d",
        lotte: "#082c5a",
        doosan: "#131230",
        lg: "#c63751",
        kt: "#231f20",
        kiwoom: "#6c1126",
        samsung: "#0472c4",
        hanhwa: "#ed7c3d",
        ssg: "#b42c4d",
      },
      width: {
        "49p": "49%",
        "0.1rem": "0.1rem",
      },
      spacing: {
        "13": "3.25rem",
        "15": "3.75rem",
        "128": "32rem",
        "144": "36rem",
        "4.5": "18px", // padding-top, padding-left
        "5.25": "21px", // padding-bottom
      },
      content: {
        divider: '""',
      },
      height: {
        "1.2rem": "1.2rem",
      },

      colors: {
        "custom-gray": "#ddd",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  safelist: [
    "bg-kia",
    "bg-kt",
    "bg-doosan",
    "bg-lotte",
    "bg-samsung",
    "bg-hanhwa",
    "bg-nc",
    "bg-lg",
    "bg-kiwoom",
    "bg-ssg",
  ],
  plugins: [],
};
export default config;
