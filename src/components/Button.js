import React from "react";

import "components/Button.scss";
import { action } from "@storybook/addon-actions/dist/preview";
import classNames from "classnames";

export default function Button(props) {
  let buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger,
  });
  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
