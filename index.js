async function getRecipes() {
    const apiId = '9b935d7a';
    const apiKey = '0d3a9995ca41ea8d03061b74214b728e';
    const searchValue = document.getElementById('search').value

    let url = `https://api.edamam.com/search?q=${searchValue}&app_id=${apiId}&app_key=${apiKey}&from=0&to=9`;
    try {
        let response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderRecipes() {

    let recipesObj = await getRecipes();
    let recipes = recipesObj.hits;
    //console.log(recipesObj)
    let html = '';
    //console.log(recipes)

    recipes.forEach(e => {
        //console.log(e.recipe.image, e.recipe.label)
        let htmlSegment = `<div class='recipe'>
                                <a href='${e.recipe.url}' target='_blank' class='recipe-link'>
                                <img class='recipe-image' src='${e.recipe.image}'>
                                <p class='recipe-name'>${e.recipe.label}</p>
                                </a>
                           </div>`
        
        html += htmlSegment;
 
    });

    let container = document.querySelector('.container');
    container.innerHTML = html;
    
}

document.getElementById('search').addEventListener('keyup', function(event){
    // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("btn").click();
  }
})

document.getElementById("btn").addEventListener('click', renderRecipes)

