/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,vue}",
    ],
    purge: ['./resources/js/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [],
    variants: {
        extend: {
            // ...
            tableLayout: ['hover', 'focus'],
        }
    }
}

