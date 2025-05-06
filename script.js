const linkBox = document.querySelector("#linkBox");
const menu = document.querySelector(".menu");
const talk = document.querySelector("#talk");
const aboutH1 = document.querySelector("#about-h1");
const aboutP1 = document.querySelector("#about-p1");
const aboutP2 = document.querySelector("#about-p2");
const output = document.querySelector("#output");
const compliments = document.querySelector("#compliments");
const textInput = document.querySelector("#talk-input");
const sendBtn = document.querySelector("#send-talk");
const chatLog = document.querySelector("#chatlog");
const loading = document.querySelector(".loading");
const emailbtn = document.querySelector("#c-send");
const emailTxt = document.querySelector("#c-text");
const emailInput1 = document.querySelector("#c-input1");
const emailInput2 = document.querySelector("#c-input2");
const links = document.querySelectorAll('.links');
const recentList = document.querySelector('.recent-list');
const recentBox = document.querySelector('.chat-history');
const rest = document.querySelector('.rest');
const chatContainer = document.querySelector('.chat-container');
const lobby = document.querySelector('.close-menu');
const clear = document.querySelector('.clear');
const main = document.querySelector('.main');
const mHistory = document.querySelector('.m-history');
const lft = document.querySelector('.lft');
const cover = document.querySelector('.cover');
const recentLi = document.querySelectorAll('.recent-li'); 
const intro = document.querySelector('.intro');




// ========================== On Load =====================================
(()=>{
  if(window.innerWidth > 900){
    recentBox.classList.toggle('history');
  }
})();


(()=>{
  setTimeout(()=>{
    cover.classList.add('open');
   }, 2500)
})();


(() => {
  setTimeout(() => {
    appendChat({
      from: "ai",
      message: "Hi, how can i help u today?",
    });
  }, 3700);
})();


function setViewportHeight() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}
setViewportHeight();
// ===============================  Listners  ===============================================================

window.addEventListener('resize', setViewportHeight);

    // === Linkbox toggle ===
menu.addEventListener("click", () => {
  linkBox.classList.toggle("show");
});

talk.addEventListener("click", () => {
  linkBox.classList.toggle("show");
});

    //  ===  Email send button  ===
emailbtn.addEventListener("click", () => {
  if (
    emailTxt.value.length > 1 &&
    emailInput1.value.length > 1 &&
    emailInput2.value.length > 1
  ) {
    emailbtn.classList.add("mail");
    setTimeout(() => {
      emailbtn.classList.remove("mail");
    }, 500);

    function sendMail() {
      let parms = {
        name: emailInput1.value,
        email: emailInput2.value,
        message: emailTxt.value,
      };
      emailjs
        .send("service_ur36x9l", "template_wmg1qwk", parms)
        .then(() => {
          alert("Message Sent !");
        })
        .catch((err) => {
          alert("Failed to Send Message !" + err);
        });
    }
    sendMail();

    setTimeout(() => {
      emailInput1.value = "";
      emailInput2.value = "";
      emailTxt.value = "";
    }, 600);
  } else {
    if (emailInput1.value.length < 1) {
      emailInput1.focus();
    } else if (emailInput2.value.length < 1) {
      emailInput2.focus();
    } else if (emailTxt.value.length < 1) {
      emailTxt.focus();
    }
  }
});

// ================== Int Observer =======================

let observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("observed");
      } else {
        entry.target.classList.remove("observed");
      }
      if(entry.target.classList.contains('recent-li') && entry.isIntersecting){
        recentList.classList.add('listed');
      } else {
        recentList.classList.remove('listed');
      }
    });
  },
  { threshold: 0.5 }
);

observer.observe(aboutH1);
observer.observe(aboutP1);
observer.observe(aboutP2);
observer.observe(intro);


links.forEach(link => observer.observe(link));

// =========================== Input text access ======================================================

