let serch_bar = document.querySelector('.wrap') // Serch barS
let input = document.querySelector('#search_input') // Input


input.addEventListener('input', async event => {

    let search = input.value

    const endpoint = `https://en.wikipedia.org/w/api.php?action=opensearch&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&search=${search}`;


    fetch(endpoint).then(async res => {
        let non = await res.json()
        console.log(non);
    }).catch(error => {
        console.error(error)
    })


})


