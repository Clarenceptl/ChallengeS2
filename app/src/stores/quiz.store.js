import { defineStore } from 'pinia'
import { QuizService } from '@/services/quiz.service'

export const useQuizStore = defineStore('quizStore', {
  state: () => ({
    quiz: {}
  }),
  actions: {
    async getQuizByJobId(id) {
      const response = await QuizService.getQuizByJobId(id)
      if (response?.success) {
        this.quiz = response.data
      }
      return response
    },
    async createQuiz(quiz) {
      const response = await QuizService.createQuiz(quiz)
      if (response?.success) {
        // await this.getQuizByJobId(quiz.idJobAds)
      }
      console.log(response)
      return response
    },
    async addQuestionToQuiz(id, question) {
      const response = await QuizService.addQuestionToQuiz(id, question)
      if (response?.success) {
        // await this.getQuizByJobId(id)
      }
      return response
    },
    async updateQuiz(id, quiz) {
      const response = await QuizService.updateQuiz(id, quiz)
      if (response?.success) {
        // await this.getQuizByJobId(id)
      }
      return response
    },
    async userAnswers(id, answers) {
      const response = await QuizService.userAnswers(id, answers)
      if (response?.success) {
        // await this.getQuizByJobId(id)
      }
      return response
    }
  }
})
