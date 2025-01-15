import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				'50': '#E6F2FF',
  				'100': '#EAF2FC',
  				'400': '#4891D5',
  				'500': '#257CDB',
  				'600': '#2A5F91',
  				'700': '#113354',
  				'900': '#223369'
  			},
  			light: {
  				'300': '#64748B',
  				'400': '#858EAD',
  				'700': '#D3D6E1',
  				'800': '#F5F5F5',
  				'900': '#FFFFFF'
  			},
  			dark: {
  				'100': '#000000',
  				'200': '#1F2937',
  				'300': '#374151',
  				'400': '#6B7280'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			'1.5': '6px',
  			'2': '8px',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {},
  		backgroundImage: {},
  		screens: {
  			xs: '420px'
  		},
  		fontFamily: {
  			inter: [
  				'var(--font-inter)'
  			]
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
