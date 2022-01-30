import $ from "jquery";
import { addNewText } from "~/js/function";
import "../styles/style.scss";

$("#submmit").on("click", () => {
  return addNewText("#app", "#inputs");
});

const message = "use in IE";
() => {
  console.log(message);
};
