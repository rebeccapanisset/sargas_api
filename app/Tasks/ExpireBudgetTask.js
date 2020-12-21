const Task = use('Task');
const ExpireBudgetService = use('App/Services/ExpireBudgetService');

class ExpireBudgetTask extends Task {
  static get schedule() {
    return { hour: 1, minute: 30 }; // Agendado para executar as 01:30 AM
  }

  async handle() {
    try {
      ExpireBudgetService.expireThis();
    } catch (e) {
      console.log('Erro ao executa Tarefa ExpireBudget. ', e);
    }
  }
}

module.exports = ExpireBudgetTask;
