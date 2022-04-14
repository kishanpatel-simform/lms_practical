const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')
weatherForm.addEventListener('submit', (e) => {

    const placelocation = search.value
    e.preventDefault()
        //    console.log(placelocation)
    messageone.textContent = 'Loading../'
    messagetwo.textContent = ''
    fetch('/weather?address=' + placelocation).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageone.textContent = data.error
            } else {
                messageone.textContent = "Location:- " + data.location
                messagetwo.textContent = "ForeCast:-  " + data.forecast
            }
        })
    })
})