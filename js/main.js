// make sure service workers are supported
if('serviceWorker' in navigator){
    console.log('Service worker: Supported');
    window.addEventListener('load', ()=>{
        navigator.serviceWorker.register('../sw.js')
        .then(reg=> console.log('Service worker: Registered'))
        .catch(err =>console.log(`Service worker: Error ${err}`))
    })
}