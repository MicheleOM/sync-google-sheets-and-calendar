# Google Calendar & Google Sheets Sync - Eventos Condominiais

O código é uma função JavaScript escrita para o Google Apps Script, com o objetivo principal de sincronizar eventos específicos de diferentes categorias relacionadas à administração condominial do Google Sheets para o Google Calendar. O script, de forma automatizada, atualiza ou cria novos eventos no calendário com base nas informações da planilha, atribuindo categorias e cores específicas para cada tipo de evento.

No meu trabalho, senti a necessidade de ter uma planilha para registrar informações específicas de vencimento de itens importantes de condomínios. Para facilitar o gerenciamento, desenvolvi este script que vincula automaticamente esses dados à agenda do Google, garantindo que as notificações sejam enviadas para todos os telefones da empresa e também por e-mail, garantindo que nenhum prazo crítico seja perdido.


## Funcionalidades e Benefícios

- **Sincronização por Categorias:** Sincroniza eventos de categorias distintas, como "Vencimento de Ata", "Vencimento de Seguro", e "Vencimento de Extintores", de diferentes abas de planilha.
- **Automatização Completa:** Atualiza eventos existentes no Google Calendar ou cria novos eventos conforme necessário, com base nas mudanças no Google Sheets. Se existir um ID de evento na planilha, busca o evento no calendário e atualiza seus dados.Se não existir ID, cria um novo evento no calendário com os dados da planilha e salva o ID na planilha.
- **Gestão de Eventos:** Gerencia a criação e atualização de eventos no Google Calendar, adicionando lembretes automáticos via e-mail e notificação.
- **Configuração de Eventos:** Define título, descrição, data de início e fim, etc para cada evento.
- **Cores Personalizadas:** Define uma cor específica para cada categoria de evento no Google Calendar, facilitando a visualização.


  

