const veloAcademyApp = {
    courseDatabase: {},

    init() {
        this.loadCourses();
        this.renderCourses();
        this.initTheme();
        this.initModalEvents();
    },

    loadCourses() {
        this.courseDatabase = {
            'pix': {
                title: 'PIX: Normas e Segurança',
                description: 'Domine os processos, regras de negócio e protocolos de segurança essenciais para transações PIX na VeloAcademy.',
                modules: [
                    {
                        title: 'Módulo 1: Fundamentos do PIX',
                        lessons: [
                            { id: 'pix-1', title: 'O Ecossistema do Pagamento Instantâneo', type: 'video', duration: '12 min', filePath: '#' },
                            { id: 'pix-2', title: 'Regras de Compliance e Bacen', type: 'pdf', duration: 'Leitura de 15 min', filePath: '#' },
                        ]
                    }
                ],
                // =======================================================================
                // QUIZ DO CURSO 'PIX' ATUALIZADO COM AS NOVAS PERGUNTAS
                // =======================================================================
                quiz: {
                    passingScore: 6, // Nota mínima 6 de 10
                    questions: [
                        {
                            question: "Por que a Velotax vincula a chave Pix ao Velobank?",
                            options: [
                                "Para dificultar a portabilidade da chave.",
                                "Para garantir que a restituição seja direcionada corretamente ao parceiro financeiro.",
                                "Para impedir que o cliente use a chave em outro banco."
                            ],
                            answer: 1 // Resposta B
                        },
                        {
                            question: "O que acontece se o cliente solicitar a exclusão da chave Pix sem quitar a antecipação?",
                            options: [
                                "A exclusão ocorre em até 2 dias úteis, mas caracteriza quebra contratual e o valor passa a ser cobrado integralmente.",
                                "A chave é liberada sem custos ou consequências.",
                                "A exclusão é feita automaticamente e sem necessidade de pagamento."
                            ],
                            answer: 0 // Resposta A
                        },
                        {
                            question: "Clientes com antecipação de 2024 que não quitaram e querem retirar a chave devem:",
                            options: [
                                "Sempre esperar até 2025, quando a Receita processará automaticamente.",
                                "Corrigir os dados bancários no e-CAC, cadastrar a chave CPF como Pix e, após receber, repassar o valor para a Velotax.",
                                "Solicitar que a Receita transfira o valor direto para a Velotax."
                            ],
                            answer: 1 // Resposta B
                        },
                        {
                            question: "Qual é o prazo médio que a Receita Federal leva para processar a atualização dos dados no Portal e-CAC?",
                            options: [
                                "De 10 a 15 dias.",
                                "Até 24 horas.",
                                "Cerca de 30 dias."
                            ],
                            answer: 0 // Resposta A
                        },
                        {
                            question: "Se o cliente já recebeu a restituição de 2024 em outra conta e não quitou a antecipação, qual deve ser o procedimento?",
                            options: [
                                "Orientar o cliente a aguardar o próximo lote da Receita.",
                                "Solicitar a liberação da chave Pix e encaminhar o caso para o N2, que enviará o e-mail de cobrança.",
                                "Cancelar automaticamente a antecipação."
                            ],
                            answer: 1 // Resposta B
                        },
                        {
                            question: "O que deve constar obrigatoriamente no cadastro bancário no Portal e-CAC para o cliente receber a restituição corretamente?",
                            options: [
                                "Qualquer chave Pix (celular, e-mail ou aleatória).",
                                "Uma conta corrente vinculada ao nome do cliente.",
                                "A chave Pix obrigatoriamente do tipo CPF."
                            ],
                            answer: 2 // Resposta C
                        }
                    ]
                }
            },
            'credito': {
                title: 'Crédito do Trabalhador: Análise e Concessão',
                description: 'Aprenda o fluxo completo de análise e concessão da linha de Crédito do Trabalhador.',
                modules: [
                    {
                        title: 'Módulo 1: Elegibilidade e Documentação',
                        lessons: [
                            { id: 'cr-1', title: 'O que é o crédito do trabalhador (PDF)', type: 'pdf', duration: 'Slides do video', filePath: 'https://raw.githubusercontent.com/VeloProcess/imagens-a-upar/main/Bem-vindos_ao_Treinamento_Cr%C3%A9dito_do_Trabalhador%20(1)%20(7)%20(1)%20(1).pdf' },
                            { id: 'cr-2', title: 'O que é o crédito do trabalhador?', type: 'video', duration: '04:46 min', filePath: 'https://docs.google.com/presentation/d/1lXxLJOmH2yuRDGZmwQr_kqonbricgl6iPkLXIOw5uU/preview?slide=id.p' }
                        ]
                    }
                ],
                quiz: {
                    passingScore: 6,
                    questions: [
                        { question: "O Crédito Consignado Trabalhador é voltado para:", options: ["Funcionários públicos apenas", "Funcionários CLT de empresas privadas e domésticos, além de diretores com FGTS", "Apenas aposentados e pensionistas", "Qualquer pessoa com conta bancária"], answer: 1 },
                        { question: "Qual é o tempo mínimo de vínculo empregatício exigido pela Velotax para contratar o consignado?", options: ["6 meses", "12 meses", "18 meses", "Não existe tempo mínimo"], answer: 1 },
                        { question: "Segundo a política da Velotax, a margem consignável máxima autorizada é:", options: ["25% do salário líquido", "30% do salário líquido", "35% do salário líquido", "40% do salário líquido"], answer: 0 },
                        { question: "Qual é o prazo de carência para início do pagamento das parcelas?", options: ["15 a 30 dias", "30 a 45 dias", "60 a 92 dias", "Não existe carência"], answer: 2 },
                        { question: "Após a assinatura eletrônica do contrato, qual o próximo passo para que o desconto em folha seja efetivado?", options: ["Liberação imediata do crédito", "Análise manual pela Velotax", "Averbação do contrato junto ao Governo/MTE", "Aprovação pela Caixa Econômica Federal"], answer: 0 },
                        { question: "O que acontece se o cliente solicitar o cancelamento dentro do prazo legal de 7 dias?", options: ["O contrato é cancelado sem necessidade de devolução", "O cliente deve devolver o valor integral do crédito à Velotax", "O contrato é desconsiderado automaticamente", "A empresa do cliente assume a dívida"], answer: 2 },
                        { question: "Em caso de empresas com menos de 24 meses de registro, o colaborador pode contratar?", options: ["Sim, sem restrições", "Sim, desde que seja CLT", "Não, a empresa deve ter no mínimo 24 meses", "Apenas se a margem for inferior a 25%"], answer: 3 }
                    ]
                }
            },
        };
    },

    renderCourses() {
        const coursesGrid = document.getElementById('courses-grid');
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
        let modulesHtml = '';

        course.modules.forEach(module => {
            let lessonsHtml = '';
            module.lessons.forEach(lesson => {
                const isDisabled = !lesson.filePath || lesson.filePath === '#';
                const buttonHtml = isDisabled
                    ? `<button class="btn" disabled>Em Breve</button>`
                    : `<a href="${lesson.filePath}" target="_blank" class="btn">Acessar</a>`;
                lessonsHtml += `
                    <li>
                        <div class="lesson-info">
                            ${this.getLessonIcon(lesson.type)}
                            <div>
                                <p>${lesson.title}</p>
                                <span>${lesson.duration}</span>
                            </div>
                        </div>
                        ${buttonHtml}
                    </li>`;
            });
            modulesHtml += `
                <div class="module-card">
                    <h3>${module.title}</h3>
                    <ul class="modules-list">${lessonsHtml}</ul>
                </div>`;
        });

        const courseStatus = localStorage.getItem(`course_${courseId}_status`);
        let actionButtonHtml = '';
        if (courseStatus === 'passed') {
            actionButtonHtml = `<button class="btn btn-success" onclick="veloAcademyApp.showCertificate('${courseId}')"><i class="fas fa-certificate"></i> Ver Certificado</button>`;
        } else {
            actionButtonHtml = `<button class="btn" onclick="veloAcademyApp.openQuiz('${courseId}')"><i class="fas fa-graduation-cap"></i> Fazer o Quiz Final</button>`;
        }

        courseView.innerHTML = `
            <button class="btn btn-secondary" id="back-to-courses">
                <i class="fas fa-arrow-left"></i> Voltar para Cursos
            </button>
            <div class="course-header">
                <h1>${course.title}</h1>
                <p>${course.description}</p>
            </div>
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
        const quizData = this.courseDatabase[courseId].quiz;
        const quizView = document.getElementById('quiz-view');
        let questionsHtml = '';

        quizData.questions.forEach((q, index) => {
            let optionsHtml = '';
            q.options.forEach((option, optionIndex) => {
                optionsHtml += `
                    <label class="quiz-option">
                        <input type="radio" name="question_${index}" value="${optionIndex}">
                        <span>${option}</span>
                    </label>`;
            });
            questionsHtml += `
                <div class="quiz-question">
                    <p class="question-title">${index + 1}. ${q.question}</p>
                    <div class="quiz-options">${optionsHtml}</div>
                </div>`;
        });

        quizView.innerHTML = `
            <h1>Quiz Final: ${this.courseDatabase[courseId].title}</h1>
            <form id="quiz-form">
                ${questionsHtml}
                <button type="submit" class="btn">Finalizar e Ver Nota</button>
            </form>`;

        this.switchView('quiz-view');
        document.getElementById('quiz-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitQuiz(courseId);
        });
    },

    submitQuiz(courseId) {
        const quizData = this.courseDatabase[courseId].quiz;
        const form = document.getElementById('quiz-form');
        let score = 0;

        quizData.questions.forEach((q, index) => {
            const selectedOption = form.querySelector(`input[name="question_${index}"]:checked`);
            if (selectedOption && parseInt(selectedOption.value) === q.answer) {
                score++;
            }
        });

        const totalQuestions = quizData.questions.length;
        const finalGrade = (score / totalQuestions) * 10;
        const passingScore = quizData.passingScore;

        let resultHtml = '';
        if (finalGrade >= passingScore) {
            localStorage.setItem(`course_${courseId}_status`, 'passed');
            resultHtml = `
                <div class="quiz-result pass">
                    <i class="fas fa-check-circle"></i>
                    <h2>Parabéns! Você foi aprovado!</h2>
                    <p>Sua nota foi: <strong>${finalGrade.toFixed(1)} / 10.0</strong></p>
                    <button class="btn btn-success" onclick="veloAcademyApp.showCertificate('${courseId}')"><i class="fas fa-certificate"></i> Gerar Certificado</button>
                </div>`;
        } else {
            localStorage.removeItem(`course_${courseId}_status`);
            resultHtml = `
                <div class="quiz-result fail">
                    <i class="fas fa-times-circle"></i>
                    <h2>Não foi desta vez.</h2>
                    <p>Sua nota foi: <strong>${finalGrade.toFixed(1)} / 10.0</strong>. A nota mínima é ${passingScore.toFixed(1)}.</p>
                    <p>Estude os módulos novamente e tente outra vez!</p>
                    <button class="btn btn-secondary" onclick="veloAcademyApp.openCourse('${courseId}')"><i class="fas fa-book-open"></i> Voltar ao Curso</button>
                </div>`;
        }
        document.getElementById('quiz-view').innerHTML = resultHtml;
    },

    showCertificate(courseId) {
        const savedName = localStorage.getItem('studentName');
        if (savedName) {
            this._generateCertificate(courseId, savedName);
        } else {
            const modal = document.getElementById('name-modal');
            const input = document.getElementById('student-name-input');
            input.value = '';
            modal.classList.remove('hidden');
            input.focus();
            modal.dataset.courseId = courseId;
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
                this._generateCertificate(modal.dataset.courseId, studentName);
            } else {
                alert("Por favor, insira seu nome.");
            }
        };

        confirmBtn.addEventListener('click', confirmAction);
        input.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') confirmBtn.click();
        });
    },

    _generateCertificate(courseId, studentName) {
        const certificateView = document.getElementById('certificate-view');
        const courseTitle = this.courseDatabase[courseId].title;
        const completionDate = new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });

        certificateView.innerHTML = `
            <div class="certificate-controls">
                <button class="btn btn-secondary" onclick="veloAcademyApp.openCourse('${courseId}')"><i class="fas fa-arrow-left"></i> Voltar</button>
                <button class="btn" onclick="window.print()"><i class="fas fa-print"></i> Imprimir / Salvar PDF</button>
            </div>
            <div class="certificate-wrapper">
                <div class="certificate-header">
                    <img src="https://github.com/VeloProcess/imagens-a-upar/blob/main/2-removebg-preview%20(1).png?raw=true" alt="Logo VeloAcademy" class="certificate-logo">
                    <span class="academy-name">VeloAcademy</span>
                </div>
                <div class="certificate-body">
                    <h1 class="cert-title">Certificado de Conclusão</h1>
                    <p class="certify-text">Certificamos que</p>
                    <p class="student-name">${studentName}</p>
                    <p class="certify-text">concluiu com sucesso o curso de</p>
                    <p class="course-title">${courseTitle}</p>
                </div>
                    <div class="date-area">
                        <p class="date-text">Concluído em: ${completionDate}</p>
                    </div>
                    <div class="seal-area">
                        <div class="certificate-seal">
                            <span>VA</span>
                        </div>
                    </div>
                </div>
            </div>`;
        this.switchView('certificate-view');
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

        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = docElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                docElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                updateIcons(newTheme);
            });
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    veloAcademyApp.init();
});
