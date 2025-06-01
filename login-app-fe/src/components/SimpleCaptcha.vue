<template>
  <div>
    <div class="q-my-sm">
      What is {{ num1 }} + {{ num2 }}?
    </div>
    <q-input v-model="userAnswer" type="number" label="Answer" dense />
  </div>
</template>

<script>
export default {
  name: 'SimpleCaptcha',
  data () {
    return {
      num1: Math.floor(Math.random() * 10),
      num2: Math.floor(Math.random() * 10),
      userAnswer: ''
    }
  },
  methods: {
    isValid () {
      return parseInt(this.userAnswer) === this.num1 + this.num2
    }
  }
}
</script>
