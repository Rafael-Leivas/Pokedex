const nome_poke = document.querySelector('.nome_poke')
const id_poke = document.querySelector('.id_poke')
const pokemon__image =document.querySelector('.pokemon__image')

const form =document.querySelector('.form')
const input =document.querySelector('.input__search')

let play = document.getElementById('play')
let pause = document.getElementById('pause')
let audio = new Audio('../music/pokemon.mp3')

const interrogacao = document.querySelector('.interrogacao')

const btn_prev =document.querySelector('.btn-prev')
const btn_next =document.querySelector('.btn-next')

let serachPokemon = 1

const fetchPokemon = async (pokemon) =>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if(APIResponse.status === 200){
        const data = await APIResponse.json()
        return data
    }
}

const renderPokemon = async (pokemon) => {

    nome_poke.innerHTML = 'Carregando..'
    id_poke.innerHTML = ''

        const data = await fetchPokemon(pokemon)

    if(data){
        pokemon__image.style.display = 'block'
        nome_poke.innerHTML = data.name
        id_poke.innerHTML = data.id
        pokemon__image.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        input.value = ''
        serachPokemon = data.id
    }else{
        pokemon__image.style.display = 'none'
        nome_poke.innerHTML = 'Sem resposta'
        id_poke.innerHTML = ''
    }
}

form.addEventListener('submit',(event) =>{
    event.preventDefault()
    renderPokemon(input.value.toLowerCase())
})

play.addEventListener('click', ()=>{
    audio.play()
})
pause.addEventListener('click', ()=>{
    audio.pause()
})

btn_next.addEventListener('click',() =>{
    serachPokemon += 1
    renderPokemon(serachPokemon)
})

btn_prev.addEventListener('click',() =>{
    if(serachPokemon > 1){
        serachPokemon -= 1
        renderPokemon(serachPokemon)
    }
})

function openModal(){
    const modal = document.getElementById('modal-container')
    modal.classList.add('mostrar')

    modal.addEventListener('click', (e) =>{
        if (e.target.id == 'modal-container' || e.target.id == "fechar"){
            modal.classList.remove('mostrar')
            localStorage.fechaModal = 'modal-container'
        }
    })
}

renderPokemon(serachPokemon)