const c = (el)=>document.querySelector(el);
const cl = (el)=>document.querySelectorAll(el);

pizzaJson.map((item, index)=>{
    let pizzaItem = c('.models .pizza-item').cloneNode(true);
//preencher as informações e, pizzaitem

c('.pizza-area').append(pizzaItem);
});
