import $ from "jquery";

export const addNewText = (to: string, input: string) => {
  let text = $(input).val();
  $(to).append("<p>" + text + "</p>");
  $(input).val("");
};
