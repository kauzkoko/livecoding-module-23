export default function (sketch,  id) {
  let myp5 = ref()
  onMounted(() => {
    if (id) myp5.value = new p5(sketch, id)
    else myp5.value = new p5(sketch)
  })
  return myp5
}