const API_GATEWAY_URL = import.meta.env.VITE_API_GATEWAY_URL
export class QuizService {
  static async getQuizByJobId(id) {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/quiz/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('bearer-token')}`
        }
      })
      return await response.json()
    }
    catch (error) {
      console.error(error)
      return error.response
    }
  }

  static async createQuiz(quiz) {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/quiz`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('bearer-token')}`
        },
        body: JSON.stringify({
          ...quiz,
          tempsParQuestionSecond: parseInt(quiz.tempsParQuestionSecond),
        })
      })
      return await response.json()
    }
    catch (error) {
      console.error(error)
      return error.response
    }
  }

  static async addQuestionToQuiz(id, question) {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/quiz/questions/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('bearer-token')}`
        },
        body: JSON.stringify({
          ...question,
          correct: {
            id: question.answers[0].id,
            label: question.answers[0].label
          }
        })
      })
      return await response.json()
    }
    catch (error) {
      console.error(error)
      return error.response
    }
  }

  static async updateQuiz(id, quiz) {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/quiz/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('bearer-token')}`
        },
        body: JSON.stringify({
          ...quiz,
          tempsParQuestionSecond: parseInt(quiz.tempsParQuestionSecond),
        })
      })
      return await response.json()
    }
    catch (error) {
      console.error(error)
      return error.response
    }
  }

  static async userAnswers(id, answers) {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/quiz/addResponse/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('bearer-token')}`
        },
        body: JSON.stringify(answers)
      })
      return await response.json()
    }
    catch (error) {
      console.error(error)
      return error.response
    }
  }
}
