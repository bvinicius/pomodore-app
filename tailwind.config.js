/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        fontFamily: {
            sans: ['Montserrat', 'sans-serif']
        },
        extend: {
            fontSize: {
                '4xl': '2.375rem',
                '6xl': '3.562rem'
            },
            colors: {
                primary: {
                    400: '#41A3CD',
                    500: '#4B8AA5'
                },
                'on-container': {
                    300: '#aaa',
                    400: '#919191'
                },
                'primary-container': {
                    400: '#323240',
                    500: '#222230'
                },
                gray: {
                    777: '#777'
                }
            },
            spacing: {
                4.5: '1.125rem',
                15: '3.75rem',
                18: '4.5rem',
                27.5: '6.875rem',
                68: '17rem',
                94: '23.5rem'
            },
            dropShadow: {
                primary: '0px 2px 2px rgba(0, 0, 0, 0.25)',
                'primary-active': '0px 0px 6px #F5F5F5'
            },
            animation: {
                fade: 'fade 0.3s ease-in-out'
            },
            keyframes: {
                fade: {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 }
                }
            }
        }
    },
    plugins: []
};
