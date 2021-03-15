var btn_audioAssist = document.getElementById("btn_audioAssist")
var btn_talk = document.getElementById("btn_talk")
var chatBoxArea = document.getElementById("chatBoxArea")
var contentTitle = document.getElementById("contentTitle")
var userAssist = document.getElementById("userDirections")
// ===================== CONTENT FIELDS =====================

var contentTitleArea = document.getElementById("contentTitleArea")
var contentArea = document.getElementById("contentArea")
var all_timetable = document.getElementById("all_timetable")
var NIT_timetable = document.getElementById("NIT_timetable")
var BI_timetable = document.getElementById("BI_timetable")
var all_deadlines = document.getElementById("all_deadlines")
var NIT_deadlines = document.getElementById("NIT_deadlines")
var BI_deadlines = document.getElementById("BI_deadlines")
var all_grades = document.getElementById("all_grades")
var NIT_grades = document.getElementById("NIT_grades")
var BI_grades = document.getElementById("BI_grades")
var doc_preview = document.getElementById("doc_preview")
var cmd_list = document.getElementById("cmd_list")

// ================= SPEECH RECOGNITION/SYNTHESIS API SETUP =================

const content = document.querySelector("#chatBoxArea");

var audioEnabled = false;
var synth = window.speechSynthesis;
const utterance = new SpeechSynthesisUtterance(content);
utterance.volume = 1;
utterance.rate = 1;
utterance.pitch = 0.6;

voices = [
    {
        "name": "UniBot",
        "lang": "en-US"
    }
]

const voice = voices[0];
utterance.voiceURI = voice.name;
utterance.lang = voice.lang;


window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement("p");

// // ========================= ACTION CODE =========================
$("#btn_talk").click(function(event){
    if(content.length){
        content += ''
    }
    
    if(btn_talk.innerHTML == "Talk"){
        btn_talk.style.background= '#6200EE';
        btn_talk.style.color= 'white';
        btn_talk.innerHTML = "Listening...";
        chatBoxArea.style.borderColor= '#6200EE';

        recognition.start()
    }
    else{
        btn_talk.style.background= '#03DAC5';
        btn_talk.style.color= 'black';
        btn_talk.innerHTML = "Talk";
        chatBoxArea.style.borderColor= '#018786';

        btn_audioAssist.style.background= '#03DAC5';
        btn_audioAssist.style.borderColor= 'black';
        btn_audioAssist.innerHTML = "🔈";
        synth.cancel(utterance);

        audioEnabled = false;
        recognition.stop()
    }
})

$("#btn_audioAssist").click(function(event){
    if(content.length){
        content += ''
    }
    
    if(btn_audioAssist.innerHTML == "🔈"){
        btn_audioAssist.style.background= '#6200EE';
        btn_audioAssist.style.borderColor= 'white';
        btn_audioAssist.innerHTML = "🔊";

        audioEnabled = true;
    }
    else{
        btn_audioAssist.style.background= '#03DAC5';
        btn_audioAssist.style.borderColor= 'black';
        btn_audioAssist.innerHTML = "🔈";

        synth.cancel(utterance);
        audioEnabled = false;
    }
})

window.onload = function() {
    //Turns audio assist off on page reload
    synth.cancel(utterance);
}

recognition.addEventListener('end', ()=>{
    
    if(btn_talk.innerHTML == "Listening...")
    {
        recognition.start()
    }
    else if(btn_talk.innerHTML == "Talk")
    {
        recognition.stop()
    }
})

recognition.onerror = function(e){
    //Display error msg
    console.log('Error occurred in recognition: ' + e.error)
}

