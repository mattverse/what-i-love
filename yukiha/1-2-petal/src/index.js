const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')

const TOTAL = 10
const petalArray = []

const petalImg = new Image()
petalImg.src = './petal.png'
petalImg.onload = () => {
    for (let i = 0; i < TOTAL; i++) {
        petalArray.push(new Petal())
    }
    console.log(petalArray)
    render()
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    window.requestAnimationFrame(render)
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

class Petal {
    constructor() { }
}