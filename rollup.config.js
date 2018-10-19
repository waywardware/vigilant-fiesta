import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

export default [
    {
        input: 'src/main/Main.ts',
        output: {
            file: 'dist/Main.js',
            format: 'cjs'
        },
        plugins: [
            terser(),
            typescript({
                target: "ES6",
                typescript: require("typescript")
            })
        ],
        external: ['electron']
    },
    {
        input: 'src/renderer/Renderer.tsx',
        output: {
            file: 'dist/Renderer.js',
            format: 'cjs'
        },
        plugins: [
            terser(),
            typescript({
                target: "ES6",
                typescript: require("typescript")
            })
        ]
    }
];