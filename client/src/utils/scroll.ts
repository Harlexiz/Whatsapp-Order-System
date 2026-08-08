
export const handleClick = (id: string):void =>{
    document.getElementById(id)?.scrollIntoView({
        behavior: "smooth"
    })
}


