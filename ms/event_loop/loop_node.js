// node ./ms/event_loop/loop_node.js

function test() {
  console.log('1');

  setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
      console.log('3');
    })
    new Promise(function(resolve) {
      console.log('4');
      resolve();
    }).then(function() {
      console.log('5')
    })
  })
  
  setImmediate(function() {
    console.log("五")
  })
  
  process.nextTick(function() {
    console.log('6');
  })
  
  setImmediate(function() {
    console.log("六")
  })
  
  new Promise(function(resolve) {
    console.log('7');
    resolve();
  }).then(function() {
    console.log('8')
  })
  
  setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
  })
  
}


// 1 7 6 8
// 由于两个setTimeout延时相同，被合并入了同一个expired timers queue，而一起执行了
// process.tick 优于Promise.then
// 2 4 9 11
// 3 10 5 12
// 五
// 六

setTimeout(() => {
	console.log("--setTimeout--")	
})

setImmediate(() => {
	console.log("--setImmediate--")
})

// 虽然可以保证 setTimeout 和 setImmediate 的回调不会混在一起执行，
// 但无法保证的是 setTimeout 和 setImmediate 的回调的执行顺序。
// 不能保证谁一定先执行
// 关键在于setTimeout何时到期，只有到期的 setTimeout 才能保证在setImmediate之前执行。