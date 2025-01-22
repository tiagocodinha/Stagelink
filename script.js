function sendMail(){
    let params = {
        name : document.getElementById('name').value,
        email : document.getElementById('email').value,
        message : document.getElementById('message').value,
    }   
    emailjs.send('service_iyooo0p', 'template_4wi67kr', params).then(alert('Email Enviado com Sucesso!'))
    
}
