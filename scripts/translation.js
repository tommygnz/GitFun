
// Create constant for an array of the languages available and its translations of the content
const translations = {
    // Translations for Spanish
    es: {
        "git-introduction": {
            title: '¿Qué es Git?',
            content: "Git es un sistema de control de versiones distribuido, diseñado para manejar proyectos de software de manera eficiente y con alta velocidad. Creado por Linus Torvalds en 2005, permite a los desarrolladores seguir y gestionar los cambios en el código fuente a lo largo del tiempo."
        },
        "github-introduction": {
            title: "Git y GitHub: una sinergia para el desarrollo colaborativo",
            content: "GitHub es una plataforma de desarrollo colaborativo basada en Git. Mientras que Git es una herramienta de control de versiones distribuido, GitHub proporciona un entorno para alojar repositorios de Git en la nube, facilitando la colaboración y el seguimiento de proyectos."
        },
        "git-commands": {
            title: "Comandos Git",
            sections: {
                "config": {
                    title: "Configuración",
                    commands: {
                        "config": "Obtiene y establece las opciones globales o de repositorio de git."
                    }
                },
                "creation-cloning": {
                    title: "Creación y clonación de proyectos",
                    commands: {
                        "init": "Crea un repositorio vacío o inicializa un repositorio existente.",
                        "clone": "Clona un repositorio en un nuevo repositorio."
                    }
                },
                "change-control": {
                    title: "Control de cambios",
                    commands: {
                        "status": "Muestra el estado actual del repositorio."
                    }
                },
                "branch-merge": {
                    title: "Ramas y Fusiones",
                    commands: {
                        "log": "Muestra un registro con los commits realizados en la rama actual en orden cronológico inverso.",
                        options: {
                            "oneline": "Muestra la primera línea de cada commit omitiendo autor, fecha y descripción.",
                            "graph-all": "Muestra una visualización en árbol de los commits en todas las ramas o de los commits en la rama actual si se excluye [--all]."
                        }
                    },
                }
            }
        }
    },

    // Translations for English
    en: {
        "git-introduction": {
            title: "What is Git?",
            content: "Git is a distributed version control system designed to handle software development projects efficiently and with high speed. Created by Linus Torvalds in 2005, it allows developers to track and manage changes to source code over time."
        },
        "github-introduction": {
            title: "Git and GitHub: A Synergy for Collaborative Development",
            content: "GitHub is a collaborative development platform based on Git. While Git is a distributed version control tool, GitHub provides an environment for hosting Git repositories in the cloud, facilitating collaboration and project tracking."
        },
        "git-commands": {
            title: "Git Commands",
            sections: {
                "config": {
                    title: "Configuration",
                    commands: {
                        "config": "Gets and sets global or repository-specific Git options."
                    }
                },
                "creation-cloning": {
                    title: "Project Creation and Cloning",
                    commands: {
                        "init": "Creates an empty Git repository or reinitializes an existing repository.",
                        "clone": "Clones a repository into a new repository."
                    }
                },
                "change-control": {
                    title: "Change Control",
                    commands: {
                        "status": "Shows the current state of the repository."
                    }
                },
                "branch-merge": {
                    title: "Branching and Merging",
                    commands: {
                        "log": "Shows a log of the commits made to the current branch in reverse chronological order.",
                        options: {
                            "oneline": "Shows the first line of each commit, omitting author, date, and description.",
                            "graph-all": "Shows a tree view of commits on all branches or on the current branch if [--all] is excluded."
                        }
                    },
                    
                }
            }
        }
    }
};

// Function to change the language
function setLanguage(lang) {

    // Select all sections with ids starting with 'git-' or 'github-'
    const sections = document.querySelectorAll('section[id^="git-"], section[id^="github-"]');
    
    // Iterate through each section and update content based on translations
    sections.forEach(section => {
        const sectionId = section.id;
        const translation = translations[lang][sectionId];

        // Update section title and content if translations are available
        if (translation) {
            const titleElement = section.querySelector('h1, h2, h3');
            const contentElement = section.querySelector('p');

            if (titleElement) {
                titleElement.textContent = translation.title;
            }
            if (contentElement) {
                contentElement.textContent = translation.content;
            }

            // Update subsections and commands if available
            if (translation.sections) {
                Object.keys(translation.sections).forEach(sectionKey => {
                    const sectionData = translation.sections[sectionKey];
                    const sectionTitleElement = section.querySelector(`.command-section.${sectionKey}`);

                    if (sectionTitleElement) {
                        sectionTitleElement.textContent = sectionData.title;
                    }

                    const commands = sectionData.commands;
                    
                    // Update commands if available
                    if (commands) {
                        Object.keys(commands).forEach(commandKey => {
                            const commandElement = section.querySelector(`#${commandKey}`);
                            
                            if (commandElement) {
                                // Iterate over all child nodes of the commandElement
                                Array.from(commandElement.childNodes).forEach(node => {
                                    const previousElement = node.previousElementSibling;

                                    // Skip nodes that are null or not element nodes
                                    if (!previousElement || previousElement.nodeType !== Node.ELEMENT_NODE) {
                                        return;
                                    }
                                    
                                    // Update text nodes that follow a span element
                                    if (node.nodeType === Node.TEXT_NODE && previousElement.tagName == 'SPAN') {
                                        node.textContent = `${commands[commandKey]}`;
                                    }
                                });

                                const options = commands.options;

                                // Update command options if available
                                if (options) {
                                    Object.keys(options).forEach(optionKey => {
                                        const optionElement = section.querySelector(`#${optionKey}`);
                                        
                                        if (optionElement) {
                                            Array.from(optionElement.childNodes).forEach(node => {

                                                // Skip nodes that are null or not element nodes
                                                const previousElement = node.previousElementSibling;
                                                if (!previousElement || previousElement.nodeType !== Node.ELEMENT_NODE) {
                                                    return;
                                                }
                                                
                                                // Update text nodes that follow a br element
                                                if (node.nodeType === Node.TEXT_NODE && previousElement.tagName == 'BR') {
                                                    node.textContent = `${options[optionKey]}`;
                                                }
                                            });
                                        }
                                    });
                                }
                            }
                        });
                    }
                    
                    
                });
            }
        }
    });
}

// initialize language buttons
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn-es').addEventListener('click', () => setLanguage('es'));
    document.getElementById('btn-en').addEventListener('click', () => setLanguage('en'));
    setLanguage('es');  // Set default language to Spanish
});



