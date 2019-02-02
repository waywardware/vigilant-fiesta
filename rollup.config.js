import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import resolve from "rollup-plugin-node-resolve";
import cjs from "rollup-plugin-commonjs";

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
            resolve(),
            cjs(),
            terser(),
            typescript({
                target: "ES6",
                typescript: require("typescript")
            })
        ]
    }
];
