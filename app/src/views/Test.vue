<template>
  <div class="pa-5">
    <h1 class="text-center">{{ quiz.title }}</h1>
    <h2 class="text-center">{{ quiz.tempsParQuestionSecond * quiz.questions.length }} seconds</h2>
    <v-window v-model="selected" name="question">
      <v-card v-for="(question, index) in quiz.questions" :key="index" flat>
        <v-card-title>
          <h2>{{ question.label }}</h2>
        </v-card-title>
        <v-card-text>
          <v-radio-group v-model="selected[index]">
            <v-radio
              v-for="(answer, idx) in question.answers"
              :key="idx"
              :value="answer.id"
              :label="answer.label"
            />
          </v-radio-group>
        </v-card-text>
      </v-card>
    </v-window>
    <v-btn color="blue-500 w-100 mt-4" @click="sendUserAnswers">Submit</v-btn>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useQuizStore } from '../stores/quiz.store';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useToastStore } from '@/stores'

const stores = {
  toast: useToastStore()
}

const route = useRoute();
const router = useRouter();
await useQuizStore().getQuizByJobId(route.params.id);
const { quiz } = storeToRefs(useQuizStore());

const selected = ref([]);

const userAnsers = computed(() => {
  return selected.value.map((answerId, index) => {
    return {
      idQuestion: quiz.value.questions[index]._id,
      id: answerId,
      label: quiz.value.questions[index].answers.find(
        (answer) => answer.id === answerId
      ).label,
    };
  });
});

const sendUserAnswers = async () => {
  useQuizStore().userAnswers(quiz.value._id, userAnsers.value).then(() => {
    stores.toast.createToast({
      type: 'success',
      message: 'Your answers have been sent successfully',
    });
    router.push('/applied-list');
  }).catch(() => {
    stores.toast.createToast({
      type: 'error',
      message: 'An error has occured',
    });
  });
};

</script>

<style scoped></style>