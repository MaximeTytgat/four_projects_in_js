let serch_bar = document.querySelector('.wrap') // Serch barS
let input = document.querySelector('#search_input') // Input
let search_result = document.querySelector('.search_result')




const create_element = (tag, className) => {
    const element = document.createElement(tag);
    element.setAttribute("class", className);
    return element;
}





const create_result_block = (title, url, desc) => {
    let result_container = create_element('div', 'result_container');
    let juigoogleresult = create_element('div', 'jui-google-result');

    let result__headline = create_element('div', 'jui-google-result__headline');
    result__headline.innerHTML = '<a href="' + url + '" target="_blank">' + title + '</a><span class="icon-edit">';
    let result__link = create_element('div', 'jui-google-result__link');
    result__link.innerHTML = '<a href="' + url + '" target="_blank">' + url + '</a><span class="icon-edit">';
    let result__description = create_element('div', 'jui-google-result__description');
    result__description.innerHTML ='<a href="' + url + '" target="_blank">' +  desc + '</a><span class="icon-edit">';

    juigoogleresult.appendChild(result__headline);
    juigoogleresult.appendChild(result__link);
    juigoogleresult.appendChild(result__description);
    result_container.appendChild(juigoogleresult);
    search_result.appendChild(result_container);
}



input.addEventListener('input', async () => {

    let search = input.value
    const endpoint = `https://en.wikipedia.org/w/api.php?action=opensearch&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&search=${search}`;

    fetch(endpoint).then(async res => {
        let result = await res.json()

        while (search_result.firstChild) {
            search_result.removeChild(search_result.firstChild);
        }

        for (const i in result[1]) {
            const endpoint = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&origin=*&exintro&explaintext&redirects=1&titles=${result[1][i]}`;
            fetch(endpoint).then(async res => {
                result_desk = await res.json()
                let desc = result_desk.query.pages[Object.keys(result_desk.query.pages)[0]].extract.split('. ');
                let desc_reduce = desc[0] + desc[1]
                create_result_block(result[1][i], result[3][i], desc_reduce);
            })
        }

    }).catch(error => {
        console.error(error)
    })


})


