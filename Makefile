CC=clang
CFLAGS=--target=wasm32 -fvisibility=hidden
LFLAGS=-Wl,--import-memory,--no-entry,--strip-all,--export-dynamic,--allow-undefined-file=wasm.syms -nostdlib

FILE=hello

$(FILE).wasm: $(FILE).c wasm-def.h Makefile
	$(CC) $(CFLAGS) $(LFLAGS) $< -o $@

clean:
	rm -f $(FILE).wasm
