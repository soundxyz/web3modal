import styledPkg from "styled-components";

function getDefault<T>(v: T | { default?: T }) {
  return (("default" in v ? v.default : v) || v) as T;
}

export const styled = getDefault(styledPkg);
