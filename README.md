WASM helloworld
===============

WebAssembly version of the timeless program :)  Demonstrates the state of LLVM WASM toolchain.

WASM tooling is under active development, so this page go out of date without prior notice.

## Prerequisites

LLVM development branch, including Clang and LLD. The branch builds with WASM suport by default.

## Building and running

```
$ make
clang --target=wasm32 -fvisibility=hidden -Wl,--import-memory,--no-entry,--strip-all,--export-dynamic,--allow-undefined-file=wasm.syms -nostdlib hello.c -o hello.wasm
```

Run with your CLI engine of choice:

```
$ ch run.js
Hello world from WASM
```

## How does it work

WebAssembly does not have I/O, that's why we have to expose a function from JavaScript that would print the greeting for us. And since C represents strings as a null-terminated sequences of bytes and JavaScript does not we have to do a bit of processing before we print it. Print function becomes an _undefined symbol_ from linker's point of view, and we have to instruct it to allow it.

In addition to importing a print function, module needs to export an entry point, and should avoid exporting any other functions. This is done by forcing all functions to be hidden and giving default visibility to the ones we want to be available in JavaScript.

Compiler flags used:

- `--target=wasm32` -- output WASM
- `-fvisibility=hidden` -- don't export functions by default
- `-nostdlib` -- don't try to link with standard library

Linker flags:

- `--import-memory` -- use memory instantiated by JavaScript driver
- `--no-entry` -- no standard entry point
- `--strip-all` and `--export-dynamic` -- export only the symbols we want to be visible
- `--allow-undefined-file=wasm.syms`  -- symbols we allow to be undefined (imported from JavaScript)

