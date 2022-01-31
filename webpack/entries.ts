const DESTYLE = "./src/styles/destyle.css";
const COMMON = "./src/styles/style.scss";

const entries = {
  main: ["./src/js/main.ts", "./src/styles/main.scss"],
  about: ["./src/js/about.ts", "./src/styles/about.scss"],
  "mast/hello": ["./src/js/mast/hello.ts", "./src/styles/mast/hello.scss"],
};

for (let [_, value] of Object.entries(entries)) {
  value.push(DESTYLE, COMMON);
}

export default entries;