recognition.addEventListener('result', (e) => {
    
    const text = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");

    p.innerText = text;
    content.appendChild(p);

    if(e.results[0].isFinal){

        if(text.includes('Hello') || text.includes('hello')){
            userAssist.style.display = "none";

            p = document.createElement('p');
            p.classList.add('reply')
            p.innerText = 'Hello, I am the University Helper-bot. Here are some commands you can use:\n Course Timetable \n Course Material \n Course Grades \n Enable or Disable audio assist \n Voice Command List'
            utterance.text = 'Hello, I am the University Helper-bot. Here are some commands you can use:\n Course Timetable \n Course Material \n Course Grades \n Enable or Disable audio assist \n Voice Command List'
            content.appendChild(p);

            if(audioEnabled == true)
            {
                synth.speak(utterance);
            }
        }

        if(text.includes('Enable audio assist') || text.includes('Turn on audio') || text.includes('enable audio assist') ||  text.includes('turn on audio')){
            userAssist.style.display = "none";
            
            audioEnabled = true;
            btn_audioAssist.innerHTML = "🔊";
            btn_audioAssist.style.background= '#6200EE';
            btn_audioAssist.style.borderColor= 'white';

            p = document.createElement('p');
            p.classList.add('reply')
            p.innerText = 'Audio assist has been Enabled. You can disable audio assist by saying: \n  Disable audio assist \n Turn off audio'
            utterance.text = 'Audio assist has been Enabled. You can disable audio assist by saying: \n  Disable audio assist \n Turn off audio'
            synth.speak(utterance);
            content.appendChild(p);
        }

        if(text.includes('Disable audio assist') || text.includes('Turn off audio') || text.includes('disable audio assist') ||  text.includes('turn off audio')){
            userAssist.style.display = "none";
            
            audioEnabled = false;
            btn_audioAssist.innerHTML = "🔈";
            btn_audioAssist.style.background= 'Grey';
            btn_audioAssist.style.borderColor= 'black';
            
            p = document.createElement('p');
            p.classList.add('reply')
            p.innerText = 'Audio assist has been Disabled.'
            utterance.text = 'Audio assist has been Disabled.'

            synth.cancel(utterance);
            content.appendChild(p);
        }

        // ================================= TIMETABLE =================================
        if(text.includes('Course Timetable') || text.includes('course timetable') || text.includes('Course Schedule') || text.includes('course schedule')){
            p = document.createElement('p');
            p.classList.add('reply')
            p.innerText = 'Would you like to see specific Lecture/Deadline Schedules? \n NIT Timetable \n BI Timetable \n Coursework Deadlines'
            utterance.text = 'Would you like to see specific Lecture/Deadline Schedules? \n NIT Timetable \n BI Timetable \n Coursework Deadlines'
            if(audioEnabled == true)
            {
                synth.speak(utterance);
            }
            content.appendChild(p);

            // DISPLAY TIMETABLE
            contentTitle.innerHTML = "Course Schedule";
            contentTitleArea.style.display = "block";
            contentArea.style.display = "block";

            all_timetable.style.display = "block";
            NIT_timetable.style.display = "none";
            BI_timetable.style.display = "none";
            all_deadlines.style.display = "none";
            NIT_deadlines.style.display = "none";
            BI_deadlines.style.display = "none";
            all_grades.style.display = "none";
            NIT_grades.style.display = "none";
            BI_grades.style.display = "none";
            doc_preview.style.display = "none";
            cmd_list.style.display = "none";
        }
        
        if(text.includes('NIT Timetable') || text.includes('NIT timetable') || text.includes('NIT Schedule') || text.includes('NIT schedule') || text.includes('Novel Timetable') || text.includes('novel timetable') || text.includes('niit timetable') || text.includes('Marvel timetable')){
                
            // DISPLAY NIT TIMETABLE
            contentTitle.innerHTML = "Novel Interaction Technologies (NIT): Schedule";
            contentTitleArea.style.display = "block";
            contentArea.style.display = "block";

            all_timetable.style.display = "none";
            NIT_timetable.style.display = "block";
            BI_timetable.style.display = "none";
            all_deadlines.style.display = "none";
            NIT_deadlines.style.display = "none";
            BI_deadlines.style.display = "none";
            all_grades.style.display = "none";
            NIT_grades.style.display = "none";
            BI_grades.style.display = "none";
            doc_preview.style.display = "none";
            cmd_list.style.display = "none";
        }

        if(text.includes('BI Timetable') || text.includes('BI timetable') || text.includes('BI Schedule') || text.includes('BI schedule') || text.includes('Business Timetable') || text.includes('business timetable')){
            
            // DISPLAY BI TIMETABLE
            contentTitle.innerHTML = "Business Intelligence (BI): Schedule";
            contentTitleArea.style.display = "block";
            contentArea.style.display = "block";
            
            all_timetable.style.display = "none";
            NIT_timetable.style.display = "none";
            BI_timetable.style.display = "block";
            all_deadlines.style.display = "none";
            NIT_deadlines.style.display = "none";
            BI_deadlines.style.display = "none";
            all_grades.style.display = "none";
            NIT_grades.style.display = "none";
            BI_grades.style.display = "none";
            doc_preview.style.display = "none";
            cmd_list.style.display = "none";
        }

        if(text.includes('Coursework Deadlines') || text.includes('coursework deadlines')){
            p = document.createElement('p');
            p.classList.add('reply')
            p.innerText = 'Would you like to see specific Module Deadlines? \n NIT Deadlines \n BI Deadlines'
            utterance.text = 'Would you like to see specific Module Deadlines? \n NIT Deadlines \n BI Deadlines'
            if(audioEnabled == true)
            {
                synth.speak(utterance);
            }
            content.appendChild(p);

            // DISPLAY DEADLINES TIMETABLE
            contentTitle.innerHTML = "Courswork Deadlines";
            contentTitleArea.style.display = "block";
            contentArea.style.display = "block";

            all_timetable.style.display = "none";
            NIT_timetable.style.display = "none";
            BI_timetable.style.display = "none";
            all_deadlines.style.display = "block";
            NIT_deadlines.style.display = "none";
            BI_deadlines.style.display = "none";
            all_grades.style.display = "none";
            NIT_grades.style.display = "none";
            BI_grades.style.display = "none";
            doc_preview.style.display = "none";
            cmd_list.style.display = "none";
        }

        if(text.includes('NIT Deadlines') || text.includes('NIT deadlines') || text.includes('Novel Deadlines') || text.includes('novel deadlines') || text.includes('niit deadlines') || text.includes('Marvel timetable')){
                
            // DISPLAY NIT Deadlines
            contentTitle.innerHTML = "Novel Interaction Technologies (NIT): Deadlines";
            contentTitleArea.style.display = "block";
            contentArea.style.display = "block";

            all_timetable.style.display = "none";
            NIT_timetable.style.display = "none";
            BI_timetable.style.display = "none";
            all_deadlines.style.display = "none";
            NIT_deadlines.style.display = "block";
            BI_deadlines.style.display = "none";
            all_grades.style.display = "none";
            NIT_grades.style.display = "none";
            BI_grades.style.display = "none";
            doc_preview.style.display = "none";
            cmd_list.style.display = "none";
        }

        if(text.includes('BI Deadlines') || text.includes('BI deadlines') || text.includes('Business Deadlines') || text.includes('business deadlines')){
            
            // DISPLAY BI Deadlines
            contentTitle.innerHTML = "Business Intelligence (BI): Deadlines";
            contentTitleArea.style.display = "block";
            contentArea.style.display = "block";

            all_timetable.style.display = "none";
            NIT_timetable.style.display = "none";
            BI_timetable.style.display = "none";
            all_deadlines.style.display = "none";
            NIT_deadlines.style.display = "none";
            BI_deadlines.style.display = "block";
            all_grades.style.display = "none";
            NIT_grades.style.display = "none";
            BI_grades.style.display = "none";
            doc_preview.style.display = "none";
            cmd_list.style.display = "none";
        }

        // ============================== COURSE MATERIAL ==============================
        if(text.includes('Course Material') || text.includes('course material')){
            p = document.createElement('p');
            p.classList.add('reply')
            p.innerText = 'Would you like to see specific Module Material? \n NIT Material \n BI Material'
            utterance.text = 'Would you like to see specific Module Material? \n NIT Material \n BI Material'
            if(audioEnabled == true)
            {
                synth.speak(utterance);
            }
            content.appendChild(p);
        }

        if(text.includes('NIT Material') || text.includes('NIT material') || text.includes('Novel Material') || text.includes('novel material') || text.includes('niit material') || text.includes('Marvel material')){
            p = document.createElement('p');
            p.classList.add('reply')
            p.innerText = 'Which material would you like to preview? \n Module Handbook \n Slides \n Lab Work'
            utterance.text = 'Which material would you like to preview? \n Module Handbook \n Slides \n Lab Work'
            if(audioEnabled == true)
            {
                synth.speak(utterance);
            }
            content.appendChild(p);
        }

        if(text.includes('NIT Handbook') || text.includes('NIT handbook') || text.includes('Novel Handbook') || text.includes('novel handbook') || text.includes('niit handbook') || text.includes('Marvel handbook')){
            
            //DISPLAY HANDBOOK PREVIEW
            contentTitle.innerHTML = "Novel Interaction Technologies (NIT): Handbook";
            contentTitleArea.style.display = "block";
            contentArea.style.display = "block";

            all_timetable.style.display = "none";
            NIT_timetable.style.display = "none";
            BI_timetable.style.display = "none";
            all_deadlines.style.display = "none";
            NIT_deadlines.style.display = "none";
            BI_deadlines.style.display = "none";
            all_grades.style.display = "none";
            NIT_grades.style.display = "none";
            BI_grades.style.display = "none";
            doc_preview.style.display = "block";
            cmd_list.style.display = "none";

            PDFObject.embed('/Documents/NIT-Handbook.pdf', doc_preview);
        }

        if(text.includes('NIT Slides') || text.includes('NIT slides') || text.includes('NIT Presentations') || text.includes('NIT presentations') || text.includes('Novel Presentations') || text.includes('novel presentations') || text.includes('niit presentations') || text.includes('Marvel presentations')){
            p = document.createElement('p');
            p.classList.add('reply')
            p.innerText = 'Which slides would you like to preview? \n NIT Topic 1 \n NIT Topic 2 \n NIT Topic 3'
            utterance.text = 'Which slides would you like to preview? \n NIT Topic 1 \n NIT Topic 2 \n NIT Topic 3'
            if(audioEnabled == true)
            {
                synth.speak(utterance);
            }
            content.appendChild(p);
        }

        if(text.includes('NIT Topic 1') || text.includes('NIT topic 1') || text.includes('NIT Topic One') || text.includes('NIT topic one') || text.includes('Novel Topic 1') || text.includes('novel topic 1') || text.includes('Novel Topic One') || text.includes('novel topic one') || text.includes('niit topic one') || text.includes('Marvel topic one')){
                
            // DISPLAY PREVIEW
            contentTitle.innerHTML = "Novel Interaction Technologies (NIT): Topic 1";
            contentTitleArea.style.display = "block";
            contentArea.style.display = "block";

            all_timetable.style.display = "none";
            NIT_timetable.style.display = "none";
            BI_timetable.style.display = "none";
            all_deadlines.style.display = "none";
            NIT_deadlines.style.display = "none";
            BI_deadlines.style.display = "none";
            all_grades.style.display = "none";
            NIT_grades.style.display = "none";
            BI_grades.style.display = "none";
            doc_preview.style.display = "block";
            cmd_list.style.display = "none";

            PDFObject.embed('/Documents/NIT_Presentations/NIT_Pres 1.pdf', doc_preview);
        }

        if(text.includes('NIT Topic 2') || text.includes('NIT topic 2') || text.includes('NIT Topic One') || text.includes('NIT topic one') || text.includes('Novel Topic 2') || text.includes('novel topic 2') || text.includes('Novel Topic Two') || text.includes('novel topic two') || text.includes('niit topic two') || text.includes('Marvel topic two')){
            
            // DISPLAY PREVIEW
            contentTitle.innerHTML = "Novel Interaction Technologies (NIT): Topic 2";
            contentTitleArea.style.display = "block";
            contentArea.style.display = "block";

            all_timetable.style.display = "none";
            NIT_timetable.style.display = "none";
            BI_timetable.style.display = "none";
            all_deadlines.style.display = "none";
            NIT_deadlines.style.display = "none";
            BI_deadlines.style.display = "none";
            all_grades.style.display = "none";
            NIT_grades.style.display = "none";
            BI_grades.style.display = "none";
            doc_preview.style.display = "block";
            cmd_list.style.display = "none";

            PDFObject.embed('/Documents/NIT_Presentations/NIT_Pres 2.pdf', doc_preview);
        }

        if(text.includes('NIT Topic 3') || text.includes('NIT topic 3') || text.includes('NIT Topic One') || text.includes('NIT topic one') || text.includes('Novel Topic 3') || text.includes('novel topic 3') || text.includes('Novel Topic Three') || text.includes('novel topic three') || text.includes('niit topic three') || text.includes('Marvel topic three')){
            
            // DISPLAY PREVIEW
            contentTitle.innerHTML = "Novel Interaction Technologies (NIT): Topic 3";
            contentTitleArea.style.display = "block";
            contentArea.style.display = "block";

            all_timetable.style.display = "none";
            NIT_timetable.style.display = "none";
            BI_timetable.style.display = "none";
            all_deadlines.style.display = "none";
            NIT_deadlines.style.display = "none";
            BI_deadlines.style.display = "none";
            all_grades.style.display = "none";
            NIT_grades.style.display = "none";
            BI_grades.style.display = "none";
            doc_preview.style.display = "block";
            cmd_list.style.display = "none";

            PDFObject.embed('/Documents/NIT_Presentations/NIT_Pres 3.pdf', doc_preview);
        }

        if(text.includes('NIT Lab Work') || text.includes('NIT lab work') || text.includes('NIT Labwork') || text.includes('NIT labwork') || text.includes('Novel Labwork') || text.includes('novel labwork') || text.includes('niit labwork') || text.includes('Marvel labwork')){
            p = document.createElement('p');
            p.classList.add('reply')
            p.innerText = 'Which lab work would you like to preview? \n NIT Lab work 1 \n NIT Lab work 2 \n NIT Lab work 3'
            utterance.text = 'Which lab work would you like to preview? \n NIT Lab work 1 \n NIT Lab work 2 \n NIT Lab work 3'
            if(audioEnabled == true)
            {
                synth.speak(utterance);
            }
            content.appendChild(p);
        }

        if(text.includes('NIT Lab work 1') || text.includes('NIT lab work 1') || text.includes('Novel Labwork 1') || text.includes('novel labwork 1') || text.includes('niit labwork 1') || text.includes('Marvel labwork 1')){
                
            // DISPLAY PREVIEW
            contentTitle.innerHTML = "Novel Interaction Technologies (NIT): Lab work 1";
            contentTitleArea.style.display = "block";
            contentArea.style.display = "block";

            all_timetable.style.display = "none";
            NIT_timetable.style.display = "none";
            BI_timetable.style.display = "none";
            all_deadlines.style.display = "none";
            NIT_deadlines.style.display = "none";
            BI_deadlines.style.display = "none";
            all_grades.style.display = "none";
            NIT_grades.style.display = "none";
            BI_grades.style.display = "none";
            doc_preview.style.display = "block";
            cmd_list.style.display = "none";

            PDFObject.embed('/Documents/NIT_Labwork/NIT_Labwork 1.pdf', doc_preview);
        }

        if(text.includes('NIT Lab work 2') || text.includes('NIT lab work 2') || text.includes('Novel Labwork 2') || text.includes('novel labwork 2') || text.includes('niit labwork 2') || text.includes('Marvel labwork 2')){
            
            // DISPLAY PREVIEW
            contentTitle.innerHTML = "Novel Interaction Technologies (NIT): Lab work 2";
            contentTitleArea.style.display = "block";
            contentArea.style.display = "block";

            all_timetable.style.display = "none";
            NIT_timetable.style.display = "none";
            BI_timetable.style.display = "none";
            all_deadlines.style.display = "none";
            NIT_deadlines.style.display = "none";
            BI_deadlines.style.display = "none";
            all_grades.style.display = "none";
            NIT_grades.style.display = "none";
            BI_grades.style.display = "none";
            doc_preview.style.display = "block";
            cmd_list.style.display = "none";

            PDFObject.embed('/Documents/NIT_Labwork/NIT_Labwork 2.pdf', doc_preview);
        }

        if(text.includes('NIT Lab work 3') || text.includes('NIT lab work 3') || text.includes('Novel Labwork 3') || text.includes('novel labwork 3') || text.includes('niit labwork 3') || text.includes('Marvel labwork 3')){
            
            // DISPLAY PREVIEW
            contentTitle.innerHTML = "Novel Interaction Technologies (NIT): Lab work 3";
            contentTitleArea.style.display = "block";
            contentArea.style.display = "block";

            all_timetable.style.display = "none";
            NIT_timetable.style.display = "none";
            BI_timetable.style.display = "none";
            all_deadlines.style.display = "none";
            NIT_deadlines.style.display = "none";
            BI_deadlines.style.display = "none";
            all_grades.style.display = "none";
            NIT_grades.style.display = "none";
            BI_grades.style.display = "none";
            doc_preview.style.display = "block";
            cmd_list.style.display = "none";

            PDFObject.embed('/Documents/NIT_Labwork/NIT_Labwork 3.pdf', doc_preview);
        }
            
        if(text.includes('BI Material') || text.includes('BI material') || text.includes('Business Material') || text.includes('business material')){
            p = document.createElement('p');
            p.classList.add('reply')
            p.innerText = 'Would you like to see specific Module Material? \n NIT Material \n BI Material'
            utterance.text = 'Would you like to see specific Module Material? \n NIT Material \n BI Material'
            if(audioEnabled == true)
            {
                synth.speak(utterance);
            }
            content.appendChild(p);
        }

        if(text.includes('BI Handbook') || text.includes('BI handbook') || text.includes('Business Handbook') || text.includes('business handbook')){
            
            //DISPLAY HANDBOOK PREVIEW
            contentTitle.innerHTML = "Business Intelligence (BI): Handbook";
            contentTitleArea.style.display = "block";
            contentArea.style.display = "block";

            all_timetable.style.display = "none";
            NIT_timetable.style.display = "none";
            BI_timetable.style.display = "none";
            all_deadlines.style.display = "none";
            NIT_deadlines.style.display = "none";
            BI_deadlines.style.display = "none";
            all_grades.style.display = "none";
            NIT_grades.style.display = "none";
            BI_grades.style.display = "none";
            doc_preview.style.display = "block";
            cmd_list.style.display = "none";

            PDFObject.embed('/Documents/BI-Handbook.pdf', doc_preview);
        }

        if(text.includes('BI Slides') || text.includes('BI slides') || text.includes('BI Presentations') || text.includes('BI presentations') || text.includes('Business Presentations') || text.includes('business presentations')){
            p = document.createElement('p');
            p.classList.add('reply')
            p.innerText = 'Which slides would you like to preview? \n BI Topic 1 \n BI Topic 2 \n BI Topic 3'
            utterance.text = 'Which slides would you like to preview? \n BI Topic 1 \n BI Topic 2 \n BI Topic 3'
            if(audioEnabled == true)
            {
                synth.speak(utterance);
            }
            content.appendChild(p);
        }

        if(text.includes('BI Topic 1') || text.includes('BI topic 1')){
                
            // DISPLAY PREVIEW
            contentTitle.innerHTML = "Business Intelligence (BI): Topic 1";
            contentTitleArea.style.display = "block";
            contentArea.style.display = "block";

            all_timetable.style.display = "none";
            NIT_timetable.style.display = "none";
            BI_timetable.style.display = "none";
            all_deadlines.style.display = "none";
            NIT_deadlines.style.display = "none";
            BI_deadlines.style.display = "none";
            all_grades.style.display = "none";
            NIT_grades.style.display = "none";
            BI_grades.style.display = "none";
            doc_preview.style.display = "block";
            cmd_list.style.display = "none";

            PDFObject.embed('/Documents/BI_Presentations/BI_Pres 1.pdf', doc_preview);
        }

        if(text.includes('BI Topic 2') || text.includes('BI topic 2')){
            
            // DISPLAY PREVIEW
            contentTitle.innerHTML = "Business Intelligence (BI): Topic 2";
            contentTitleArea.style.display = "block";
            contentArea.style.display = "block";

            all_timetable.style.display = "none";
            NIT_timetable.style.display = "none";
            BI_timetable.style.display = "none";
            all_deadlines.style.display = "none";
            NIT_deadlines.style.display = "none";
            BI_deadlines.style.display = "none";
            all_grades.style.display = "none";
            NIT_grades.style.display = "none";
            BI_grades.style.display = "none";
            doc_preview.style.display = "block";
            cmd_list.style.display = "none";

            PDFObject.embed('/Documents/BI_Presentations/BI_Pres 2.pdf', doc_preview);
        }

        if(text.includes('BI Topic 3') || text.includes('BI topic 3')){
            
            // DISPLAY PREVIEW
            contentTitle.innerHTML = "Business Intelligence (BI): Topic 3";
            contentTitleArea.style.display = "block";
            contentArea.style.display = "block";

            all_timetable.style.display = "none";
            NIT_timetable.style.display = "none";
            BI_timetable.style.display = "none";
            all_deadlines.style.display = "none";
            NIT_deadlines.style.display = "none";
            BI_deadlines.style.display = "none";
            all_grades.style.display = "none";
            NIT_grades.style.display = "none";
            BI_grades.style.display = "none";
            doc_preview.style.display = "block";
            cmd_list.style.display = "none";

            PDFObject.embed('/Documents/BI_Presentations/BI_Pres 3.pdf', doc_preview);
        }

        if(text.includes('BI Lab Work') || text.includes('BI lab work') || text.includes('BI Labwork') || text.includes('BI labwork') || text.includes('Business Labwork') || text.includes('Business labwork')){
            p = document.createElement('p');
            p.classList.add('reply')
            p.innerText = 'Which lab work would you like to preview? \n Lab work 1 \n Lab work 2 \n Lab work 3'
            utterance.text = 'Which lab work would you like to preview? \n Lab work 1 \n Lab work 2 \n Lab work 3'
            if(audioEnabled == true)
            {
                synth.speak(utterance);
            }
            content.appendChild(p);
        }

        if(text.includes('BI Lab work 1') || text.includes('BI lab work 1')){

            // DISPLAY PREVIEW
            contentTitle.innerHTML = "Business Intelligence (BI): Lab work 1";
            contentTitleArea.style.display = "block";
            contentArea.style.display = "block";

            all_timetable.style.display = "none";
            NIT_timetable.style.display = "none";
            BI_timetable.style.display = "none";
            all_deadlines.style.display = "none";
            NIT_deadlines.style.display = "none";
            BI_deadlines.style.display = "none";
            all_grades.style.display = "none";
            NIT_grades.style.display = "none";
            BI_grades.style.display = "none";
            doc_preview.style.display = "block";
            cmd_list.style.display = "none";

            PDFObject.embed('/Documents/BI_Labwork/BI_Labwork 1.pdf', doc_preview);
        }

        if(text.includes('BI Lab work 2') || text.includes('BI lab work 2')){

            // DISPLAY PREVIEW
            contentTitle.innerHTML = "Business Intelligence (BI): Lab work 2";
            contentTitleArea.style.display = "block";
            contentArea.style.display = "block";
            
            all_timetable.style.display = "none";
            NIT_timetable.style.display = "none";
            BI_timetable.style.display = "none";
            all_deadlines.style.display = "none";
            NIT_deadlines.style.display = "none";
            BI_deadlines.style.display = "none";
            all_grades.style.display = "none";
            NIT_grades.style.display = "none";
            BI_grades.style.display = "none";
            doc_preview.style.display = "block";
            cmd_list.style.display = "none";

            PDFObject.embed('/Documents/BI_Labwork/BI_Labwork 2.pdf', doc_preview);
        }

        if(text.includes('BI Lab work 3') || text.includes('BI lab work 3')){

            // DISPLAY PREVIEW
            contentTitle.innerHTML = "Business Intelligence (BI): Lab work 3";
            contentTitleArea.style.display = "block";
            contentArea.style.display = "block";

            all_timetable.style.display = "none";
            NIT_timetable.style.display = "none";
            BI_timetable.style.display = "none";
            all_deadlines.style.display = "none";
            NIT_deadlines.style.display = "none";
            BI_deadlines.style.display = "none";
            all_grades.style.display = "none";
            NIT_grades.style.display = "none";
            BI_grades.style.display = "none";
            doc_preview.style.display = "block";
            cmd_list.style.display = "none";

            PDFObject.embed('/Documents/BI_Labwork/BI_Labwork 3.pdf', doc_preview);
        }
            
        // =================================== GRADES ===================================
        if(text.includes('Course Grades') || text.includes('course grades') || text.includes('Course Marks') ||  text.includes('course marks')){
            p = document.createElement('p');
            p.classList.add('reply')
            p.innerText = 'Which module grades would you like to see? \n NIT Grades \n BI Grades'
            utterance.text = 'Which module grades would you like to see? \n NIT Grades \n BI Grades'
            if(audioEnabled == true)
            {
                synth.speak(utterance);
            }
            
            content.appendChild(p);

            // DISPLAY ALL TABLE OF ALL GRADES
            contentTitle.innerHTML = "Course Grades";
            contentTitleArea.style.display = "block";
            contentArea.style.display = "block";

            all_timetable.style.display = "none";
            NIT_timetable.style.display = "none";
            BI_timetable.style.display = "none";
            all_deadlines.style.display = "none";
            NIT_deadlines.style.display = "none";
            BI_deadlines.style.display = "none";
            all_grades.style.display = "block";
            NIT_grades.style.display = "none";
            BI_grades.style.display = "none";
            doc_preview.style.display = "none";
            cmd_list.style.display = "none";
        }

        if(text.includes('NIT Grades') || text.includes('NIT grades') || text.includes('NIT Marks') || text.includes('NIT marks') || text.includes('Novel Grades') || text.includes('novel grades') || text.includes('niit grades') || text.includes('Marvel grades')){
                
            // DISPLAY NIT GRADES
            contentTitle.innerHTML = "Novel Interaction Technologies (NIT): Grades";
            contentTitleArea.style.display = "block";
            contentArea.style.display = "block";

            all_timetable.style.display = "none";
            NIT_timetable.style.display = "none";
            BI_timetable.style.display = "none";
            all_deadlines.style.display = "none";
            NIT_deadlines.style.display = "none";
            BI_deadlines.style.display = "none";
            all_grades.style.display = "none";
            NIT_grades.style.display = "block";
            BI_grades.style.display = "none";
            doc_preview.style.display = "none";
            cmd_list.style.display = "none";
        }

        if(text.includes('BI Grades') || text.includes('BI grades') || text.includes('BI Marks') || text.includes('BI marks') || text.includes('Business Grades') || text.includes('business grades')){
            
            // DISPLAY BI GRADES
            contentTitle.innerHTML = "Business Intelligence (BI): Grades";
            contentTitleArea.style.display = "block";
            contentArea.style.display = "block";

            all_timetable.style.display = "none";
            NIT_timetable.style.display = "none";
            BI_timetable.style.display = "none";
            all_deadlines.style.display = "none";
            NIT_deadlines.style.display = "none";
            BI_deadlines.style.display = "none";
            all_grades.style.display = "none";
            NIT_grades.style.display = "none";
            BI_grades.style.display = "block";
            doc_preview.style.display = "none";
            cmd_list.style.display = "none";
        }

        // ============================ VOICE COMMAND LIST =============================
        if(text.includes('Voice Command List') || text.includes('voice command list') || text.includes('Command list') ||  text.includes('command list')){
            
            // DISPLAY ALL VOICE COMMANDS
            contentTitle.innerHTML = "Voice Command List";
            contentTitleArea.style.display = "block";
            contentArea.style.display = "block";

            all_timetable.style.display = "none";
            NIT_timetable.style.display = "none";
            BI_timetable.style.display = "none";
            all_deadlines.style.display = "none";
            NIT_deadlines.style.display = "none";
            BI_deadlines.style.display = "none";
            all_grades.style.display = "none";
            NIT_grades.style.display = "none";
            BI_grades.style.display = "none";
            doc_preview.style.display = "none";
            cmd_list.style.display = "block";
        }

        p = document.createElement('p');
        
    }

    console.log(text);
})


