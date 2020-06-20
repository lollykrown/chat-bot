// let nigeria = {};
// (async function(){
//   fetch('https://covidnigeria.herokuapp.com/api')
// .then(response => {
//   if (response.ok) { 
//     return response.json(); 
//   } else {
//     alert("HTTP-Error: " + response.status);
//   }
// })
// .then(res => {
//   console.log(res.data)
//   nigeria.deaths = res.data.death;
//   nigeria.discharged = res.data.discharged;
//   nigeria.totalActiveCases = res.data.totalActiveCases;
//   nigeria.totalConfirmedCases = res.data.totalConfirmedCases;
//   nigeria.totalSamplesTested = res.data.totalSamplesTested;
// })
// .catch(err => {
//   console.log(err)
// })
// }());

// These are words/phrases the user could type in
const trigger = [
  ["hi", "hey", "hello", "good morning", "good afternoon", "good evening", "what\'s up"],
  ["help", "covid19", "info"],
  ["1", "2", "3", "4", "5", "6"]
];
// These are bot responses, paired in order with the above 'trigger' phrases
const reply = [
  [
    "Hello! Please reply with \'help\'", 
    "Hi! Please reply with \'help\'", 
    "Hey! Please reply with \'help\'", 
    "Hi there! Please reply with \'help\'",
    "Good Afternoon! Please reply with \'help\'"
  ],
  [`<br>
    press \'1\' for tips on how to prevent coronavirus <br>
    press \'2\' for coronavirus symptoms. <br>
    press \'3\' to get the full meaning of NCDC. <br>
    press \'4\' to get the date the first case of coronavirus was confirmed in Nigeria. <br>
    press \'5\' to get the name of the country where the SARS-COV-2 originated from. <br>`
  ],
  [
    `Wash your hands frequently with soap and water or sanitizer for at least 20 minutes. 
    Wear face mask if you are going to a public place and observe social distance`,
    "Fever, chest pain, loss of sense of smell, sore throat, cough, shortness of breath",
    "Nigeria Center for Disease Control and Prevention",
    "The first coronavirus case was confirmed in Nigeria on the 28th of January 2020",
    "SARS-COV-2 which causes COVID-19 originated in Wuhan, China"
  ]
];

// This is a small set of basically random 'catch alls' for anything that the user enters outside of the possible trigger phrases
const alternative = [
  "press \'help\'",
  "press \'help\' to continue"
];
// Same purpose as the 'alternative' but an attempt at being culturally relevant ;)
const coronavirus = ["Please stay home or wear face mask if you must go out and maintain social distance"];
const covid = ["Please stay home or wear face mask if you must go out maintain social distance"];
const bye = ["Thank you for using lollykrown's Bot"];


document.addEventListener("DOMContentLoaded", () => {
	const inputField = document.getElementById("input")
	inputField.addEventListener("keydown", function(e) {
		if (e.code === "Enter") {
      let input = inputField.value;
      console.log(input)
			inputField.value = "";
			output(input);
    }
  });
});

function output(input) {
  let product;
  let text = input.toLowerCase().trim().toString();

  if (compare(trigger, reply, text)) {
    product = compare(trigger, reply, text);
  } else if (text.match(/coronavirus/gi)) {
    product = coronavirus[Math.floor(Math.random() * coronavirus.length)];
  } else if (text.match(/covid/gi)) {
    product = covid[Math.floor(Math.random() * covid.length)];
  } else if (text.match(/bye/gi)) {
  product = bye[Math.floor(Math.random() * bye.length)];
  } else {
    product = alternative[Math.floor(Math.random() * alternative.length)];
  }

  //update DOM
  addChat(input, product);
}

function compare(triggerArray, replyArray, string) {
  let item;
  for (let x = 0; x < triggerArray.length; x++) {
    for (let y = 0; y <= replyArray.length +1; y++) {
      if (triggerArray[x][y] === string) {
        // items = replyArray[x];
        //item = items[Math.floor(Math.random() * items.length)];
        console.log(x,y)
        console.log(triggerArray[x][y], replyArray[x][y])
        item = replyArray[x][y];

      }
    }
  }
  return item;
}

function addChat(input, product) {
  const mainDiv = document.getElementById("container");
  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.innerHTML = `<strong style="color:blue;">You: </strong><span id="user-response">${input}</span>`;
  mainDiv.appendChild(userDiv);

  let botDiv = document.createElement("div");
  botDiv.id = "bot";
  botDiv.innerHTML = `<strong style="color:red;">Bot: </strong><span id="bot-response">${product}</span>`;
  mainDiv.appendChild(botDiv);
  // speak(product);
}

const synth = window.speechSynthesis;
let voices = synth.getVoices();

function speak(string) {
  let u = new SpeechSynthesisUtterance(string);
  u.text = string;
  u.lang = "en-US";
  u.volume = 1; //0-1 interval
  u.rate = 1;
  u.pitch = 1; //0-2 interval
  synth.speak(u);
}
