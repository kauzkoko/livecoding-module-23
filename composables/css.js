export const css = (name, value) => {
  const temp = useCssVar("--" + name);
  temp.value = value;
  console.log(temp.value);
  return temp;
};
