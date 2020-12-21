const Task = use('Task');
const DiscontinueBudgetService = use('App/Services/DiscontinueBudgetService');

class DiscontinueBudgetTask extends Task {
  static get schedule() {
    return { hour: 1, minute: 0 }; // Agendado para executar as 01:00 AM
  }

  async handle() {
    try {
      DiscontinueBudgetService.discontinueThis();
    } catch (e) {
      console.log('Erro ao executa Tarefa DiscontinueBudget. ', e);
    }
  }
}

module.exports = DiscontinueBudgetTask;
