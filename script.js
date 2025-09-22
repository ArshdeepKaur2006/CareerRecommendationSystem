let currentStep = 1;
let userData = {
    stream: "",
    interests: [],
    quiz1Score: 0,
    quiz2Score: 0
};

// Show first step
document.addEventListener("DOMContentLoaded",
    function(){
           document.getElementById("step1").style.display = "block";
    }
);


function nextStep(step) {
    if (step === 1) {
        const stream = document.getElementById("stream").value;
        if (!stream) {
            alert("Please select a stream.");
            return;
        }
        userData.stream = stream;
    }

    if (step === 2) {
        const interests = Array.from(document.querySelectorAll("#step2 input[type=checkbox]:checked")).map(el => el.value);
        if (interests.length === 0) {
            alert("Select at least one interest.");
            return;
        }
        userData.interests = interests;
    }

    if (step === 3) {
        // Check quiz1 answers
        const quiz1Answers = Array.from(document.querySelectorAll("#quiz1 input[type=radio]:checked"));
        if (quiz1Answers.length !== quiz1Questions.length) {
            alert("Answer all questions.");
            return;
        }
        userData.quiz1Score = quiz1Answers.filter(ans => ans.value === "1").length;
    }

    if (step === 4) {
        // Check quiz2 answers
        const quiz2Answers = Array.from(document.querySelectorAll("#quiz2 input[type=radio]:checked"));
        userData.quiz2Score = quiz2Answers.filter(ans => ans.value === "1").length;
    }

    // Hide current step
    document.getElementById(`step${step}`).style.display = "none";

    currentStep++;
    if(currentStep <= 5) document.getElementById(`step${currentStep}`).style.display = "block";
    if(currentStep === 3) loadQuiz1();
    if(currentStep === 4) loadQuiz2();
    if(currentStep === 5) showRecommendation();
}

// --- Quiz Questions ---
const quiz1Questions = [
    { q:"Do you enjoy puzzles and logical problems?",options: ["Yes","No"], correct: "Yes" },
    { q:"Do you like working in teams or alone?",options: ["Team","Alone"], correct: "Team" },
    { q:"Do you enjoy helping others with their problems?",options: ["Yes","No"], correct: "Yes" },
    { q:"Do you find it exiciting to learn about new technologies?",options: ["Yes","No"], correct: "Yes"  },
    { q:"Is 39 a prime number?",options: ["Yes","No"], correct: "Yes" },
    { q:"Is the Sun a planet?",options: ["Yes","No"], correct: "No" },
    { q: "Which sport is known as the 'king of sports'?", options: ["Cricket","Football(Soccer)","Basketball", "Tennis"], correct: "Football(Soccer)" },
    { q: "Which animal is known as the 'Ship of the desert'?", options: ["Horse","Camel","Donkey", "Elephant"], correct: "Camel" }
];

const quiz2Questions = {
    science: [
        { q: "What is the center of an atom called?", options: ["Proton","Nucleus","Electron", "Neutron"], correct: "Nucleus" },
        { q: "Which planet is known as the 'Blue Planet'?", options: ["Earth", "Neptune","Uranus","Jupiter"], correct: "Earth" },
         { q: "Water boils at what temperature(at sea level)?", options: ["50DegC","75DegC","100DegC", "120DegC"], correct: "100DegC" },
        { q: "Which part of the plant makes food through photosynthesis?", options: ["Roots","Stem","Leaves","Flowers"], correct: "Leaves" },
         { q: "Which force pulls objects towards the Earth?", options: ["Gravity","Friction","Magnetism","Electricity"], correct: "Gravity" },
        { q: "Which planet is the largest in our solar system?", options: ["Earth", "Neptune","Uranus","Jupiter"], correct: "Jupiter" }
    ],
    commerce: [
        { q: "Profit = Revenue - ?", options: ["Cost", "Mass"], correct: "Cost" },
        { q: "Who is known as thw 'Father of Economics'?", options: ["Adam Smith","Karl Marx","John Keynes","Alferd Marshall"], correct: "Adam Smith" },
         { q: "Which company is called the 'Big Tech Giant?", options: ["Reliance","Apple","Tata", "Infosys"], correct: "Apple" },
        { q: "Which currency is used in Japan?", options: ["Yuan", "Yen","Won","Dollar"], correct: "Yen" },
         { q: "Which is the largest stock exchange in India?", options: ["BSE","NSE","NYSE", "LSE"], correct: "NSE" },
        { q: "Which tax was replaced by GST in India?", options: ["Sales Tax", "Property Tax","Income Tax","Customs Duty"], correct: "Sales Tax" }
    ],
    arts: [
        { q: "Who was the first President of India?", options: ["Jawaharlal Nehru","Rajendra Prased","Saradr Patel" ,"Zakir Hussain"], correct: "Rajendra Prased" },
        { q: "Which empire was ruled by Akbar?", options: ["Mughal Empire","Maratha Empire","Maurya Empire","Gupta Empire"], correct: "Mughal Empire" },
        { q: "Which is the smallest country in the world by area?", options: ["Monaco", "Vatican City","Liechtenstein","Malta"], correct: "Vatican City" },
        { q: "What is the capital of Autralia?", options: ["Sydney", "Melbourne","Canberra","Perth"], correct: "Canberra" },
         { q: "Which article in the Indian Constitution gurantees the Right to Education?", options: ["Article 14A","Article 21A","Article 19B","Article 32"], correct: "Article 21A" },
        { q: "Choose the correct antonym for 'Generous'?", options: ["King", "Stingy","Helpful","Loving"], correct: "Stingy" }
    ]
};

function loadQuiz1() {
    const quizDiv = document.getElementById("quiz1");
    quizDiv.innerHTML = "";
    quiz1Questions.forEach((item, idx) => {
        let html = `<p>${idx+1}. ${item.q}</p>`;
        item.options.forEach(opt => {
            html += `<label><input type="radio" name="q${idx}" value="${opt===item.correct?1:0}"> ${opt}</label>`;
        });
        quizDiv.innerHTML += html;
    });
}

function loadQuiz2() {
    const quizDiv = document.getElementById("quiz2");
    quizDiv.innerHTML = "";
    const questions = quiz2Questions[userData.stream];
    questions.forEach((item, idx) => {
        let html = `<p>${idx+1}. ${item.q}</p>`;
        item.options.forEach(opt => {
            html +=`<label><input type="radio" name="sq${idx}" value="${opt===item.correct?1:0}"> ${opt}</label>`;
        });
        quizDiv.innerHTML += html;
    });
}

function showRecommendation() {
    const recDiv = document.getElementById("recommendation");
    let career = "";
    let roadmap = "";

    if(userData.stream === "science") {
        if(userData.quiz2Score >= 4) {
            career = "Engineer / Scientist";
            roadmap = "B.Tech → M.Tech → Research or Industry Jobs";
        } else {
            career = "Medical / Healthcare Professional";
            roadmap = "MBBS/BDS/B.Pharm → Specialization → Practice";
        }
    } else if(userData.stream === "commerce") {
        if(userData.quiz2Score >= 4) {
            career = "Business Analyst / Finance Professional";
            roadmap = "B.Com / BBA → MBA → Corporate Jobs";
        } else {
            career = "Entrepreneur / Marketing";
            roadmap = "BBA → Internships → Startups / Marketing Roles";
        }
    } else if(userData.stream === "arts") {
        career = "Creative Professional";
        roadmap = "BA → Specialized Courses → Freelancing / Jobs in Arts & Media";
    }

    recDiv.innerHTML = `<h3>Suggested Career: ${career}</h3><p>Roadmap: ${roadmap}</p>`;
}