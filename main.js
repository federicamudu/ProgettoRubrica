let cardsWrapper = document.querySelector('#cardsWrapper')
let inputNome = document.querySelector('#inputName')
let inputNumber = document.querySelector('#inputNumber')
let inputEmail = document.querySelector('#inputEmail')
let submitbtn = document.querySelector('.submitbtn')
let showContactsBtn = document.querySelector('#showContactsBtn')
let removeContactBtn = document.querySelector('.icon')
let searchContactBtn = document.querySelector('.searchArrow')
let inputSearch =document.querySelector('#searchInput')


let rubrica = {
  contacts : [
    {nome:'Federica',email:'fe@dot.it',telefono:5365793674},
    {nome:'Matteo',email:'mat@dot.it',telefono:53628293674},
    {nome:'Matteo',email:'meh@dot.it',telefono:53243593674},
    {nome:'Gennaro',email:'gen@dot.it',telefono:53243593674},
    {nome:'Alessio',email:'ale@dot.it',telefono:53243593674},
    {nome:'Francesca',email:'fra@dot.it',telefono:95674354867}
  ],
  addContact : function (newName, newEmail, newNumber) {
    this.contacts.push({nome:newName,email:newEmail ,telefono:newNumber})
    this.showContact(this.contacts)
  },
  showContact : function(contact) {
    cardsWrapper.innerHTML = '';
    let i=0
    contact.forEach((el,i) => {
    
      i++
      let node = document.createElement("div");
      node.innerHTML = `
                      <div id="list-item-${i}" class="listaContatti user-cards" data-user-cards-container>
                        <h5 class="ps-3"><i class="fas fa-user-circle contactIcon"></i> ${el.nome}</h5>
                        <p class="ps-3"><i class="fas fa-envelope contactIcon"></i> ${el.email}</p>
                        <p class="ps-3"><i class="fas fa-phone-alt contactIcon"></i> ${el.telefono}</p>
                        <i class="bi bi-trash3 fs-3 icon text-end pe-4 pb-4"></i>
                    </div>`;
      // appending a node in list
      cardsWrapper.append(node);
    });
    let icons = document.querySelectorAll('.icon')
    icons.forEach((icon, i)=>{
      icon.addEventListener('click',()=>{
        let nome = contact[i].nome
        this.removeContact(nome)
      })
    })    
  },
  removeContact : function (removedName) {
    let names = this.contacts.map((el)=>(el.nome.toLowerCase()))
    let index = names.indexOf(removedName.toLowerCase())
    if(index> -1){
      this.contacts.splice(index,1)
      this.showContact(this.contacts);
      showContactsBtn.innerText = 'Nascondi rubrica';
    }else{
      alert('contatto non esistente')
    }
  },
  searchContact : function (nameSearched) {
    let filtered = this.contacts.filter((el)=>el.nome.toLowerCase() == nameSearched.toLowerCase())
    console.log(filtered);
    if(filtered.length>0){
      this.showContact(filtered)
    }else{
      alert('contatto non presente in rubrica')
    }
  }
}
confirm = false;

submitbtn.addEventListener('click', () => {
  if (inputNome.value != '' && inputNumber.value != '' && inputEmail.value != '' ) {
      confirm = true;
      rubrica.addContact(inputNome.value, inputEmail.value, inputNumber.value);
      showContactsBtn.innerText = 'Nascondi rubrica';
      inputNome.value = '';
      inputEmail.value = '';
      inputNumber.value='';
  }
})

searchContactBtn.addEventListener('click', ()=>{
  rubrica.searchContact(inputSearch.value);
  inputSearch.value = '';
})



rubrica.showContact(rubrica.contacts)
const scrollSpy = new bootstrap.ScrollSpy(document.body, {
  target: '#cardsWrapper'
})



showContactsBtn.addEventListener('click', () => {
  if (confirm == false) {
      rubrica.showContact(rubrica.contacts);
      confirm = true;
      showContactsBtn.innerText = 'Nascondi rubrica';
  } else {
      cardsWrapper.innerHTML = '';
      confirm = false;
      showContactsBtn.innerText = 'Mostra rubrica';
  }
})





