function syncCalendarEvents() {
  // lista das pastas de trabalho, nome do evento e cor
  var sheets = [
    {
      name: 'SÍNDICOS',
      category: 'VENCIMENTO DE ATA',
      color: CalendarApp.EventColor.RED
    },
    {
      name: 'SEGURO',
      category: 'VENCIMENTO DE SEGURO',
      color: CalendarApp.EventColor.ORANGE
    },
    {
      name: 'EXTINTORES',
      category: 'VENCIMENTO DE EXTINTORES',
      color: CalendarApp.EventColor.YELLOW
    }
  ];

  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  sheets.forEach(function(sheetInfo) {
    var sheet = spreadsheet.getSheetByName(sheetInfo.name);
    if (!sheet) return;
    
    var range = sheet.getDataRange();
    var values = range.getValues();
    
    for (var i = 1; i < values.length; i++) {
      var row = values[i];
      var condoName = row[0];
      var endDate = new Date(row[2]);
      var description = getDescription(sheetInfo.name, row);
      var eventId = row[8];
      var category = sheetInfo.category;
      
      // Criação de título e descrição do evento
      var eventTitle = condoName + " - " + category;
      var eventDescription = description + "\nCategoria: " + category;
      
      // Config para aparecer evento apenas na data final
      var startDate = new Date(endDate);
      startDate.setHours(0, 0, 0, 0); 
      endDate.setHours(23, 59, 59, 999); 

      // Método de notificação e dias de alerta 
      var reminders = [
        {method: 'email', daysBefore: 30},
        {method: 'email', daysBefore: 15},
        {method: 'email', daysBefore: 7}
      ];

      // Verificação de existência de id de evento
      if (eventId) {
        try {
          var event = CalendarApp.getDefaultCalendar().getEventById(eventId);
          if (event) {
            event.setTitle(eventTitle);
            event.setDescription(eventDescription);
            event.setTime(startDate, endDate);
            event.setColor(sheetInfo.color);
            event.removeAllReminders();
            reminders.forEach(function(reminder) {
              event.addEmailReminder(reminder.daysBefore * 24 * 60); 
            });
          }
        } catch (e) {
          Logger.log('Event with ID ' + eventId + ' not found.');
        }
      } else {
        var newEvent = CalendarApp.getDefaultCalendar().createEvent(eventTitle, startDate, endDate, {
          description: eventDescription
        });
        newEvent.setColor(sheetInfo.color);
        reminders.forEach(function(reminder) {
          newEvent.addEmailReminder(reminder.daysBefore * 24 * 60); 
        });
        sheet.getRange(i + 1, 9).setValue(newEvent.getId());
      }
    }
  });
}

// Personaliza a descrição do evento concatenando informações específicas de cada aba para criar a descrição do evento
function getDescription(sheetName, row) {
  if (sheetName === 'SÍNDICOS') {
    return "Síndico: " + row[3] + "\nApartamento: " + row[4] + "\nTelefone: " + row[5] + "\nEmail: " + row[6] + "\nObservações: " + row[7];
  } else if (sheetName === 'SEGURO') {
    return "Apólice Recebida: " + row[2] + "\nSeguradora: " + row[3] + "\nCorretora: " + row[4] + "\nObservações: " + row[5];
  } else if (sheetName === 'EXTINTORES') {
    return "Nível Realizado: " + row[3] + "\nTeste Mangueiras: " + row[4] + "\nObservações: " + row[5];
  }
  return "";
}
