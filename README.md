**_MY VERY BASIC INTERPRETER_** 

**Deno installation**
  *macOS and Linux (Using Shell Script)*
  curl -fsSL https://deno.land/x/install/install.sh | sh

**Follow instructions of installation**
  Manually add the directory to your $HOME/.zshrc (or similar)
  export DENO_INSTALL="file_path"
  export PATH="$DENO_INSTALL/bin:$PATH"

**Verify if installed correctly**
  deno --version

**RUN PROJECT**
  deno run main.ts
