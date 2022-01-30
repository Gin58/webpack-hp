const DESTYLE = "./src/styles/destyle.css";
const COMMON = "./src/styles/style.scss";

const entries = {
  main: ["./src/js/main.ts"],
  about: ["./src/js/about.ts", "./src/styles/about.scss"],
};

for (let [_, value] of Object.entries(entries)) {
  value.push(DESTYLE, COMMON);
}

export default entries;
