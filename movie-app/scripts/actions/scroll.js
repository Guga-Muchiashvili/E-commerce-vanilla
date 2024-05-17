let btn 

window.addEventListener('scroll', () => {
    
    btn = document.getElementsByClassName('scrl')[0]
    if(window.scrollY > 3500){
        btn?.setAttribute('id', 'scrl')
        // console.log('here')
        btn.addEventListener('click', () => {
            window.scrollTo({
                top : 0
            })
        })
    }else{
        btn?.removeAttribute('id', 'scrl')
    }
})
 