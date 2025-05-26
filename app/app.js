const socket = new WebSocket('ws://localhost:8080');
const user = prompt('Enter your name: ') || "Anonymous";


function sendMessage(e) {
    e.preventDefault();
    const input = document.querySelector('input[type="text"]');
    const image = document.querySelector('input[type="file"]').files[0];

    if (image) {
        const reader = new FileReader()
        reader.onload = function(event) {
            socket.send(JSON.stringify({user: user, image: event.target.result}));
        };
        reader.readAsDataURL(image);
        document.querySelector('input[type="file"]').value = '';
    }
    if (input.value) {
        socket.send(JSON.stringify({user: user, text: input.value}));
        input.value = '';
    }

    input.focus();
}

document.querySelector('form').addEventListener('submit', sendMessage);

socket.addEventListener('message', ({data}) => {
    const li =  document.createElement('li')
    let message = JSON.parse(data);
    if (message.image && message.image.startsWith('data:image')){
        const img = document.createElement('img');
        img.src = message.image;
        img.style.maxWidth = '200px';
        li.textContent = message.user + ': ';
        li.appendChild(document.createElement('br'));
        li.appendChild(img)
        
    }
    else{
        li.textContent = message.user + ': ' + message.text;
    }
    document.querySelector('ul').appendChild(li)
})