let inputMessage;
let chatArr = [];
const geminiApiKey = "AIzaSyBu5uCf4pV-i1y32Mu4pxyTl2eSO8PzBFA";

textInput.addEventListener("input", (e) => {
  inputMessage = e.target.value.trim();
});
textInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendBtn.click();
    e.target.value = "";
    textInput.blur();
  }
});

// ==========================  Appender Function  ===========================================

let appendChat = (x) => {
  let unTouch = true;
  chatLog.scrollTop = chatLog.scrollHeight;

  let newMessage = document.createElement("div");
  if (x.from === "user") {
    let html = `
          <p class="chat-input"></p>
         </div>`;
    newMessage.innerHTML = html;
    newMessage.classList.add("input-container");

    chatlog.insertBefore(newMessage, loading);

    let p = newMessage.querySelector("p");
    p.innerHTML = x.message;

    if(unTouch){
      chatLog.scrollTop = chatLog.scrollHeight;
    }

  } else if (x.from === "ai") {

    let html = `<img class="chat-logo" id="chat-logo" src="/images/Logo 2.png" alt="">
       <p class="output"></p>
       <div class="compliments">
         <div class="icons"> <i class="fa-solid fa-copy copy cons"></i>
          <i class="fa-solid fa-thumbs-up like cons"></i>
          <i class="fa-solid fa-thumbs-down nolike cons"></i></div>
       
        <span id="date">time</span>
       </div>
     </div>`;
    newMessage.innerHTML = html;
    newMessage.classList.add("response-container");
    chatlog.insertBefore(newMessage, loading);

    let today = new Date().toLocaleString();
    newMessage.querySelector("#date").innerHTML = today;

    let p = newMessage.querySelector("p");
    let comp = newMessage.querySelector(".compliments");

    let message = x.message;
    let i = 0;
    let timer;

    p.innerHTML = "...";

  setTimeout(() => {
      p.innerHTML = "";
      function typer() {
        if(unTouch){
          chatLog.scrollTop = chatLog.scrollHeight;
        }
      
        if (i < message.length) {
          if (message.slice(i, i + 4) === "<br>") {
            p.innerHTML += "<br>";
            i += 4;
          } else {
            p.innerHTML += message.charAt(i);
            i++;
          }
          timer = setTimeout(typer, 20); 
        } else {
          comp.style.display = "flex";
        }
        chatLog.addEventListener("click", () => {
          unTouch = false;
        });
        chatLog.addEventListener("touchstart", () => {
          unTouch = false;
        });
      }
      
      typer();
      
      sendBtn.addEventListener("click", () => {
        clearTimeout(timer); // This will cancel the typing delay
      });

    }, 500);
    if(unTouch){
      chatLog.scrollTop = chatLog.scrollHeight;
    }
  }
};

// ============================================================
chatLog.addEventListener("click", (e) => {
  const target = e.target;

  if (target.classList.contains("copy")) {
    const p = target.closest(".response-container").querySelector("p");
    const text = p.innerHTML.replace(/<br>/g, "\n");
    navigator.clipboard.writeText(text);
    target.style.color = "rgb(19, 120, 214)";

    setTimeout(() => {
      target.style.color = "rgb(129, 129, 129)";
    }, 500);
  }

  if (target.classList.contains("like")) {
    const container = target.closest(".icons");
    container.querySelector(".like").style.color = "rgb(19, 120, 214)";
    container.querySelector(".nolike").style.color = "rgb(129, 129, 129)";
  }

  if (target.classList.contains("nolike")) {
    const container = target.closest(".icons");
    container.querySelector(".like").style.color = "rgb(129, 129, 129)";
    container.querySelector(".nolike").style.color = "rgb(19, 120, 214)";
  }
});

recentList.addEventListener('click', (e)=>{
    if(e.target.classList.contains('recent-txt') && window.innerWidth > 600){
       txt = e.target.innerText;
       textInput.value = txt;
       inputMessage = txt;
       
    }
    if(window.innerWidth < 600){
      txt = e.target.innerText;
      textInput.value = txt;
      inputMessage = txt;
      recentBox.classList.toggle('history');
    }
});



