document.addEventListener('DOMContentLoaded', function () {
    let currentQuestionIndex = 0;
    const questions = [
        { question: '¿Cómo te sientes en la mayoría de las situaciones sociales?', options: ['A) Inquieto o tenso', 'B) Triste o sin interés', 'C) Irritado o abrumado', 'D) Desorientado o distraído'] },
        { question: '¿Cómo describes tu nivel de energía durante el día?', options: ['A) Alta, pero me siento agitado', 'B) Baja y apática', 'C) Variable, a menudo cansado', 'D) Baja, con dificultad para enfocarme'] },
        { question: '¿Con qué frecuencia te sientes abrumado por las tareas cotidianas?', options: ['A) Muy a menudo, me preocupo mucho', 'B) Casi nunca, pero no tengo motivación', 'C) Frecuentemente, siento que no puedo con todo', 'D) Me cuesta enfocarme en las tareas'] },
        { question: '¿Cómo sueles dormir por la noche?', options: ['A) Me cuesta conciliar el sueño', 'B) Duermo demasiado o muy poco sin razón', 'C) Me despierto a menudo preocupado', 'D) Duermo, pero me despierto sin descanso'] },
        { question: '¿Qué haces cuando tienes tiempo libre?', options: ['A) Me cuesta relajarme y siempre tengo algo en mente.', 'B) Prefiero no hacer nada y estar solo.', 'C) Me siento culpable por no estar trabajando o haciendo algo productivo.', 'D) Intento empezar algo, pero me cuesta enfocarme.'] },
        { question: '¿Cómo te sientes después de un día agotador?', options: ['A) Mi mente sigue trabajando y no logro desconectar.', 'B) Me siento vacío o sin propósito.', 'C) Siento que el día no me alcanzó para todo lo que tenía que hacer.', 'D) Estoy agotado y tengo dificultades para concentrarme en lo que me queda por hacer.'] },
        { question: '¿Qué tan fácil te resulta terminar una tarea que empezaste?', options: ['A) Me distraigo pensando en otras cosas que podrían salir mal.', 'B) Pierdo interés y no veo el sentido de continuar.', 'C) Me siento abrumado por el tiempo o la presión.', 'D) Me cuesta concentrarme y termino procrastinando.'] },
        { question: '¿Cómo te sientes al iniciar tu día?', options: ['A) Sientes que la mente no deja de preocuparse por lo que vendrá.', 'B) Te cuesta encontrar motivación para levantarte.', 'C) Piensas en todo lo que tienes que hacer y te sientes abrumado.', 'D) Te resulta difícil enfocarte en tus tareas desde el principio.'] },
        { question: '¿Cuándo te enfrentas a una nueva tarea, cuál es tu reacción más común?', options: ['A) Te invaden dudas y preocupaciones sobre cómo resultará.', 'B) No sientes interés o energía para empezar.', 'C) Sientes que es una carga adicional que aumenta tu tensión.', 'D) Te cuesta concentrarte en cómo abordarla.'] },
        { question: '¿Cómo es tu sueño?', options: ['A) Te cuesta conciliar el sueño por pensar en varias cosas a la vez.', 'B) Duermes mucho o poco, pero nunca te sientes descansado.', 'C) Te despiertas a menudo pensando en las tareas pendientes.', 'D) Tu mente sigue divagando, lo que te impide descansar bien.'] },
        { question: '¿Qué sientes al interactuar con otras personas?', options: ['A) A menudo te sientes tenso o preocupado por lo que puedan pensar.', 'B) Prefieres evitar las interacciones porque no encuentras interés en ellas.', 'C) Las conversaciones te hacen sentir que estás perdiendo tiempo valioso.', 'D) Te resulta difícil seguir una conversación sin distraerte.'] },
        { question: '¿Cómo es tu concentración cuando trabajas en una tarea importante?', options: ['A) Te distraes pensando en posibles problemas o errores.', 'B) Te cuesta encontrar la energía para continuar.', 'C) Te sientes presionado y eso afecta tu rendimiento.', 'D) Te resulta difícil mantener la atención en lo que estás haciendo.'] },
        { question: '¿Cómo manejas los cambios inesperados en tu rutina?', options: ['A) Te generan ansiedad porque prefieres tener todo bajo control.', 'B) No te afectan mucho porque sientes que nada tiene importancia.', 'C) Te generan estrés porque complican tu planificación.', 'D) Te cuesta adaptarte porque te sientes desorientado.'] },
        { question: '¿Qué sueles hacer en tu tiempo libre?', options: ['A) Te cuesta relajarte porque siempre tienes algo en mente.', 'B) Prefieres descansar, pero rara vez sientes que lo disfrutas.', 'C) Te sientes culpable por no estar haciendo algo productivo.', 'D) Intentas relajarte, pero no puedes concentrarte en una sola actividad.'] },
        { question: '¿Cómo te sientes al final de un día agotador?', options: ['A) Te cuesta desconectar y sigues pensando en lo que tienes que hacer.', 'B) Te sientes vacío o sin propósito.', 'C) Sientes que no has hecho lo suficiente y eso te frustra.', 'D) Estás tan cansado que no puedes concentrarte en nada más.'] }
    ];

    function loadQuestion(index) {
        const questionBox = document.getElementById('questionBox');
        const questionData = questions[index];
        let questionHTML = `
            <div class="mb-3">
                <p><strong>${questionData.question}</strong></p>
                ${questionData.options.map((option, i) => `
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="q${index}" id="q${index}a${i}" value="${String.fromCharCode(65+i)}">
                        <label class="form-check-label" for="q${index}a${i}">
                            ${option}
                        </label>
                    </div>
                `).join('')}
            </div>
        `;
        questionBox.innerHTML = questionHTML;
        validateQuestion(); // Validar la pregunta al cargar
    }

    function validateQuestion() {
        const isOptionSelected = document.querySelector('input[name="q' + currentQuestionIndex + '"]:checked');
        document.getElementById('nextQuestion').disabled = !isOptionSelected;
    }

    function showNextQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion(currentQuestionIndex);
            if (currentQuestionIndex === questions.length - 1) {
                document.getElementById('nextQuestion').style.display = 'none';
                document.getElementById('finishTest').style.display = 'inline-block';
            }
        }
    }

    function calculateResults() {
        const totalAnswers = { A: 0, B: 0, C: 0, D: 0 };
        document.querySelectorAll('input[type="radio"]:checked').forEach(input => {
            const answer = input.value;
            totalAnswers[answer]++;
        });

        const maxAnswer = Object.keys(totalAnswers).reduce((a, b) => totalAnswers[a] > totalAnswers[b] ? a : b, 'A');

        const resultText = {
            A: "Programa 1",
            B: "Programa 2",
            C: "Programa 3",
            D: "Programa 4"
        }[maxAnswer];

        document.getElementById('resultText').innerHTML = `En base a sus respuestas hemos determinado que el programa más adecuado para ti es el <strong>${resultText}</strong>, pero sin dudas lo invitamos a probar diferentes programas si es de su interés. Para más información leer el manual que vino junto a su lámpara. Muchas gracias, ¡que lo disfrute!`;
    }

    document.getElementById('startTest').addEventListener('click', function () {
        if (document.getElementById('readIntro').checked) {
            document.querySelector('.intro').style.display = 'none';
            document.querySelector('.questions').style.display = 'block';
            loadQuestion(currentQuestionIndex);
        } else {
            alert('Debes leer la introducción antes de comenzar el test.');
        }
    });

    document.getElementById('nextQuestion').addEventListener('click', function () {
        showNextQuestion();
    });

    document.getElementById('finishTest').addEventListener('click', function () {
        document.querySelector('.questions').style.display = 'none';
        document.querySelector('.result').style.display = 'block';
        calculateResults();
    });

    // Validate question and enable/disable the button
    document.addEventListener('change', function (e) {
        if (e.target.type === 'radio' && e.target.name.startsWith('q')) {
            validateQuestion();
        }
    });

    // Initialize
    loadQuestion(currentQuestionIndex);
});
