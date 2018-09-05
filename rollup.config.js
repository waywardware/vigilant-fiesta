import typescript from "rollup-plugin-typescript";

export default [
    {
        input: 'src/main/Main.ts',
        output: {
            file: 'compiled/src/Main.js',
            format: 'cjs'
        },
        plugins: [
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
            file: 'compiled/src/Renderer.js',
            format: 'cjs'
        },
        plugins: [
            typescript({
                target: "ES6",
                typescript: require("typescript")
            })
        ]
    }
];