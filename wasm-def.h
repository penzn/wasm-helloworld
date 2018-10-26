#define export __attribute__ ((visibility("default"))) 

/* Functions imported from JS into WASM */
void console_print(char * str);
