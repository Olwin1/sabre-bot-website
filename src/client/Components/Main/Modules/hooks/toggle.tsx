import React from "react";
export default function useToggle(initialValue = false) {
  const [value, setValue] = React.useState(initialValue);
  const toggle = () => {
    setValue(!value);
  };
  return [value, toggle] as const;
}
