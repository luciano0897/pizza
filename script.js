let cart = [];
let modalQt = 1;
let modalKey = 0;

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
        modalKey = key;
       

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

//Ação do botão de comprar

c('.pizzaInfo--addButton').addEventListener('click', ()=>{
     //Qual a Pizza?
//console.log( "pizza"+modalKey);
     // Qual o tamanho?
let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));

let identifier = pizzaJson[modalKey].id+'@'+size;

//identificador o que vai se colocado no carrinho
let key = cart.findIndex((item)=>item.identifier == identifier);

if(key > -1){
  cart[key].qt += modalQt
}else{ 

cart.push({
  identifier,
  id:pizzaJson[modalKey].id,
  size, 
  qt:modalQt
})
}
updateCart();
closeModal();
//console.log('tamanho'+size);
     //Quantas Pizzas?
    // console.log('quantidade'+modalQt);
});

//atualizar o carrinho
c('.menu-openner').addEventListener('click', () =>{
  if(cart.length > 0){
    c('aside').style.left = '0';
  }
});
c('.menu-closer').addEventListener('click', ()=>{
  c('aside').style.left = '100vw';
});
function updateCart(){
  c('.menu-openner span').innerHTML = cart.length;

  if(cart.length > 0){
    c('aside').classList.add('show');
    c('.cart').innerHTML ='';

    let subtotal = 0;
    let desconto = 0;
    let total = 0;

    for(let i in cart){
      let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);
      subtotal += pizzaItem.price * cart[i].qt;

      let cartItem = c('.models .cart--item').cloneNode(true);

      let pizzaSizeName ;
      switch(cart[i].size){
        case 0:
          pizzaSizeName = 'P';
          break;
        case 1:
          pizzaSizeName = 'M';
          break;
        case 2:
          pizzaSizeName = 'G';
          break;

      }
      

      let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

      cartItem.querySelector('img').src = pizzaItem.img;
      cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
      cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
      //essa função e para dimuir e almenta a quantidade de pizza 
      cartItem.querySelector('.cart--item-qtmenos').addEventListener('click',()=>{
        if(cart[i].qt > 1){
          cart[i].qt--;
        }else{
          cart.splice(i, 1);
        }
        updateCart();
      });
      cartItem.querySelector('.cart--item-qtmais').addEventListener('click',()=>{
        cart[i].qt++;
        updateCart();
      });

      c('.cart').append(cartItem);
      
    }
    desconto = subtotal * 0.1;
    total = subtotal - desconto;

    c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
    c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
    c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

  }else{
   c('aside').classList.remove('show');
   c('aside').style.left = '100vw';
  }
}
