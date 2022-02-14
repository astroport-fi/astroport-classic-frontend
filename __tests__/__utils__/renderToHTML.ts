import { ReactElement } from "react";
import ReactDOM from "react-dom";

const renderToHTML = (element: ReactElement) => {
  const container = document.createElement("div");
  ReactDOM.render(element, container);
  return container.innerHTML;
};

export default renderToHTML;
