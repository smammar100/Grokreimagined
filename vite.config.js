import restart from 'vite-plugin-restart'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'
import basicSsl from '@vitejs/plugin-basic-ssl'
import path from 'path'
import Terminal from 'vite-plugin-terminal'
//import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";


const dirname = path.resolve()

const isCodeSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env

export default ({ mode }) => ({
    root: 'src/',
    publicDir: '../static/',
    base: './',
        resolve:
        {
            alias:
                {
                    '@experience' : path.resolve(dirname, './src/Experience/'),
                    '@' : path.resolve(dirname, './src/'),
                }
        },
    server:
    {
        host: true,
        open: !isCodeSandbox, // Open if it's not a CodeSandbox
        headers: {
            'Cross-Origin-Opener-Policy': 'same-origin',
            'Cross-Origin-Embedder-Policy': 'require-corp',
        },
    },
    build:
    {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: mode !== 'production',
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('three')) return 'vendor-three'
                        if (id.includes('react') || id.includes('react-dom')) return 'vendor-react'
                        if (id.includes('gsap')) return 'vendor-gsap'
                        return 'vendor'
                    }
                },
            },
        },
    },
    plugins:
    [
        react(),
        restart({ restart: [ '../static/**', ] }), // Restart server on static file change
        glsl(),
        basicSsl(),
        // Terminal({
        //     console: 'terminal',
        //     output: ['terminal', 'console']
        // })
        // obfuscatorPlugin({
        //     options: {
        //         //include: ["src/path/to/file.js", "path/anyjs/**/*.js", /foo.js$/],
        //         exclude: [/node_modules/],
        //         apply: "build",
        //         debugger: true,
        //         // your javascript-obfuscator options
        //         debugProtection: true,
        //         // ...  [See more options](https://github.com/javascript-obfuscator/javascript-obfuscator)
        //     },
        // }),
    ]
})
