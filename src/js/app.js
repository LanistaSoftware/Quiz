// Aren Atlas İçin! //
const StorageController = (function () {

    return {

        storeQuestion: function (question) {
            let questions;
            if (localStorage.getItem('questions') === null) {
                questions = [];
                questions.push(question);
            } else {
                questions = JSON.parse(localStorage.getItem('questions'));
                questions.push(question);
            }
            localStorage.setItem('questions', JSON.stringify(questions));
        },
        getQuestions: function () {
            let questions;
            if (localStorage.getItem('questions') === null) {
                questions = [];
            } else {
                questions = JSON.parse(localStorage.getItem('questions'));
            }
            return questions;
        },
        deleteQuestion: function (id) {
            let questions = JSON.parse(localStorage.getItem('questions'));
            questions.forEach((q, index) => {
                if (q.id == id) {
                    questions.splice(index, 1)
                }
            });
            localStorage.setItem('questions', JSON.stringify(questions));
        },
        updateQuestion: function (question) {
            let questions = JSON.parse(localStorage.getItem('questions'));

            questions.forEach((q, index) => {
                if (question.id == q.id) {
                    questions.splice(index, 1, question);
                }
            });
            localStorage.setItem('questions', JSON.stringify(questions));
        }
    }
})();

const QuestionController = (function () {

    class Question {
        constructor(id, question, choices, answer) {
            this.id = id;
            this.question = question;
            this.choices = choices;
            this.answer = answer;
        }
    }

    const data = {
        questions: StorageController.getQuestions(),
        selectedQuestion: null,
        selectedChoice: null,
        correctAnswer: null,
        selectedID: null
    }

    return {
        getQuestions: function () {
            return data.questions;
        },
        getData: function () {
            return data;
        },
        getQuestionByID: function (id) {
            let question = null;
            data.questions.forEach(function (q) {
                if (q.id == id) {
                    question = q;
                }
            });

            return question;
        },
        setCurrentQuestion: function (question) {
            data.selectedQuestion = question;
        },
        getCurrentQuestion: function () {
            return data.selectedQuestion;
        },
        addQuestion: function (question, choices, answer) {
            let id;
            if (data.questions.length > 0) {
                id = data.questions[data.questions.length - 1].id + 1;
            } else {
                id = 0;
            }
            const newQuestion = new Question(id, question, choices, answer);
            data.questions.push(newQuestion);
            data.selectedChoice = null;
            return newQuestion;
        },
        updateQuestion: function (id, question, choices, answer) {
            let quest = null;
            data.questions.forEach((q) => {
                if (q.id == id) {
                    q.question = question;
                    q.choices = choices;
                    q.answer = answer;
                    quest = q;
                }
            });

            return quest;
        },
        setCorrectAnswer(answer) {
            if (answer) {
                data.correctAnswer = answer
            }
        },
        getCorrectAnswer() {
            return data.correctAnswer;
        },
        deletCorrectAnswer() {
            data.correctAnswer = null;
        },
        setSelectedId(id) {
            data.selectedID = id;
        },
        getSelectedId() {
            return data.selectedID;
        },
        deleteQuestions: function (question) {
            data.questions.forEach((q, index) => {
                if (q.id == question.id) {
                    data.questions.splice(index, 1);
                }
            });

        }
    }
})();

