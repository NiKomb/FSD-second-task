let sum = (a, b) => a + b
console.log(sum(1, 5))

async function start() {
  return await Promise.resolve('async is working')
}

start().then(console.log)

class Util {
  static id = Date.now()
}

console.log('Util', Util.id)
