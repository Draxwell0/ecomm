# 12 fatores

I. Base de Código - Implementado
  Toda a aplicação tem uma base de código com um sistema de controle de versão seguindo suas devidas práticas e com múltiplos deploys;

II. Dependências - Implementado
  Todas as dependências estão declaradas de forma precisa e explícita, isoladamente;

III. Configurações - Implementado
  Configurações e conexões que podem variar entre deploys estam sendo feitas de forma dinâmica na aplicação por meio de variáveis de ambiente;

IV. Serviços de apoio - Implementado
  Serviços de apoio são anexados e não necessitam de mudanças no código do app para modificação;

V. Construa, lance, execute - Implementado
  A separação entre os estágios é realizada em sua respectiva ordem via Docker;

VI. Processos - Implementado
  Toda a aplicação é executada como um ou mais processos que não armazenam estado;

VII. Vínculo de porta - Implementado
  Todos os serviços são exportados via vínculo de portas;

VIII. Concorrência - Implementado
  Os processos da aplicação foram projetados de modo que permitem a sua escalabilidade e replicabilidade;

IX. Descartabilidade - Implementado
  Os processos são inicializados e encerrados de forma rápida e com "desligamento gracioso";

X. Paridade de ambientes - Implementado
  Os ambientes de desenvolvimento, teste e produção possuem a maior paridade possível;

XI. Logs - Implementado
  Logs são tratados como fluxos de eventos, para o stdout;

XII. Processos admnistrativos - Implementado
  A aplicação roda tarefas de admnistração/gestão como processos de manutenção pontuais;

# Patterns de microservices

Serviços de domínio - Aplicado

Serviços de negócio - Aplicado

API Gateway - Não aplicado

Agregador de processos - Aplicado

Edge service - Não aplicado

Single database vs Bancos diferentes - Aplicado com bancos diferentes, sendo um para cada serviço independente

Eventos assíncronos - Não aplicado

Agregação de logs - Não aplicado

Agregação de métricas - Não aplicado
