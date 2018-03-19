// shorten id calls
var $ = function(id) {
    return document.getElementById(id)
}

// append template HTML
function appendTemplate(childId, parentId) {
    var clon = $(childId).content.cloneNode(true)
    $(parentId).appendChild(clon)
}

// fetch quiz data, error if failed
fetch('data/quiz.json')
.then(response => response.json())
.then(quiz => {
    // set document content from quiz data
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
        // append question template HTML
        appendTemplate('questionTemplate', 'innerGrid')

        // set question number and question data
        var questionNumber = 0

        // set the user's score
        var score = 0

        // update the user's score
        function updateScore() {
            $('score').innerHTML = `Score: ${score}/${questions.length}`
        }
        updateScore()

        // set question data
        function setQuestionData() {
            // remove previous question animations
            if (questionNumber !== 0) {
                $('bubble').classList.remove('animated', 'bounceOut')
                $('answer1').classList.remove('animated', 'fadeOut')
                $('answer2').classList.remove('animated', 'fadeOut')

                $('answer1').classList.add('animated', 'fadeIn')
                $('answer2').classList.add('animated', 'fadeIn')

            } else {
                setTimeout(() => {
                    $('innerGrid').removeChild($('begin'))
                }, 300);
            }
            
            // set question data
            $('questionHead').innerHTML = questions[questionNumber].question
            $('answer1').innerHTML = questions[questionNumber].answers[0]
            $('answer2').innerHTML = questions[questionNumber].answers[1]

            // animate question entry
            $('bubble').classList.add('animated', 'bounceIn')
        }

        setQuestionData()

        $('answersGrid').addEventListener("click", 
                function answerCheck(e) {
                // check for correct answer
                if (e.target.id === 'answer' + questions[questionNumber].correct) {
                    // remove previous animations
                    if (questionNumber !== 0) {
                        $('explanation').classList.remove('animated', 'fadeIn', 'fadeOut')
                        $('next').classList.remove('animated', 'fadeIn', 'fadeOut')
                        $('correct').classList.remove('animated', 'tada', 'fadeOut')
                    }

                    //fade out question
                    $('bubble').classList.add('animated', 'bounceOut')
                    $('answer1').classList.add('animated', 'fadeOut')
                    $('answer2').classList.add('animated', 'fadeOut')

                    if (questionNumber === 0) {
                        // append next question button
                        appendTemplate('nextTemplate', 'innerGrid')
                        appendTemplate('explanationTemplate', 'innerGrid')
                    }

                    // append explanation and correct template
    
                    $('explanation').innerHTML = questions[questionNumber].explanation

                    // fade in correct, explanation, and next
                    $('explanation').classList.add('animated', 'fadeIn')
                    $('next').classList.add('animated', 'fadeIn')
                    $('correct').classList.add('animated', 'tada')

                    // update score
                    score++
                    updateScore()

                    // increment question number
                    questionNumber++

                    // reset question when next is clicked
                    $('next').addEventListener('click', 
                        function resetQuestion() {
                            // fade out correct, explanation, and next
                            $('next').classList.add('animated', 'fadeOut')
                            $('correct').classList.add('animated', 'fadeOut')
                            $('explanation').classList.add('animated', 'fadeOut')

                            if (questionNumber > 5) {
                                console.log('Reached end of questionaire.')
                            } else {
                                // set next question
                                setQuestionData()
                            }
                        })
                } else {
                    $(e.target.id).classList.add('animated', 'shake')
                    setTimeout(() => {
                        $(e.target.id).classList.remove('animated', 'shake')
                    }, 700);
                }
            })
    })
    .catch(error => {
        console.error('Error fetching question data:', error)
    })
}

$('begin').addEventListener('click', beginQuestionFlow)