const sendMSG = document.querySelector('#sendmessage');

$(document).ready(function(){
    // Получение сообщений, отслеживание набор текста
    setInterval(() => {
        // Если пользователь вводит @
        if (sendMSG.value == '@'){
            document.querySelector('.user-list').style.display = 'block';
        }else{
            document.querySelector('.user-list').style.display = 'none';
        }

        // Получение сообщений
        dataSend = {
            flag: 'GetMessage'
        }
        dataJSON = JSON.stringify(dataSend)
        $.ajax({
            url: '/',
            type: 'POST',
            data:{
                data: dataJSON
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function(data){
                if (data != ''){ 
                    dataJS = JSON.parse(data);
                    user_name = dataJS.name;
                    text_message = dataJS.message;
                    appendMessage(user_name, '../img/person.png', 'left', text_message);
                }                  
            },
            error:function(data){
                // alert('Ошибка при получении сообщения')
            }
        });
    }, 500);

    // Отправка сообщений
    $('#btn-sendmessage').click(function(e){
        e.preventDefault();  
        var selectedUser = getSubstring(sendMSG.value, '@', ':');
        if (selectedUser == '') selectedUser = 'Всех';
        var messageText = getSubstring(sendMSG.value, ':', '');
        if (messageText == '') messageText = sendMSG.value;
        dataSend = {
            flag: "SendMessage",
            name: selectedUser,
            message: messageText
        };            
        var dataJSON = JSON.stringify(dataSend);
        $.ajax({
            url: '/',
            type: 'POST',
            data:{
                data: dataJSON
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function(data){
                appendMessage(`Вы для <i>${selectedUser}</i>`, '../img/person.png', 'right', messageText);
                sendMSG.value = '';
            },
            error: function(data){
                // alert(`Сообщение для ${selectedUser} не доставлено`);
            }
        });
    });
});

/////////////////////////////////////////////

function formatDate(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();
  
    return `${h.slice(-2)}:${m.slice(-2)}`;
  }

function appendMessage(user, img, side, text) {
    const msgHTML = `
      <div class="msg ${side}-msg">
        <div class="msg-img" style="background-image: url(${img})"></div>
  
        <div class="msg-bubble">
          <div class="msg-info">            
            <div class="msg-info-name">${user}</div>
            <div class="msg-info-time">${formatDate(new Date())}</div>
          </div>
  
          <div class="msg-text">${text}</div>
        </div>
      </div>
    `;  

    document.querySelector('.msger-chat').insertAdjacentHTML("beforeend", msgHTML);
    document.querySelector('.msger-chat').scrollTop += 500;
}
  
// Обработчик выбора пользователя, кому писать сообщение
const element = document.querySelectorAll('.userID');
element.forEach(el => {
    el.addEventListener("click", function(e){
        sendMSG.value = "@"+e.target.textContent+":"+" ";
        sendMSG.focus();
        document.querySelector('.user-list').style.display = 'none';
    })
});

// Получить строку из подстроки
function getSubstring(str, char1, char2) {
    if(char2 != ""){
        const index1 = str.indexOf(char1);
        const index2 = str.indexOf(char2);
        
        if (index1 === -1 || index2 === -1) {
          return '';
        }
        
        return str.substring(index1 + 1, index2);
    }else{
        const index1 = str.indexOf(char1);

        if (index1 === -1) {
            return '';
          }
          
          return str.substring(index1 + 1);
    }
  }

/////////////////////////////////////////////