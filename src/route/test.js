let r = require.context('../components/test', true, /\.vue$/)
// console.log('r = ', r)
let test = []
// console.log('keys = ', r.keys())
window.r = r
r.keys().map(name => {
  // console.log('name = ', name)
  // console.log('n = ', r(name))
  const nameArr = name.split('.')
  const comp = r(name).default
  test.push({
    path: `/test${nameArr[1]}`,
    component: comp,
    title: comp.name
  })
});
// console.log('test = ', test)

export default test