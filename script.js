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

        if(text.includes() === false){
            userAssist.style.display = "none";

            p = document.createElement('p');
            p.classList.add('reply')
            p.innerText = 'Sorry, I did not understand. \n  You can say "Voice Command List" to display a list of things you can say.'
            utterance.text = 'Sorry, I did not understand. You can say "Voice Command List" to display a list of things you can say.'
            content.appendChild(p);

            if(audioEnabled == true)
            {
                synth.speak(utterance);
            }
        }

        if(text.includes('Hello') || text.includes('hello')){
            userAssist.style.display = "none";

            p = document.createElement('p');
            p.classList.add('reply')
            p.innerText = 'Hello, I am the University Helper-bot. Here are some commands you can use:\n - Course Timetable \n - Course Material \n - Course Grades \n - Enable or Disable audio assist \n - Voice Command List'
            utterance.text = 'Hello, I am the University Helper-bot. Here are some commands you can use: Course Timetable, Course Material, Course Grades, Enable or Disable audio assist or Voice Command List'
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
            p.innerText = 'Audio assist has been Enabled. You can disable audio assist by saying: \n  - Disable audio assist \n - Turn off audio'
            utterance.text = 'Audio assist has been Enabled. You can disable audio assist by saying:  Disable audio assist, or Turn off audio'
            synth.speak(utterance);
            content.appendChild(p);
        }

        if(text.includes('Disable audio assist') || text.includes('Turn off audio') || text.includes('disable audio assist') ||  text.includes('turn off audio')){
            userAssist.style.display = "none";
            
            audioEnabled = false;
            btn_audioAssist.innerHTML = "🔈";
            btn_audioAssist.style.background= '#03DAC5';
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
            p.innerText = 'Would you like to see specific Lecture/Deadline Schedules? \n - Novel Timetable \n - Business Timetable \n - Coursework Deadlines'
            utterance.text = 'Would you like to see specific Lecture/Deadline Schedules?, Novel Timetable, Business Timetable or Coursework Deadlines'
            if(audioEnabled == true)
            {
                synth.speak(utterance);
            }
            content.appendChild(p);

            // DISPLAY TIMETABLE
            contentTitle.innerHTML = "Course Timetable";
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
        
        if(text.includes('Novel Timetable') || text.includes('novel timetable') || text.includes('Marvel timetable') || text.includes('Nuffield timetable')){
                
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

        if(text.includes('Business Timetable') || text.includes('business timetable')){
            
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

        if(text.includes('Coursework Deadlines') || text.includes('coursework deadlines') || text.includes('Course work Deadlines') || text.includes('course work deadlines')){
            p = document.createElement('p');
            p.classList.add('reply')
            p.innerText = 'Would you like to see specific Module Deadlines? \n - Novel Deadlines \n - Business Deadlines'
            utterance.text = 'Would you like to see specific Module Deadlines?, Novel Deadlines or Business Deadlines'
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

        if(text.includes('Novel deadline') || text.includes('novel deadline') || text.includes('Marvel deadline') || text.includes('Nuffield deadline')){
                
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

        if(text.includes('Business Deadline') || text.includes('business deadline')){
            
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
            p.innerText = 'Would you like to see specific Module Material? \n - Novel Material \n - Business Material'
            utterance.text = 'Would you like to see specific Module Material?, Novel Material or Business Material'
            if(audioEnabled == true)
            {
                synth.speak(utterance);
            }
            content.appendChild(p);
        }

        if(text.includes('Novel Material') || text.includes('novel material') || text.includes('Marvel material') || text.includes('Nuffield material')){
            p = document.createElement('p');
            p.classList.add('reply')
            p.innerText = 'Which material would you like to preview? \n - Novel Handbook \n - Novel Presentations \n - Novel Lab Work'
            utterance.text = 'Which material would you like to preview?, Novel Handbook, Novel Presentations or Novel Lab Work'
            if(audioEnabled == true)
            {
                synth.speak(utterance);
            }
            content.appendChild(p);
        }

        if(text.includes('Novel Handbook') || text.includes('novel handbook') || text.includes('Marvel handbook') || text.includes('Nuffield handbook')){
            
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

        if(text.includes('Novel Presentation') || text.includes('novel presentation') || text.includes('Marvel presentation') || text.includes('Nuffield presentation')){
            p = document.createElement('p');
            p.classList.add('reply')
            p.innerText = 'Which topics would you like to preview? \n - Novel Topic 1 \n - Novel Topic 2 \n - Novel Topic 3'
            utterance.text = 'Which topics would you like to preview?, Novel Topic 1, Novel Topic 2 or Novel Topic 3'
            if(audioEnabled == true)
            {
                synth.speak(utterance);
            }
            content.appendChild(p);
        }

        if(text.includes('Novel Topic 1') || text.includes('novel topic 1') || text.includes('Novel Topic One') || text.includes('novel topic one') || text.includes('Marvel topic one') || text.includes('Nuffield topic one')){
                
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

        if(text.includes('Novel Topic 2') || text.includes('novel topic 2') || text.includes('Novel Topic Two') || text.includes('novel topic two') || text.includes('Marvel topic two') || text.includes('Nuffield topic two')){
            
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

        if(text.includes('Novel Topic 3') || text.includes('novel topic 3') || text.includes('Novel Topic Three') || text.includes('novel topic three') || text.includes('Marvel topic three') || text.includes('Nuffield topic three')){
            
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

        if(text.includes('Novel Labwork') || text.includes('novel labwork') || text.includes('Marvel labwork') || text.includes('Nuffield labwork')){
            p = document.createElement('p');
            p.classList.add('reply')
            p.innerText = 'Which lab work would you like to preview? \n - Novel Lab work 1 \n - Novel Lab work 2 \n - Novel Lab work 3'
            utterance.text = 'Which lab work would you like to preview?, Novel Lab work 1, Novel Lab work 2 or Novel Lab work 3'
            if(audioEnabled == true)
            {
                synth.speak(utterance);
            }
            content.appendChild(p);
        }

        if(text.includes('Novel Labwork 1') || text.includes('novel labwork 1') || text.includes('Marvel labwork 1') || text.includes('Nuffield labwork 1')){
                
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

        if(text.includes('Novel Labwork 2') || text.includes('novel labwork 2') || text.includes('Marvel labwork 2') || text.includes('Nuffield labwork 2')){
            
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

        if(text.includes('Novel Labwork 3') || text.includes('novel labwork 3') || text.includes('Marvel labwork 3') || text.includes('Nuffield labwork 3')){
            
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
            
        if(text.includes('Business Material') || text.includes('business material')){
            p = document.createElement('p');
            p.classList.add('reply')
            p.innerText = 'Which material would you like to preview? \n - Business Handbook \n - Business Presentations \n - Business Lab Work'
            utterance.text = 'Which material would you like to preview?, Business Handbook, Business Presentations or Business Lab Work'
            if(audioEnabled == true)
            {
                synth.speak(utterance);
            }
            content.appendChild(p);
        }

        if(text.includes('Business Handbook') || text.includes('business handbook')){
            
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

        if(text.includes('Business Slide') || text.includes('business slide') || text.includes('Business Presentation') || text.includes('business presentation')){
            p = document.createElement('p');
            p.classList.add('reply')
            p.innerText = 'Which topics would you like to preview? \n - Business Topic 1 \n - Business Topic 2 \n - Business Topic 3'
            utterance.text = 'Which topics would you like to preview?, Business Topic 1, Business Topic 2 or Business Topic 3'
            if(audioEnabled == true)
            {
                synth.speak(utterance);
            }
            content.appendChild(p);
        }

        if(text.includes('Business Topic 1') || text.includes('business topic 1') || text.includes('Business Topic one') || text.includes('business topic one')){
                
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

        if(text.includes('Business Topic 2') || text.includes('business topic 2') || text.includes('Business Topic two') || text.includes('business topic two')){
            
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

        if(text.includes('Business Topic 3') || text.includes('business topic 3') || text.includes('Business Topic three') || text.includes('business topic three')){
            
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

        if(text.includes('Business Labwork') || text.includes('business labwork')){
            p = document.createElement('p');
            p.classList.add('reply')
            p.innerText = 'Which lab work would you like to preview? \n - Lab work 1 \n - Lab work 2 \n - Lab work 3'
            utterance.text = 'Which lab work would you like to preview?, Lab work 1, Lab work 2 or Lab work 3'
            if(audioEnabled == true)
            {
                synth.speak(utterance);
            }
            content.appendChild(p);
        }

        if(text.includes('Business Lab work 1') || text.includes('business lab work 1')  || text.includes('Business Lab work One') || text.includes('business lab work one')){

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

        if(text.includes('Business Lab work 2') || text.includes('business lab work 2')  || text.includes('Business Lab work Two') || text.includes('business lab work two')){

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

        if(text.includes('Business Lab work 3') || text.includes('business lab work 3')  || text.includes('Business Lab work Three') || text.includes('business lab work three')){

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
            p.innerText = 'Which module grades would you like to see? \n - Novel Grades \n - Business Grades'
            utterance.text = 'Which module grades would you like to see?, Novel Grades or Business Grades'
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

        if(text.includes('Novel Grades') || text.includes('novel grades') || text.includes('Marvel grades') || text.includes('Nuffield grades')){
                
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

        if(text.includes('Business Grades') || text.includes('business grades')){
            
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


