const veloAcademyApp = {
    courseDatabase: {},

    init() {
        // O código do preloader foi removido daqui para garantir a compatibilidade
        // com o HTML que você está usando atualmente.
        this.loadCourses();
        this.renderCourses();
        this.initTheme();
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
                            // Adicione seus links reais aqui
                            { id: 'pix-1', title: 'O Ecossistema do Pagamento Instantâneo', type: 'video', duration: '12 min', filePath: '#' },
                            { id: 'pix-2', title: 'Regras de Compliance e Bacen', type: 'pdf', duration: 'Leitura de 15 min', filePath: '#' },
                            { id: 'pix-3', title: 'Principais Chaves e Utilizações', type: 'audio', duration: '10 min', filePath: '#' },
                        ]
                    },
                    {
                        title: 'Módulo 2: Segurança e Prevenção a Fraudes',
                        lessons: [
                            { id: 'pix-4', title: 'Identificando Transações Suspeitas', type: 'video', duration: '18 min', filePath: '#' },
                            { id: 'pix-5', title: 'MED: Mecanismo Especial de Devolução', type: 'pdf', duration: 'Leitura de 20 min', filePath: '#' },
                        ]
                    }
                ]
            },
            'credito': {
                title: 'Crédito do Trabalhador: Análise e Concessão',
                description: 'Aprenda o fluxo completo de análise e concessão da linha de Crédito do Trabalhador, minimizando riscos e maximizando a satisfação do cliente.',
                modules: [
                    {
                        title: 'Módulo 1: Elegibilidade e Documentação',
                        lessons: [
                            // Corrigi as lições duplicadas e adicionei os filePaths
                            { id: 'cr-1', title: 'O que é o crédito do trabalhador(PDF)', type: 'pdf', duration: 'Slides do video', filePath: 'https://raw.githubusercontent.com/VeloProcess/imagens-a-upar/main/Bem-vindos_ao_Treinamento_Cr%C3%A9dito_do_Trabalhador%20(1)%20(7)%20(1).pdf' },
                            { id: 'cr-2', title: 'O que é o crédito do trabalhador?', type: 'video', duration: '04:46 min', filePath: 'https://docs.google.com/videos/d/1-lXxLJOmH2yuRDGZmwQr_kqonbricgl6iPkLXIOw5uU/edit?usp=sharing' }
                        ]
                    },
                ]
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
            card.innerHTML = `
                <h3>${course.title}</h3>
                <p>${course.description}</p>
            `;
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
                // Se um link não for fornecido (filePath: '#'), o botão ficará desabilitado.
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
                    </li>
                `;
            });

            modulesHtml += `
                <div class="module-card">
                    <h3>${module.title}</h3>
                    <ul class="modules-list">${lessonsHtml}</ul>
                </div>
            `;
        });

        courseView.innerHTML = `
            <button class="btn btn-secondary" id="back-to-courses">
                <i class="fas fa-arrow-left"></i> Voltar para Cursos
            </button>
            <div class="course-header">
                <h1>${course.title}</h1>
                <p>${course.description}</p>
            </div>
            ${modulesHtml}
        `;
        
        document.getElementById('back-to-courses').addEventListener('click', () => this.switchView('dashboard-view'));

        this.switchView('course-view');
    },

    switchView(viewId) {
        document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
        setTimeout(() => {
            document.getElementById(viewId).classList.add('active');
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
            sunIcon.style.display = theme === 'light' ? 'block' : 'none';
            moonIcon.style.display = theme === 'dark' ? 'block' : 'none';
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