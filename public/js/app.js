console.log('client side javascript file load')

// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//      response.json().then((data) => {
//         console.log(data)
//      })  
// })

fetch('/weather?address=boston').then((response) =>{
        response.json().then((data) => {
            if(data.error) {
               console.log(data.error)
            }else{
               
                // console.log(data.location)
                // console.log(data. forcast)
            }
            
        })
    })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    console.log(location)

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' +location).then((response) =>{
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
            }else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forcast
                // console.log(data.location)
                // console.log(data. forcast)
            }
            
        })
    })
})