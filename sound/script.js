const sounds=['applause','boo','gasp','tada','victory','wrong'];
sounds.forEach(s=>{
    const btn=document.createElement('button');
    btn.classList.add('btn');
    btn.innerText=s;

    btn.addEventListener('click',()=>{
        stopplaying();
        document.getElementById(s).play();

    })
    document.getElementById('buttons').append(btn);
})

function stopplaying(){
    sounds.forEach(s=>{
        const audio=document.getElementById(s);
        audio.pause();
        audio.CurrentTime=0;
    })
}