// shorten id calls
const $ = function(id) {
    return document.getElementById(id)
}

// append template HTML
function appendTemplate(childId, parentId) {
    const clon = $(childId).content.cloneNode(true)
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
        // update the user's score
        function updateScore() {
            $('score').innerHTML = `Score: ${score}/${questions.length}`
        }

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
                // remove begin button
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

        // append question template HTML
        appendTemplate('questionTemplate', 'innerGrid')

        // set question number and question data
        let questionNumber = 0

        // set the user's score
        let score = 0

        // update and show score
        updateScore()

        // set first question data to appended HTML
        setQuestionData()

        // check to see if clicked target is the correct answer
        $('answersGrid').addEventListener("click", 
                function answerCheck(e) {
                // check for correct answer
                if (e.target.id === 'answer' + questions[questionNumber].correct) {
                    // remove previous animations except on the first question
                    if (questionNumber !== 0) {
                        $('explanation').classList.remove('animated', 'fadeIn', 'fadeOut')
                        $('next').classList.remove('animated', 'fadeIn', 'fadeOut')
                        $('correct').classList.remove('animated', 'tada', 'fadeOut')
                    }

                    //fade out question and answers
                    $('bubble').classList.add('animated', 'bounceOut')
                    $('answer1').classList.add('animated', 'fadeOut')
                    $('answer2').classList.add('animated', 'fadeOut')

                    if (questionNumber === 0) {
                        // append next question button and question explanation on the first question
                        appendTemplate('nextTemplate', 'innerGrid')
                        appendTemplate('explanationTemplate', 'innerGrid')
                    }

                    // set explanation HTML
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

                            // end the quiz if questionNumber is greater than the number of questions, append final HMTL
                            if (questionNumber > questions.length - 1) {
                                appendTemplate('thanksTemplate', 'innerGrid')
                            } else {
                                // set next question if questionNumber is still less than the total number of questions
                                setQuestionData()
                            }
                        })
                } else {
                    // remove existing or previously established entry classes
                    $(e.target.id).classList.remove('animated', 'fadeIn')

                    // shake the answer if the answer is in correct, subtle animation prompts errorless teaching
                    $(e.target.id).classList.add('animated', 'shake')

                    // remove shake animation after shake is complete in case the user tries the same incorrect answer more than once
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

// begin question flow on begin button press
$('begin').addEventListener('click', beginQuestionFlow)