let imports = {}
let mem = null

imports["memory"] = new WebAssembly.Memory({initial:64});
imports["console_print"] = function(start) {
  let str = "";
  let i = start;
  while (mem[i] != 0) {
    // TextDecoder is not awailable in all engines yet
    str += String.fromCharCode(mem[i]);
    ++i;
  }
  console.log(str);
}

const module = new WebAssembly.Module(readbuffer('hello.wasm'));
const instance = new WebAssembly.Instance(module, { "env" : imports}).exports;
mem = new Uint8Array(imports["memory"]["buffer"]);

instance["say_hello"]();

