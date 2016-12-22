(function() {
  var questions = [{
    question: "Nationnalement, à quelle place se situe la crypte de Boulogne-sur-Mer ?",
    choices: ["1ere", "2eme", "3eme"],
    correctAnswer: 1
  }, {
    question: "En quelle années fut édifié les Remparts ?",
    choices: ["Entre 1127 et 1131", "Entre 1427 et 1431" , "Entre 1227 et 1231" ],
    correctAnswer: 2
  }, {
    question: "Quelle porte ne fait pas partie des Remparts de la Vieille Ville?",
    choices: ["Porte du Touquet", "Porte des Dunes", "Porte des Degrés"],
    correctAnswer: 0
  }, {
    question: "Combien de Portes comptes les Remparts ?",
    choices: [3, 4, 5],
    correctAnswer: 1
  }, {
    question: "Quelle est la hauteur du dôme de la Basilique Notre-Dame ?",
    choices: ["80m", "93m", "101m"],
    correctAnswer: 2
  }, {
    question: "Par qui fut construit la Basilique Notre-Dame ?",
    choices: ["L'Abbé Benoit-Agathon Haffreingue", "L'Abbé Pierre-Antoine de Mésière", "L'Abbé Jean-Edouard de la piscine"],
    correctAnswer: 0
  }, {
    question: "Parmis ces sculptures et piéces d'orférrerie, laquelle renferme la Crypte ?",
    choices: ["Le linceul de Turin", "La soupière Paul Charvel", "Le Saint Sang"],
    correctAnswer: 2
  }, {
    question: "Avant d'ếtre un Beffroi, qu'été le Beffroi de Boulogne-sur-Mer ?",
    choices: ["Un donjon", "Une tour de guet", "Une chapelle"],
    correctAnswer: 0
  }, {
    question: "Quel est le monument le plus ancien de la ville ?",
    choices: ["Le chateau musée", "La Basilique", "Le Beffroi"],
    correctAnswer: 2
  }, {
    question: "Le chateau de Boulogne est l'un des premiers chateaux a avoir été édifié sans ... ?",
    choices: ["Tour de guet", "Meurtrière", "Donjon"],
    correctAnswer: 2
  }];

  var questionCounter = 0; //Compteur Questions
  var selections = []; //Tableau contient choix user
  var quiz = $('#quiz');

  // Afficher question initial
  displayNext();

  // Click next
  $('#next').on('click', function (e) {
    e.preventDefault();

    // Suspendre click pendant l'animation fondu
    if(quiz.is(':animated')) {
      return false;
    }
    choose();

    // Si aucune réponse choisi
    if (isNaN(selections[questionCounter])) {
      alert('Veuillez choisir une réponse!');
    } else {
      questionCounter++;
      displayNext();
    }
  });

  // Clieck précédent
  $('#prev').on('click', function (e) {
    e.preventDefault();

    // suspendre click pendant l'animation fondu
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

  // Click Recommencer
  $('#start').on('click', function (e) {
    e.preventDefault();

    // suspendre click pendant l'animation fondu
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });

  // Animation hover sur bouton
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });

  // Afficher les questions et les réponses dans les div
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });

    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);

    var question = $('<p>').append(questions[index].question);
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }

  // Créer la liste des réponses
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

  // Lire le choix de l'user
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  // Afficher la question suivante
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();

      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }

        // Afficher le bouton précédent ou pas(pour la 1ere question)
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){

          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }

  // Afficher résusltat
  function displayScore() {
    var score = $('<p>',{id: 'question'});

    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }

    score.append('Vous avez ' + numCorrect + ' questions correctes sur ' +
                 questions.length + ' questions');
    return score;
  }
})();
