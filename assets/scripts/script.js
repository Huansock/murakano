//  var fetch = require('node-fetch')
const One = document.getElementById("contents")
const 요청키 = String(One.dataset.id)


let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

// 메세지를 주는 함수
const message = async (fin_text, interim, isfinal) => {
    let text = `${fin_text || interim}`
    document.getElementById('script').innerHTML = text;
    if (isfinal) {
        const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${요청키}`, {
            method: "POST",
            body: JSON.stringify({
                "q": fin_text,
                "target": "de",
            })
        })

        const 번역 = await response.json();
        const 독어번역 = 번역["data"]["translations"][0]["translatedText"]
        document.getElementById('translated').innerHTML = 독어번역;

    }


}

// 브라우저 체킹 함수
function checkCompatibility() {
    if (!recognition) {
        document.getElementById("available").innerHTML = ("음성인식 사용불가 /아이폰사파리 혹은 노트북 크롬브라우저로 입장하시길 바랍니다. ")

    } else {
        document.getElementById("available").innerHTML = ("음성인식 사용가능 ")

    }
}
//  끝나는 이벤트에 대한 핸들러
function onend(e) {
    recognition.start()
}
//  결과값 이벤트 핸들러
function onresult(event) {
    let fin_text = ""
    let interim = ""
    let isfinal = false
    // console.log(event.results.length)
    // console.log(event.results)
    // console.log(event.results.transcript)

    for (let i = 0; i < event.results.length; i++) {
        let res = event.results[i]
        let trans = res[0].transcript
        if (res.isFinal) {
            fin_text += trans
            isfinal = true
        } else {
            interim += trans
        }
    }
    message(fin_text.trim(), interim.trim(), isfinal)
}

function onstart(e) {
    checkCompatibility();
}

// 기본적인 음성인식 설정
recognition.lang = "ko"
recognition.continuous = false
recognition.interimResults = true
recognition.maxAlternatives = 10000
recognition.onresult = onresult
recognition.onend = onend
recognition.onstart = onstart
recognition.start()