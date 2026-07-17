export function generateArray(size = 40){
    const array = [];
    for(let i=0;i<size;i++){
        array.push(
            Math.floor(Math.random()*350)+20
        );
    }
    return array;
}

export function renderArray(array){
    const container = document.getElementById("array-container");
    container.innerHTML = "";
    array.forEach(value=>{
        const bar=document.createElement("div");
        bar.classList.add("bar");
        bar.style.height=`${value}px`;
        container.appendChild(bar);
    });
}