const approot = document.getElementById('app-root')
// Select the template
const test = document.querySelector('#test').innerHTML
console.log(test)
let result = ''
const html = Mustache.render(test, { result })
approot.insertAdjacentHTML('afterend', html)

const resultDiv = document.querySelector('.result');





// Insert the template into the DOM

const urlForm = document.querySelector('form');
urlForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const urlInput = document.getElementById('floatingInput').value;
    const slugInput = document.getElementById('floatingInput2').value;
    console.log("urlis", urlInput, slugInput)
    const response = await fetch('https://ay-url-shortner.herokuapp.com/url', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            url: urlInput,
            slug: slugInput || undefined,
        }),
    });
    if (response.status === 200) {
        result = await response.json();
        resultDiv.style.display = "block"
        resultDiv.innerHTML = `<a target="_blank" href=\' ${document.URL}${result.slug} \' > ${document.URL}${result.slug}</a > `;
    }
    else if (response.status === 429) {
        this.error = 'You are sending too many requests. Try again in 30 seconds.';
    } else {
        const result = await response.json();
        resultDiv.innerHTML = `Error :${response.status, result}`;
    }
})
