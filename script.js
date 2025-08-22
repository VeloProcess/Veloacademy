const veloAcademyApp = {
    courseDatabase: {},

    // ❗❗❗ IMPORTANTE: COLE A URL DO SEU APP DA WEB AQUI ❗❗❗
    SCRIPT_URL: "https://script.google.com/macros/s/AKfycbzfsAG8tTRtL-q8TC_qo_sO63zsUVm08RWTrur5t80PXHw0c9ArPOAhE34ffhnw9dAI/exec",

    init() {
        this.loadCourses();
        this.renderCourses();
        this.initTheme();
        this.initModalEvents();
    },

    loadCourses() {
        // Agora o front-end só precisa dos dados básicos dos cursos, sem as respostas do quiz.
        this.courseDatabase = {
            'pix': {
                title: 'PIX: Normas e Segurança',
                description: 'Domine os processos, regras de negócio e protocolos de segurança essenciais para transações PIX na VeloAcademy.',
                modules: [{
                    title: 'Módulo 1: Fundamentos do PIX',
                    lessons: [
                        { id: 'pix-1', title: 'O Ecossistema do Pagamento Instantâneo', type: 'video', duration: '12 min', filePath: '#' },
                        { id: 'pix-2', title: 'Regras de Compliance e Bacen', type: 'pdf', duration: 'Leitura de 15 min', filePath: '#' },
                    ]
                }],
            },
            'credito': {
                title: 'Crédito do Trabalhador: Análise e Concessão',
                description: 'Aprenda o fluxo completo de análise e concessão da linha de Crédito do Trabalhador.',
                modules: [{
                    title: 'Módulo 1: Elegibilidade e Documentação',
                    lessons: [
                        { id: 'cr-1', title: 'O que é o crédito do trabalhador (PDF)', type: 'pdf', duration: 'Slides do video', filePath: 'https://raw.githubusercontent.com/VeloProcess/imagens-a-upar/main/Bem-vindos_ao_Treinamento_Cr%C3%A9dito_do_Trabalhador%20(1)%20(7)%20(1)%20(1).pdf' },
                        { id: 'cr-2', title: 'O que é o crédito do trabalhador?', type: 'video', duration: '04:46 min', filePath: 'https://drive.google.com/file/d/1-lXxLJOmH2yuRDGZmwQr_kqonbricgl6iPkLXIOw5uU/preview' }
                    ]
                }],
            },
        };
    },

    renderCourses() {
        const coursesGrid = document.getElementById('courses-grid');
        if (!coursesGrid) return;
        coursesGrid.innerHTML = '';
        let index = 0;
        for (const courseId in this.courseDatabase) {
            const course = this.courseDatabase[courseId];
            const card = document.createElement('div');
            card.className = 'course-card';
            card.style.animationDelay = `${index * 100}ms`;
            card.innerHTML = `<h3>${course.title}</h3><p>${course.description}</p>`;
            card.addEventListener('click', () => this.openCourse(courseId));
            coursesGrid.appendChild(card);
            index++;
        }
    },

    getLessonIcon(type) {
        switch (type) {
            case 'video': return '<i class="fas fa-video"></i>';
            case 'pdf': return '<i class="fas fa-file-pdf"></i>';
            case 'audio': return '<i class="fas fa-headphones-alt"></i>';
            default: return '<i class="fas fa-book"></i>';
        }
    },

    openCourse(courseId) {
        const course = this.courseDatabase[courseId];
        const courseView = document.getElementById('course-view');
        if (!course || !courseView) return;
        
        let modulesHtml = '';
        course.modules.forEach(module => {
            let lessonsHtml = '';
            module.lessons.forEach(lesson => {
                const isDisabled = !lesson.filePath || lesson.filePath === '#';
                const buttonHtml = isDisabled
                    ? `<button class="btn" disabled>Em Breve</button>`
                    : `<a href="${lesson.filePath}" target="_blank" class="btn">Acessar</a>`;
                lessonsHtml += `<li><div class="lesson-info">${this.getLessonIcon(lesson.type)}<div><p>${lesson.title}</p><span>${lesson.duration}</span></div></div>${buttonHtml}</li>`;
            });
            modulesHtml += `<div class="module-card"><h3>${module.title}</h3><ul class="modules-list">${lessonsHtml}</ul></div>`;
        });

        // Com a nova lógica, o botão sempre será para fazer o quiz, simplificando o fluxo.
        const actionButtonHtml = `<button class="btn" onclick="veloAcademyApp.openQuiz('${courseId}')"><i class="fas fa-graduation-cap"></i> Fazer o Quiz Final</button>`;

        courseView.innerHTML = `
            <button class="btn btn-secondary" id="back-to-courses"><i class="fas fa-arrow-left"></i> Voltar para Cursos</button>
            <div class="course-header"><h1>${course.title}</h1><p>${course.description}</p></div>
            ${modulesHtml}
            <div class="quiz-cta">
                <h2>Teste seu Conhecimento</h2>
                <p>Após estudar todos os módulos, faça o quiz final para obter seu certificado.</p>
                ${actionButtonHtml}
            </div>`;
        
        document.getElementById('back-to-courses').addEventListener('click', () => this.switchView('dashboard-view'));
        this.switchView('course-view');
    },

    openQuiz(courseId) {
        const quizView = document.getElementById('quiz-view');
        quizView.innerHTML = `<div class="loading-certificate"><div class="spinner"></div><p>Carregando quiz...</p></div>`;
        this.switchView('quiz-view');
        
        fetch(`${this.SCRIPT_URL}?action=getQuiz&courseId=${courseId}`)
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    const quizData = data;
                    let questionsHtml = '';
                    quizData.questions.forEach((q, index) => {
                        let optionsHtml = '';
                        q.options.forEach((option, optionIndex) => {
                            optionsHtml += `<label class="quiz-option"><input type="radio" name="question_${index}" value="${optionIndex}"><span>${option}</span></label>`;
                        });
                        questionsHtml += `<div class="quiz-question"><p class="question-title">${index + 1}. ${q.question}</p><div class="quiz-options">${optionsHtml}</div></div>`;
                    });
                    quizView.innerHTML = `
                        <h1>Quiz Final: ${this.courseDatabase[courseId].title}</h1>
                        <form id="quiz-form">${questionsHtml}<button type="submit" class="btn">Enviar Respostas e Gerar Certificado</button></form>`;
                    document.getElementById('quiz-form').addEventListener('submit', (e) => {
                        e.preventDefault();
                        this.submitQuiz(courseId);
                    });
                } else {
                    throw new Error("Não foi possível carregar as perguntas do quiz.");
                }
            })
            .catch(error => {
                console.error("Erro ao buscar quiz:", error);
                quizView.innerHTML = `<div class="quiz-result fail"><h2>Erro ao Carregar</h2><p>${error.message}</p></div>`;
            });
    },

    submitQuiz(courseId) {
        const savedName = localStorage.getItem('studentName');
        if (savedName) {
            this._sendAnswersToBackend(courseId, savedName);
        } else {
            const modal = document.getElementById('name-modal');
            if (!modal) return;
            const input = document.getElementById('student-name-input');
            input.value = '';
            modal.classList.remove('hidden');
            input.focus();
            modal.dataset.courseIdForSubmission = courseId;
        }
    },
    
    initModalEvents() {
        const modal = document.getElementById('name-modal');
        if (!modal) return;
        const confirmBtn = document.getElementById('modal-confirm-btn');
        const cancelBtn = document.getElementById('modal-cancel-btn');
        const input = document.getElementById('student-name-input');
        cancelBtn.addEventListener('click', () => modal.classList.add('hidden'));
        const confirmAction = () => {
            const studentName = input.value.trim();
            if (studentName) {
                localStorage.setItem('studentName', studentName);
                modal.classList.add('hidden');
                const courseId = modal.dataset.courseIdForSubmission;
                if(courseId) {
                    this._sendAnswersToBackend(courseId, studentName);
                }
            } else {
                alert("Por favor, insira o nome do(a) colaborador(a).");
            }
        };
        confirmBtn.addEventListener('click', confirmAction);
        input.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') confirmBtn.click();
        });
    },
    
    _sendAnswersToBackend(courseId, studentName) {
        const form = document.getElementById('quiz-form');
        const quizView = document.getElementById('quiz-view');
        if (!form || !quizView) return;

        const userAnswers = [];
        const questionsCount = form.querySelectorAll('.quiz-question').length;
        for (let i = 0; i < questionsCount; i++) {
            const selectedOption = form.querySelector(`input[name="question_${i}"]:checked`);
            userAnswers.push(selectedOption ? parseInt(selectedOption.value) : null);
        }
        
        quizView.innerHTML = `<div class="loading-certificate"><div class="spinner"></div><p>Corrigindo sua prova e gerando certificado...</p></div>`;

        const params = new URLSearchParams({
            action: 'submitQuiz',
            courseId: courseId,
            name: studentName,
            answers: JSON.stringify(userAnswers)
        }).toString();

        const finalUrl = `${this.SCRIPT_URL}?${params}`;
        window.location.href = finalUrl;
    },
    
    switchView(viewId) {
        document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
        setTimeout(() => {
            const viewElement = document.getElementById(viewId);
            if(viewElement) viewElement.classList.add('active');
        }, 50);
    },

    initTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;
        const sunIcon = themeToggle.querySelector('.bx-sun');
        const moonIcon = themeToggle.querySelector('.bx-moon');
        const docElement = document.documentElement;
        const savedTheme = localStorage.getItem('theme') || 'dark';
        docElement.setAttribute('data-theme', savedTheme);

        const updateIcons = (theme) => {
            if (sunIcon && moonIcon) {
                sunIcon.style.display = theme === 'light' ? 'block' : 'none';
                moonIcon.style.display = theme === 'dark' ? 'block' : 'none';
            }
        };
        updateIcons(savedTheme);
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = docElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            docElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateIcons(newTheme);
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    veloAcademyApp.init();
});
