const search = document.querySelector('#search');
const output = document.querySelector('#output');
const collection = document.querySelector('.collection');

search.addEventListener('input', startSearch);

async function startSearch(e) {
    const searchText = e.target.value;
    const results = await fetchAPI();

    const searchResults = results.filter(r => {
        const regexp = new RegExp(`^${searchText}`);
        return r.title.match(regexp) || r.body.match(regexp);
    })

    buildHTML(searchResults)

}

function buildHTML(searchResults){

    const rhtml = searchResults.map(s => {
        return `
        <br />
        <li class="collection-item">
        ${s.title}
        <br />
        ${s.body}
        </li>
        <br />
        `
    }).join('');

    console.log(rhtml);

    collection.innerHTML = rhtml;
}

async function fetchAPI(){
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const jsonRes = await res.json();
    return jsonRes;
}

