function sendMail(){
    let params = {
        name : document.getElementById('name').value,
        email : document.getElementById('email').value,
        message : document.getElementById('message').value,
    }   
    emailjs.send('service_iyooo0p', 'template_4wi67kr', params)
    .then(
        res => {
            document.getElementById('name').value = ''
            document.getElementById('email').value = ''
            document.getElementById('message').value = ''
        }
    )

    (alert('Email Enviado com Sucesso!'))
    
}


    