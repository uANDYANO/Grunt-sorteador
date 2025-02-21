module.exports = function(grunt) {
    // Inicializa a configuração do Grunt
    grunt.initConfig({
        // Lê o arquivo package.json e armazena suas informações
        pkg: grunt.file.readJSON('package.json'),

        // Configuração da tarefa 'less' para compilar arquivos LESS em CSS
        less: {
            // Configuração para o ambiente de desenvolvimento
            development: {
                files: {
                    // Define o arquivo de saída CSS e o arquivo de entrada LESS
                    './dev/styles/main.css': './src/styles/main.less'
                }
            },
            // Configuração para o ambiente de produção
            production: {
                // Opções de configuração para a compilação em produção
                options: {
                    // Ativa a compressão do CSS para reduzir o tamanho do arquivo
                    compress: true, 
                },
                files: {
                    // Define o arquivo de saída CSS minificado e o arquivo de entrada LESS
                    './dist/styles/main.min.css': './src/styles/main.less'
                }
            }
        },

        // Configuração da tarefa 'watch' para observar as mudanças nos arquivos e executar tarefas automaticamente
        watch: {
            // Observa as mudanças nos arquivos LESS dentro do diretório 'src/styles' e seus subdiretórios
            less: {
                files: ['./src/styles/**/*.less'],
                // Quando um arquivo LESS é modificado, executa a tarefa 'less:development'
                tasks: ['less:development']
            },
            // Observa as mudanças no arquivo 'src/index.html'
            html: {
                files: ['src/index.html'],
                // Quando o arquivo HTML é modificado, executa a tarefa 'replace:dev'
                tasks: ['replace:dev']
            }
        },

        // Configuração da tarefa 'replace' para substituir strings em arquivos
        replace: {
            // Configuração para o ambiente de desenvolvimento
            dev: {
                options: {
                    // Define os padrões de substituição
                    patterns: [
                        {
                            // Procura pela string 'ENDERECO_DO_CSS'
                            match: 'ENDERECO_DO_CSS',
                            // Substitui pela string './styles/main.css' (caminho para o CSS de desenvolvimento)
                            replacement: './styles/main.css'
                        },
                        {
                            // Procura pela string 'ENDERECO_DO_JS'
                            match: 'ENDERECO_DO_JS',
                            // Substitui pela string '../src/scripts/main.js' (caminho para o JS de desenvolvimento)
                            replacement: '../src/scripts/main.js'
                        }
                    ]
                },
                files: [
                    {
                        // Expande a lista de arquivos, permitindo o uso de padrões
                        expand: true,
                        // Remove a estrutura de diretórios dos arquivos de origem
                        flatten: true,
                        // Define os arquivos de origem
                        src: ['src/index.html'],
                        // Define o diretório de destino
                        dest: 'dev/'
                    }
                ]
            },
            // Configuração para o ambiente de produção
            dist: {
                options: {
                    // Define os padrões de substituição
                    patterns: [
                        {
                            // Procura pela string 'ENDERECO_DO_CSS'
                            match: 'ENDERECO_DO_CSS',
                            // Substitui pela string './styles/main.min.css' (caminho para o CSS minificado de produção)
                            replacement: './styles/main.min.css'
                        },
                        {
                            // Procura pela string 'ENDERECO_DO_JS'
                            match: 'ENDERECO_DO_JS',
                            // Substitui pela string './styles/main.min.js' (caminho para o JS minificado de produção)
                            replacement: './scripts/main.min.js'
                        }
                    ]
                },
                files: [
                    {
                        // Expande a lista de arquivos, permitindo o uso de padrões
                        expand: true,
                        // Remove a estrutura de diretórios dos arquivos de origem
                        flatten: true,
                        // Define os arquivos de origem (arquivo HTML pré-construído)
                        src: ['prebuild/index.html'],
                        // Define o diretório de destino
                        dest: 'dist/'
                    }
                ]
            }
        },

        // Configuração da tarefa 'htmlmin' para minificar arquivos HTML
        htmlmin: {
            // Configuração para o ambiente de produção
            dist: {
                options: {
                    // Remove comentários HTML
                    removeComments: true,
                    // Colapsa espaços em branco
                    collapseWhitespace: true
                },
                files: {
                    // Define o arquivo de saída (arquivo HTML pré-construído) e o arquivo de entrada
                    'prebuild/index.html': 'src/index.html'
                }
            }
        },

        // Configuração da tarefa 'clean' para limpar diretórios
        clean: ['prebuild'], // Define o diretório 'prebuild' para ser limpo

        // Configuração da tarefa 'uglify' para minificar arquivos JS
        uglify: {
            target: {
                // Define o arquivo de saída e o arquivo de entrada
                files: {
                    'dist/scripts/main.min.js': 'src/scripts/main.js'
                }
            }
        }

    })

    // Carrega os plugins do Grunt
    grunt.loadNpmTasks('grunt-contrib-less');   // Plugin para compilar arquivos LESS em CSS
    grunt.loadNpmTasks('grunt-contrib-watch');  // Plugin para observar as mudanças nos arquivos
    grunt.loadNpmTasks('grunt-replace');        // Plugin para substituir strings em arquivos
    grunt.loadNpmTasks('grunt-contrib-htmlmin');  // Plugin para minificar arquivos HTML
    grunt.loadNpmTasks('grunt-contrib-clean');    // Plugin para limpar diretórios
    grunt.loadNpmTasks('grunt-contrib-uglify');    // Plugin para minificar arquivos JS

    // Registra as tarefas do Grunt
    grunt.registerTask('default', ['watch']); // Define a tarefa 'default' para executar a tarefa 'watch'
    // Define a tarefa 'build' para executar as tarefas de compilação, minificação e limpeza para produção
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify']);
}