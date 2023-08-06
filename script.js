let modalQt = 1;

const c = (el)=>document.querySelector(el);
const cl = (el)=>document.querySelectorAll(el);

// Listagem das pizzas
pizzaJson.map((item, index)=>{
    //instrutura clonada
    let pizzaItem = c('.models .pizza-item').cloneNode(true);
    // adicionou um novo atributo no id 
    pizzaItem.setAttribute('data-key', index);
    // imagem colocada ela foi retirada da array
    pizzaItem.querySelector(".pizza-item--img img").src = item.img; 
    pizzaItem.querySelector(".pizza-item--price").innerHTML = `R$ ${ item.price. toFixed(2) }`;
    pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name; 
    pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description;

    //Evento de Click do modal 
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQt = 1;
       

        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML =  `R$ ${ pizzaJson[key].price. toFixed(2) }`;
        c('.pizzaInfo--size.selected').classList.remove('selected');
        cl('.pizzaInfo--size').forEach((size, sizeIndex)=>{

            if(sizeIndex == 2){
                size.classList.add('selected');
            }
            
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });
        //Evento de abrir o Modal
      c('.pizzaInfo--qt').innerHTML = modalQt;

      c('.pizzaWindowArea').style.opacity= 0;
      c('.pizzaWindowArea').style.display = 'flex';
      setTimeout(()=>{
        c('.pizzaWindowArea').style.opacity= 1;
      }, 200);
    });

c('.pizza-area').append(pizzaItem);
});

//Evento do modal de fechar
function closeModal() {
  c('.pizzaWindowArea').style.opacity= 0;
  setTimeout(()=>{
    c('.pizzaWindowArea').style.display = 'none'; 
  }, 500);

}

cl ('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
  item.addEventListener('click', closeModal);
});

//modal do botão menos e mais 

c('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
  if(modalQt > 1)
  modalQt--;
  c('.pizzaInfo--qt').innerHTML = modalQt;
})

c('.pizzaInfo--qtmais').addEventListener('click', ()=>{
  modalQt++;
  c('.pizzaInfo--qt').innerHTML = modalQt;
})

//modal do tamanho parte de selecionar as gramas
cl('.pizzaInfo--size').forEach((size, sizeIndex)=>{
  size.addEventListener('click', (e)=>{
    c('.pizzaInfo--size.selected').classList.remove('selected');
    size.classList.add('selected');
  });
});