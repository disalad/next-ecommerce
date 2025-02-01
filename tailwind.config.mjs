/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/context/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
            },
            screens: {
                'sm-md': '500px',
                'phone-sm': '420px',
                phone: '767px',
                'tablet-lg': '1024px',
                'desktop-lg': '1202px',
            },
        },
    },
    plugins: [],
};
