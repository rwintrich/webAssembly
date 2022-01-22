class WasmLoader {
    constructor() {

    }
    async wasm(path) {
        console.log(`fetching ${path}`);
        if (!WebAssembly.instantiateStreaming) {
            return this.wasmFallBack(path);
        }
        const { instance } = await WebAssembly.instantiateStreaming(fetch(path));

        return instance?.exports;

    }

    //for safari
    async wasmFallBack() {
        console.log(`Using fallback`);
        const response = await fetch(path);
        const bytes = await response?.arrayBuffer();
        const { instance } = await webAssembly.instantiate(bytes);
        return instance?.exports;
    }
}