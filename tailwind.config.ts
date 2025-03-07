
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Custom colors for Lua Executor
				executor: {
					dark: '#1E1E2E',       // Catppuccin Mocha Base
					purple: '#CBA6F7',     // Catppuccin Mocha Mauve
					light: '#CDD6F4',      // Catppuccin Mocha Text
					secondary: '#313244',   // Catppuccin Mocha Surface0
					accent: '#F5C2E7',      // Catppuccin Mocha Pink
				},
				// Catppuccin Mocha full palette
				mocha: {
					rosewater: '#F5E0DC',
					flamingo: '#F2CDCD',
					pink: '#F5C2E7',
					mauve: '#CBA6F7',
					red: '#F38BA8',
					maroon: '#EBA0AC',
					peach: '#FAB387',
					yellow: '#F9E2AF',
					green: '#A6E3A1',
					teal: '#94E2D5',
					sky: '#89DCEB',
					sapphire: '#74C7EC',
					blue: '#89B4FA',
					lavender: '#B4BEFE',
					text: '#CDD6F4',
					subtext1: '#BAC2DE',
					subtext0: '#A6ADC8',
					overlay2: '#9399B2',
					overlay1: '#7F849C',
					overlay0: '#6C7086',
					surface2: '#585B70',
					surface1: '#45475A',
					surface0: '#313244',
					base: '#1E1E2E',
					mantle: '#181825',
					crust: '#11111B',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-light': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' }
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-light': 'pulse-light 2s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
