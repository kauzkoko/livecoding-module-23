export const agen = (times = 10, cb = () => true, fill = true) => {
  return Array.from(new Array(times).fill(fill), (x, i) => cb(x, i));
};
