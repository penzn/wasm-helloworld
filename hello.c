#include "wasm-def.h"

export void
say_hello(void) {
  console_print("Hello world from WASM");
}
