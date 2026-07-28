const extensionToTypeMapper = {
  js: "javascript",
  jsx: "javascript",
  ts: "typescript",
  tsx: "typescript",

  // Web
  html: "html",
  htm: "html",
  css: "css",
  scss: "scss",
  sass: "sass",
  less: "less",

  // Data
  json: "json",
  xml: "xml",
  yaml: "yaml",
  yml: "yaml",
  toml: "toml",

  // Markdown
  md: "markdown",

  // Backend
  py: "python",
  java: "java",
  c: "c",
  cpp: "cpp",
  cc: "cpp",
  cxx: "cpp",
  h: "cpp",
  hpp: "cpp",
  cs: "csharp",
  go: "go",
  rs: "rust",
  php: "php",
  rb: "ruby",
  swift: "swift",
  kt: "kotlin",

  // Shell
  sh: "shell",
  bash: "shell",
  zsh: "shell",
  ps1: "powershell",

  // Database
  sql: "sql",

  // Config
  env: "shell",
  gitignore: "plaintext",
  dockerfile: "dockerfile",

  // Frameworks
  vue: "vue",
  svelte: "svelte",

  // Others
  txt: "plaintext",
  csv: "plaintext",
  log: "plaintext",
  ini: "ini",
  svg: 'svg'
};


export const extensionToFileType = (extension) => {
    if(!extension) return undefined;
    return extensionToTypeMapper[extension.toLowerCase()] || undefined;
}