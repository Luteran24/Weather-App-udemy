const weatherForm = document.querySelector("form")
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')


async function getWeather(location) {
    try {
        const response = await fetch(`/weather?address=${location}`);
        if (response.ok) {
            await response.json().then((data) => {
                if (data.data) {
                    messageOne.textContent = data.data
                    messageTwo.textContent = data.summary
                    messageThree.textContent = data.precipChance
                    messageFour.textContent = data.temperature
                }
            })
        } else {
            const data = await response.json();
            messageOne.textContent = data.error
        }
    } catch (error) {
        console.log(error.message)
    }
}

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()

    messageOne.textContent = 'Loading..'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''
    

    getWeather(search.value)

})