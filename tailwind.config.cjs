/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.html",
    "./_includes/**/*.html",
    "./_layouts/**/*.html",
    "./_posts/**/*.md",
    "./fr/**/*.html",
    "./ar/**/*.html",
    "./assets/js/**/*.js",
    "./src/js/**/*.js",
    "!./node_modules/**",
    "!./_site/**"
  ],
  safelist: [
    { pattern: /^(bg|text|border|from|via|to|ring)-(cnss|cmr|cnops)(-light|-dark|-muted)?$/ },
    { pattern: /^(bg|text|border)-(medical|trust|safe)(-light|-dark)?$/ },
    'border-l-4',
    'border-l-2',
    'hover:bg-cnss-dark',
    'hover:bg-cmr-dark',
    'hover:bg-cnops-dark',
    'hover:ring-cnss',
    'hover:ring-cmr',
    'hover:ring-cnops',
    'focus:ring-cnss',
    'focus:ring-cmr',
    'focus:ring-cnops',
  ],
  theme: {
    extend: {
      colors: {
        // Organization colors - refined for medical/professional feel
        'cnss': {
          DEFAULT: '#1e5f8a',
          light: '#f0f7fc',
          muted: '#e8f4fc',
          dark: '#164a6c'
        },
        'cmr': {
          DEFAULT: '#2d7d7d',
          light: '#f0f9f9',
          muted: '#e5f5f5',
          dark: '#1f5c5c'
        },
        'cnops': {
          DEFAULT: '#2d6a4f',
          light: '#f0f7f4',
          muted: '#e5f3ed',
          dark: '#1b4332'
        },
        // Medical/Trust colors
        'medical': {
          DEFAULT: '#1e5f8a',
          light: '#f8fafc',
          dark: '#0f3d5c'
        },
        'trust': {
          DEFAULT: '#0d9488',
          light: '#f0fdfa',
          dark: '#0f766e'
        },
        'safe': {
          DEFAULT: '#059669',
          light: '#ecfdf5',
          dark: '#047857'
        },
        // UI colors
        'primary': '#1e5f8a',
        'secondary': '#2d7d7d',
        'accent': '#0d9488',
        // Surface colors
        'surface': {
          DEFAULT: '#ffffff',
          muted: '#f8fafc',
          subtle: '#f1f5f9',
          border: '#e2e8f0'
        },
        // Text colors
        'content': {
          DEFAULT: '#1e293b',
          muted: '#475569',
          subtle: '#64748b',
          inverse: '#ffffff'
        },
        // Footer
        'footer': {
          DEFAULT: '#0f172a',
          surface: '#1e293b',
          text: '#94a3b8',
          border: '#334155'
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        'tajawal': ['Tajawal', 'system-ui', 'sans-serif']
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'headline': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'title': ['1.5rem', { lineHeight: '1.3' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75' }],
      },
      boxShadow: {
        'soft': '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 4px 16px -4px rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 12px -2px rgba(0, 0, 0, 0.08), 0 8px 24px -4px rgba(0, 0, 0, 0.06)',
        'elevated': '0 8px 24px -4px rgba(0, 0, 0, 0.1), 0 16px 40px -8px rgba(0, 0, 0, 0.08)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.06)',
        'inner-soft': 'inset 0 2px 4px rgba(0, 0, 0, 0.03)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
    }
  },
  plugins: []
}
