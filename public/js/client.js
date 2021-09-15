const approot = document.getElementById('root')
// Select the template
const test = document.querySelector('#test').innerHTML
console.log(test)
const html = Mustache.render(test, { message: "test" })


// Insert the template into the DOM
approot.insertAdjacentHTML('afterend', html)
