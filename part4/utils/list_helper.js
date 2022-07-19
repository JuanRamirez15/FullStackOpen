

const dummy = (blogs) => {return 1}

const totalLikes = (publicaciones) => {
    return publicaciones.map(valor => valor.likes).reduce((a,b) => a+b,0)
}

const favoriteBlog = (blogs) => {
    const likes = blogs.map((valor) => valor.likes)
    const maximo = Math.max(...likes)
    let blog_like = blogs.filter((valor) => valor.likes === maximo)
    if (blog_like.length === 1){
        blog_like = blog_like[0]
        blog_like = {title:blog_like.title,author:blog_like.author,likes:blog_like.likes}
        return blog_like
    }
    else {
        const aleatorio = Math.floor( Math.random()*(blog_like.length))
        blog_like = blog_like[aleatorio]
        blog_like = {title:blog_like.title,author:blog_like.author,likes:blog_like.likes}
        return blog_like
    }
}
const mostBlogs = (matriz) => {
    const autores = matriz.map((valor) => valor.map((val) => val.author))
    const nombres = []
    for (let i = 0;i < autores.length;i++){
        nombres.push(...autores[i])
    }
    const names = {}
    for (let i = 0;i < nombres.length;i++){
        if (!names.hasOwnProperty(nombres[i])){
            names[nombres[i]] = 1
        }
        else {
            names[nombres[i]] += 1
        }
    }
    let nombre = ''
    let valor = 0
    for (const obj in names){
        if (names[obj] > valor){
            nombre = obj
            valor = names[obj]
        }
    }
    return {author:nombre,blogs:valor}
}
const mostLikes = (matriz) => {
    const nombres = {}
    const autores = matriz.map((valor) => valor.map((val) => 
    {
        if(!nombres.hasOwnProperty(val.author)){
            nombres[val.author] = val.likes 
        }
        else {
            nombres[val.author] += val.likes
        }
    }))
    let nombre = ''
    let valor = 0
    for (const obj in nombres){
        if (nombres[obj] > valor){
            nombre = obj
            valor = nombres[obj]
        }
    }
    return {author:nombre,likes:valor}

}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}