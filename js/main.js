// shorten id calls
const $ = function(id) {
    return document.getElementById(id)
}

// append template HTML
function appendTemplate(childId, parentId) {
    var temp = $(childId)
    var clon = temp.content.cloneNode(true)
    $(parentId).appendChild(clon)
}

// fetch quiz data, error if failed
fetch('data/quiz.json')
.then(response => response.json())
.then(quiz => {
    // set content from quiz data
    console.log('Quiz data loaded.')
    document.title = quiz.title
    $('meta-description').setAttribute('content', quiz.description)
    $('title').innerHTML = quiz.title
    $('description').innerHTML = quiz.description
})
.catch(error => {
    console.error('Error fetching quiz data:', error)
})

function beginQuestionFlow() {
    // animate out intro page
    $('begin').classList.add('animated', 'fadeOutRightBig')
    $('dialog').classList.add('animated', 'fadeOutLeftBig')
    $('krypton').classList.add('animated', 'flipOutY')

    // fetch question data, error if failed
    fetch('data/questions.json')
    .then(response => response.json())
    .then(questions => {
        // loop through questions
        questions.forEach(question => {
            console.log(question.question)
        });

        // append question template HTML
        appendTemplate('questionTemplate', 'innerGrid')
        
        // animate question entry
        $('bubble').classList.add('animated', 'bounceIn')

        // set question number and question data
        var questionNumber = 0
        $('questionHead').innerHTML = questions[questionNumber].question
        $('answer1').innerHTML = questions[questionNumber].answers[0]
        $('answer2').innerHTML = questions[questionNumber].answers[1]

        // track user's score
        var score = 0
        function updateScore() {
            $('score').innerHTML = 'Score: ' + score
        }
        updateScore()

        $('answersGrid').addEventListener("click", 
            function answerCheck(e) {
            // check for correct answer
            if (e.target.id === 'answer' + questions[questionNumber].correct) {
                //fade out question
                $('bubble').classList.add('animated', 'bounceOut')
                $('answersGrid').classList.add('animated', 'fadeOut')
                
                // update score
                score++
                updateScore()

                // fade in correct answer, explanation, and next question button
                appendTemplate('nextTemplate', 'innerGrid')
                $('explanation').innerHTML = questions[questionNumber].explanation

                // fade in correct, explanation, and next
                $('explanation').classList.add('animated', 'fadeIn')
                $('next').classList.add('animated', 'fadeIn')
                $('correct').classList.add('animated', 'tada')

                // increment question number
                questionNumber++

                console.log("correct answer")
                console.log(score)
            } else {
                $(e.target.id).classList.add('animated', 'shake')
                // $(e.target.id).classList.remove('animated', 'shake')
                console.log("You are an idiot")
            }

            // console.log('answer' + questions[questionNumber].correct)
            // console.log(e.target.id)
        })
        
        console.log('Question data loaded.')
        // console.log(questions[0].question)
    })
    .catch(error => {
        console.error('Error fetching question data:', error)
    })
}