const UIController = (function () {
    const Selectors = {

        listTable: document.querySelector('#qtable'),
        questionInput: document.querySelector('#qtextinput'),
        choiceInputA: document.querySelector('#choicea'),
        choiceInputB: document.querySelector('#choiceb'),
        choiceInputC: document.querySelector('#choicec'),
        choiceInputD: document.querySelector('#choiced'),
        answerRadio: document.querySelector('.answertr'),
        addButton: document.querySelector('#eklebtn'),
        cancelButton: document.querySelector('#cancelbtn'),
        deleteButton: document.querySelector('#deletebtn'),
        updateButton: document.querySelector('#updatebtn'),
        editingBtnSet: document.querySelector('.editing'),
        radioButtons: document.querySelectorAll('.radio'),
        tableHead: document.querySelector('.tablehead'),
        alertWindow: document.querySelector('#alert'),
        alertMessage: document.querySelector('#message'),
        startBtn: document.querySelector('#start'),
        questionListBtn: document.querySelector('#questionlist'),
        addQuestionsBtn: document.querySelector('#addquestion'),
        quiz: document.getElementById('quizz'),
        qtext: document.getElementById('qtext'),
        qnumber: document.getElementById('qnumber'),
        choicebox: document.getElementById('choicebox'),
        choiceTexts: document.querySelectorAll('.ctext')



    }
    const SelectUiItem = {
        listitem: null
    }

    return {
        createQuestionList: function (questions) {
            let html = ''

            questions.forEach(prd => {
                html += `                <tr class="listitem">
                <td data-label="Soru No">${prd.id+1}</td>
                    <td data-label="Soru">${prd.question}</td>
                    <td data-label="A">${prd.choices[0]}</td>
                    <td data-label="A">${prd.choices[1]}</td>
                    <td data-label="A">${prd.choices[2]}</td>
                    <td data-label="A">${prd.choices[3]}</td>
                  </tr>`


            });

            Selectors.listTable.innerHTML = html;

        },
        getSelectors: function () {
            return Selectors;
        },
        addQuestion: function (question) {
            var html = `                <tr class="listitem">
            <td data-label="Soru No">${question.id+1}</td>
                <td data-label="Soru">${question.question}</td>
                <td data-label="A">${question.choices[0]}</td>
                <td data-label="A">${question.choices[1]}</td>
                <td data-label="A">${question.choices[2]}</td>
                <td data-label="A">${question.choices[3]}</td>
              </tr>`
            Selectors.listTable.innerHTML += html;
        },
        setSelectListItem: function (item) {
            SelectUiItem.listitem = item;
        },
        getSelectListItem: function () {
            return SelectUiItem.listitem;
        },
        //Düzeltilecek.
        updateQuestion: function (question) {
            let updatedItem = question;
            SelectUiItem.listitem.childNodes[1].textContent = question.id + 1;
            SelectUiItem.listitem.childNodes[3].textContent = question.question;
            SelectUiItem.listitem.childNodes[5].textContent = question.choices[0];
            SelectUiItem.listitem.childNodes[7].textContent = question.choices[1];
            SelectUiItem.listitem.childNodes[9].textContent = question.choices[2];
            SelectUiItem.listitem.childNodes[11].textContent = question.choices[3];
            return updatedItem;
        },
        deleteQuestion: function () {
            let items = SelectUiItem.listitem;
            items.remove();
        },
        clearInputs: function () {
            Selectors.questionInput.value = '';
            Selectors.choiceInputA.value = '';
            Selectors.choiceInputB.value = '';
            Selectors.choiceInputC.value = '';
            Selectors.choiceInputD.value = '';
            Selectors.radioButtons.forEach((btn) => {
                btn.checked = false;
            })

        },
        //Düzenleme denenebilir.
        addQuestionToForm: function (answer) {

            Selectors.questionInput.value = SelectUiItem.listitem.childNodes[3].textContent;
            Selectors.choiceInputA.value = SelectUiItem.listitem.childNodes[5].textContent;
            Selectors.choiceInputB.value = SelectUiItem.listitem.childNodes[7].textContent;
            Selectors.choiceInputC.value = SelectUiItem.listitem.childNodes[9].textContent;
            Selectors.choiceInputD.value = SelectUiItem.listitem.childNodes[11].textContent;
            if (answer == 'a') {
                Selectors.radioButtons[0].checked = true;
            } else if (answer == 'b') {
                Selectors.radioButtons[1].checked = true;
            } else if (answer == 'c') {
                Selectors.radioButtons[2].checked = true;
            } else {
                Selectors.radioButtons[3].checked = true;
            }
        },
        addingState: function () {

            SelectUiItem.listitem.classList.add('red')
            Selectors.editingBtnSet.style.display = 'block';
            Selectors.addButton.style.display = 'none';
        },
        editCancelState: function () {
            let listItems = Selectors.listTable.children;
            for (let i = 0; i < listItems.length; i++) {
                if (listItems[i].classList.contains('red')) {
                    listItems[i].classList.remove('red');
                }
            }
            Selectors.editingBtnSet.style.display = 'none';
            Selectors.addButton.style.display = 'inline';
        },
        showTableHead: function () {
            let elements = QuestionController.getData().questions;

            if (elements.length == 0) {
                Selectors.tableHead.classList.add('hide');
            } else {
                Selectors.tableHead.classList.remove('hide')
            }
        },
        showAlert(message, className) {
            const alert = Selectors.alertWindow;
            const messageBox = Selectors.alertMessage;
            alert.className = '';


            if (className === 'warning') {
                alert.classList.add('warning')
                alert.classList.remove('hide');
                messageBox.innerHTML = message + `<i class="fas fa-exclamation-triangle"></i>`;
            } else if (className === 'success') {

                alert.classList.add('success')
                alert.classList.remove('hide');
                messageBox.innerHTML = message + `<i class="fas fa-check-double"></i>`;
            } else {
                alert.classList.add('danger')
                alert.classList.remove('hide');
                messageBox.innerHTML = message + `<i class="fas fa-exclamation"></i>`;
            }
            setTimeout(() => {
                alert.className = ('hide');
            }, 3000);

        },
        startTestState() {
            Selectors.startBtn.classList.add('hide');
            Selectors.addQuestionsBtn.classList.add('hide');
            Selectors.questionListBtn.classList.add('hide');
            Selectors.quiz.classList.remove('hide');

        },
        cancelTestState() {
            Selectors.addQuestionsBtn.classList.remove('hide');
            Selectors.questionListBtn.classList.remove('hide');

        },
        showTest(question) {

            Selectors.qnumber.textContent = question.id + 1;
            Selectors.qtext.textContent = question.question;
            Selectors.choiceTexts[0].textContent = question.choices[0];
            Selectors.choiceTexts[1].textContent = question.choices[1];
            Selectors.choiceTexts[2].textContent = question.choices[2];
            Selectors.choiceTexts[3].textContent = question.choices[3];

        }
    }


})();
const TestController = (function () {
    const testData = {
        testCounter: null,
        rightAnswer: 0,
        wrongAnswer: 0,
        userChoiceList: []
    }



    return {
        setTestCounter(questionid) {
            testData.testCounter = questionid;
        },
        getTestCounter() {
            return testData.testCounter;
        },
        resetTestCounter() {
            testData.testCounter = null;
        },
        addChoiceToList(choice) {
            testData.userChoiceList.push(choice);
           return console.log(testData.userChoiceList);
        },
        testResult(questions){
            let questionsAnswers =[];
            questions.forEach((item,index)=>{
                if(item.answer===testData.userChoiceList[index]){
                    testData.rightAnswer++
                }else {
                     testData.wrongAnswer++
                }
                  
            });
           
        }
    }

})();
const AppController = (function (QuestionCtrl, UICtrl, StorageCtrl, TestCtrl) {
    const UISelectors = UIController.getSelectors();
    //Load Event Handled
    const loadEventListeners = function () {

        UISelectors.answerRadio.addEventListener('click', setCorrectAnswerRadio);
        UISelectors.addButton.addEventListener('click', addQuestionSubmit);
        UISelectors.listTable.addEventListener('click', questionEditClick);
        UISelectors.cancelButton.addEventListener('click', questionEditCancelSubmit);
        UISelectors.updateButton.addEventListener('click', updateQuestionSubmit);
        UISelectors.deleteButton.addEventListener('click', deleteQuestionSubmit);
        UISelectors.startBtn.addEventListener('click', startTestSubmit);
        UISelectors.choicebox.addEventListener('click', answerTestSubmit);
    }
    const setCorrectAnswerRadio = function (e) {
        let answer = null;
        if (e.target.value == 'a' || e.target.value == 'b' || e.target.value == 'c' || e.target.value == 'd') {
            answer = e.target.value;
            QuestionCtrl.setCorrectAnswer(answer);
        }
        //e.preventDefault();
    }
    const addQuestionSubmit = function (e) {
        let answers = [];
        const qtext = UISelectors.questionInput.value;
        const choicea = UISelectors.choiceInputA.value;
        const choiceb = UISelectors.choiceInputB.value;
        const choicec = UISelectors.choiceInputC.value;
        const choiced = UISelectors.choiceInputD.value;
        const answer = QuestionController.getCorrectAnswer();

        if (qtext === null || qtext == '' || choicea === null || choicea == '' || choiceb === null || choiceb == '' || choicec === null || choicec == '' || choiced === null || choiced == '' || answer === null || answer == undefined) {
            UICtrl.showAlert('Lütfen formu kontrol ediniz. Tüm bölümleri eksiksiz doldurunuz.', 'danger');
        } else {
            answers.push(choicea, choiceb, choicec, choiced);

            const newQuestion = QuestionCtrl.addQuestion(qtext, answers, answer);

            UICtrl.addQuestion(newQuestion);
            StorageCtrl.storeQuestion(newQuestion);
            UICtrl.showTableHead();
            UICtrl.clearInputs();
            QuestionCtrl.deletCorrectAnswer();
            UICtrl.showAlert('Sorunuz sisteme başarıyla kaydedildi. Soru listesinden inceleyebilirsiniz.', 'success');

        }
        e.preventDefault();
    }
    const questionEditClick = function (e) {
        UICtrl.showAlert('Sorunuz forma yüklendi gerekli düzenlemeleri yapabilirsiniz.', 'danger');
        UICtrl.showTableHead();
        UICtrl.clearInputs();
        QuestionCtrl.deletCorrectAnswer();
        UICtrl.editCancelState();

        if (e.target.parentElement.classList.contains('listitem')) {

            let listitem = e.target.parentNode;

            UICtrl.setSelectListItem(listitem)
            UICtrl.addingState();
            const id = parseInt(listitem.childNodes[1].textContent) - 1;
            const question = QuestionCtrl.getQuestionByID(id)
            QuestionCtrl.setCurrentQuestion(question);
            QuestionCtrl.setSelectedId(id);
            UICtrl.addQuestionToForm(question.answer);
        }
        e.preventDefault();
    }
    const questionEditCancelSubmit = function (e) {
        UICtrl.showAlert('Form temizlendi işlem iptal edildi.', 'danger');
        UICtrl.showTableHead();
        UICtrl.clearInputs();
        UICtrl.editCancelState();
        QuestionCtrl.deletCorrectAnswer();

        e.preventDefault();
    }
    const updateQuestionSubmit = function (e) {
        let answers = [];
        const qtext = UISelectors.questionInput.value;
        const choicea = UISelectors.choiceInputA.value;
        const choiceb = UISelectors.choiceInputB.value;
        const choicec = UISelectors.choiceInputC.value;
        const choiced = UISelectors.choiceInputD.value;
        const answer = QuestionController.getCorrectAnswer();

        if (qtext === null || qtext == '' || choicea === null || choicea == '' || choiceb === null || choiceb == '' || choicec === null || choicec == '' || choiced === null || choiced == '' || answer === null || answer == undefined) {
            UICtrl.showAlert('Lütfen formu kontrol ediniz. Tüm bölümleri eksiksiz doldurunuz.', 'danger')
        } else {

            answers.push(choicea, choiceb, choicec, choiced);
            let id = QuestionCtrl.getSelectedId();
            const updatedQuestion = QuestionCtrl.updateQuestion(id, qtext, answers, answer);

            UICtrl.updateQuestion(updatedQuestion);
            StorageCtrl.updateQuestion(updatedQuestion);
            UICtrl.editCancelState();
            UICtrl.showTableHead();
            UICtrl.clearInputs();
            QuestionCtrl.deletCorrectAnswer();
            UICtrl.showAlert('Sorunuz sisteme başarıyla kaydedildi. Soru listesinden inceleyebilirsiniz.', 'success');

        }
        e.preventDefault();

    }
    const deleteQuestionSubmit = function (e) {

        const selectedQuestion = QuestionCtrl.getCurrentQuestion();
        QuestionCtrl.deleteQuestions(selectedQuestion);
        UICtrl.deleteQuestion();
        StorageCtrl.deleteQuestion(selectedQuestion.id);
        UICtrl.editCancelState();
        UICtrl.clearInputs();
        QuestionCtrl.deletCorrectAnswer();
        UICtrl.showAlert('Soru sistemden silindi.', 'warning')
        e.preventDefault()
    }
    const startTestSubmit = function (e) {

        const questions = QuestionCtrl.getQuestions();
        if (questions.length === 0) {
            UICtrl.showAlert('Soru listesi boş testi başlatmak için önce soru ekleyiniz', 'warning');
        } else {
            UICtrl.showAlert('Testiniz başladı test bitene kadar başka ekrana geçiş yapamazsınız.', 'danger');
            UICtrl.showTest(questions[0]);
            UICtrl.startTestState();
            TestCtrl.setTestCounter(0);
            //TestCtrl.startTest();
        }
        e.preventDefault();
    }
    const answerTestSubmit = function (e) {
        const questions = QuestionCtrl.getQuestions();
        const button = e.target.parentElement;
        let questionIndex = TestCtrl.getTestCounter();

        if (button.classList.contains('choice')) {
            //Düzeltilebilinir.
            TestCtrl.addChoiceToList(button.id.toLowerCase())

            if (questionIndex == questions.length - 1) {
                UICtrl.cancelTestState();
                UICtrl.showAlert('Testi başarıyla tamamladınız. Tebrikler', 'success')
                TestCtrl.testResult(questions);

            } else {
                
                TestCtrl.setTestCounter(questionIndex + 1);
                UICtrl.showTest(questions[questionIndex + 1]);
                UICtrl.startTestState();
            }

           


        }
    }



    return {

        init: function () {

            const questions = QuestionCtrl.getQuestions();


            UICtrl.createQuestionList(questions);
            UICtrl.showTableHead();
            loadEventListeners();
        }
    }

})(QuestionController, UIController, StorageController, TestController);

AppController.init();