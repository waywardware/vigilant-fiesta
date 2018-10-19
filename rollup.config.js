import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

export default [
    {
        input: 'src/coreElectron/Main.ts',
        output: {
            file: 'dist/main.js',
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
        input: 'src/pages/Index.tsx',
        output: {
            file: 'dist/index.js',
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