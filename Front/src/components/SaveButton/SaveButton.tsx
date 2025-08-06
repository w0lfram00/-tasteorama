import React from "react";
import Flag from "./Flag";

interface Props {
  text?: string;
}

const SaveButton = ({ text }: Props) => {
  return (
    <button>
      {text}
      <Flag />
    </button>
  );
};

export default SaveButton;