// ============================= SEND ==================================

sendBtn.addEventListener("click", function sender(){
  if (textInput.value.length < 1) return;

 let appendRecent = ()=>{
    let newLi = document.createElement('li');
     newLi.innerHTML = `<span class="recent-txt">${inputMessage}</span>
          <span class="recent-date">${new Date().toLocaleString()}</span>`
       newLi.className = 'recent-li'
        recentList.append(newLi);
        observer.observe(newLi);
        recentList.scrollTop = recentList.scrollHeight;
  }
appendRecent();

localStorage.setItem(`talk ${Math.floor(Math.random() * 100)}`, JSON.stringify({
  key: inputMessage
}));

  textInput.value = '';
  textInput.blur();

  chatArr.push({
    from: "user",
    message: `${inputMessage}`,
  });
  appendChat(chatArr[chatArr.length - 1]);

  loading.style.display = "flex";

  //////////////////////////////////////  Api call   ////////////////////////////////////////////

  let newRequest = async function () {
    let result = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `(note) use some amount of emogi not too much only if u see fit in answer else no emogi and nerver mention note in ur answer as its a api based request ....   (question) =>.. ${inputMessage}`,
                },
              ],
            },
          ],
        }),
      }
    );
    try {
      let response = await result.json();
      let aiText = response.candidates[0].content.parts[0].text;
      aiText = aiText.replace(/\*\*/g, "");
      aiText = aiText.replace(/\*/g, "").replace(/\n/g, "<br>");

      chatArr.push({
        from: "ai",
        message: `${aiText}`,
      });
      loading.style.display = "none";
      appendChat(chatArr[chatArr.length - 1]);
    } catch (error) {
      console.error(error);
      loading.style.display = "none";
      appendChat({
        from: "ai",
        message: "Server did not respond ! try again later.",
      });
    }
  };
  newRequest();
});



// ======================== Local =========================================
let local = [];

for(let i = 0; i < localStorage.length; i++){
  let key = localStorage.key(i);
  if(key.startsWith('talk')){
    let value = JSON.parse(localStorage.getItem(key));
    local.push(value)
  }
}




rest.addEventListener('click', ()=>{
  recentBox.classList.toggle('history');
  if(recentBox.classList.contains('history') && window.innerWidth > 900){
    chatLog.style.width = '55vw';
    chatContainer.style.marginRight = '15rem';
    sendBtn.style.marginRight = '15rem';
  } else if(!recentBox.classList.contains('history') && window.innerWidth > 900){
    chatLog.style.width = '65vw';
    chatContainer.style.marginRight = '2rem';
    sendBtn.style.marginRight = '2rem';
  }
})

clear.addEventListener('click', ()=>{
  recentList.innerHTML = '';
  const remove = [];
  for(i = 0; i < localStorage.length; i++){
    let key = localStorage.key(i);
    if(key.startsWith('talk')){
      remove.push(key);
    }
  }
    remove.forEach(key => localStorage.removeItem(key));
});

lobby.addEventListener('click', ()=>{
  let rect = main.getBoundingClientRect();
  if(rect.top > -200 && rect.bottom < rect.height + 100){
    linkBox.classList.toggle("show");
  }
})

mHistory.addEventListener('click', (e)=>{
  e.preventDefault();

  linkBox.classList.toggle("show");
  rest.click();
});

lft.addEventListener('click', (e)=>{
  rest.click();
});

// =========================================================



generateRecentLocal = ()=>{
   recentList.innerHTML = local.map((x)=>{
    return `<li class="recent-li">
    <span class="recent-txt">${x.key}</span>
          <span class="recent-date">${new Date().toLocaleString()}</span></li>`
  }).join('');

  document.querySelectorAll('.recent-li').forEach(li => observer.observe(li));
};

generateRecentLocal();
