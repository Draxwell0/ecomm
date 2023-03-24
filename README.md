## 12 fatores

1. Base de Código - Implementado
  Toda a aplicação tem uma base de código com um sistema de controle de versão seguindo suas devidas práticas e com múltiplos deploys;

2. Dependências - Implementado
  Todas as dependências estão declaradas de forma precisa e explícita, isoladamente;

3. Configurações - Implementado
  Configurações e conexões que podem variar entre deploys estam sendo feitas de forma dinâmica na aplicação por meio de variáveis de ambiente;

4. Serviços de apoio - Implementado
  Serviços de apoio são anexados e não necessitam de mudanças no código do app para modificação;

5. Construa, lance, execute - Implementado
  A separação entre os estágios é realizada em sua respectiva ordem via Docker;

6. Processos - Implementado
  Toda a aplicação é executada como um ou mais processos que não armazenam estado;

7. Vínculo de porta - Implementado
  Todos os serviços são exportados via vínculo de portas;

8. Concorrência - Implementado
  Os processos da aplicação foram projetados de modo que permitem a sua escalabilidade e replicabilidade;

9. Descartabilidade - Implementado
  Os processos são inicializados e encerrados de forma rápida e com "desligamento gracioso";

10. Paridade de ambientes - Implementado
  Os ambientes de desenvolvimento, teste e produção possuem a maior paridade possível;

11. Logs - Implementado
  Logs são tratados como fluxos de eventos, para o stdout;

12. Processos admnistrativos - Implementado
  A aplicação roda tarefas de admnistração/gestão como processos de manutenção pontuais;

## Patterns de microservices

- Serviços de domínio - Aplicado

- Serviços de negócio - Aplicado

- API Gateway - Aplicado

- Agregador de processos - Aplicado

- Edge service - Não aplicado

- Single database vs Bancos diferentes - Aplicado com bancos diferentes, sendo um para cada serviço independente

- Eventos assíncronos - Não aplicado

- Agregação de logs - Não aplicado

- Agregação de métricas - Não aplicado

## Outros aspectos de microservices

- Padronização de stacks 
  Os serviços visam seguir um padrão de tecnologias utilizadas, fazendo uso essencialmente de node.js, javascript e mongodb, ainda passível de pequenas alterações nas mesmas stacks que não sejam tão impactantes; 

- Service discovery
  Conceitos que regem service discovery demonstram a necessidade de fazer uma comunicação dinâmica entre diferentes ip's dentro de uma rede, sendo possível um escalamento automático com soluções como load balancers, ainda não aplicadas;

- Aspectos de segurança
  Diversos conceitos que dizem respeito a segurança são utilizados, mantendo segurança no transporte e em repouso com ferramentas de autenticação/autorização e a devida criptografia de dados sensíveis, tendo como necessário aprimoramento em partes de segurança na rede;

- Deploy e build
  Como ferramenta para CI/CD é viável o uso do GitHub Actions, garantindo integridade nos devidos processos em um ambiente único;

- Falhas com assincronicidade 
  Técnicas como cache ou o pattern 'circuit breaker' servem para garantir uma resiliência/integridade à aplicação com tolerância de falhas possivelmente desastrosas. Tratativa de erros com eventos assíncronos ainda não foram implementadas;

- Comunicação assíncrona
  Serviços de comunicação assíncrona podem ser utilizados preferencialmente no serviço de pedidos com todo o seu processamento e o evento de criação/envio da nota fiscal;
