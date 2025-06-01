<template>
    <q-page class="q-pa-xl flex flex-center bg-grey-">
    <q-card class="q-pa-xl shadow-2 rounded-borders" style="width: 400px">
      <div class="text-h5 text-center q-mb-md">Login</div>

      <q-input
        v-model="username"
        label="Username"
        filled
        class="q-mb-md"
      />

      <q-input
        v-model="password"
        label="Password"
        type="password"
        filled
        class="q-mb-md"
      />

      <div class="q-mb-sm">Enter Captcha</div>
      <div class="row items-center q-mb-md">
        <!-- <img :src="captchaImage" alt="captcha" height="40" class="q-mr-sm" /> -->
         <div v-html="captchaSvg" class="q-mr-sm" style="height: 40px;"></div>

        <q-btn
          flat
          icon="refresh"
          @click="loadCaptcha"
          round
          size="sm"
        />
      </div>

      <q-input
        v-model="captchaText"
        label="Enter captcha text"
        filled
        class="q-mb-md"
      />

      <q-btn label="LOGIN" color="primary" unelevated class="full-width" @click="handleLogin" />
    </q-card>
  </q-page>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      captchaText: '',
      captchaSvg: ''
    }
  },
  methods: {
    async loadCaptcha() {
      try {
        const response = await axios.get(`http://localhost:5000/api/captcha?ts=${Date.now()}`, {
          responseType: 'text', // Ensures SVG is not parsed
            withCredentials: true // 🔥 ADD THIS

        });
        
        this.captchaSvg = response.data;
      } catch (error) {
        console.error('Failed to load captcha', error);
      }
    },
    async handleLogin() {
      // Call register API with username, password, email, captcha
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
        'email': this.username,
        'password': this.password,
        'captcha': this.captchaText
        },
        {
        withCredentials: true // 👈 THIS IS CRITICAL
        });
        this.$q.notify({
          type: 'positive',
          message: response.data.message || 'Login successful',
          timeout: 2500,
          position: 'top'
        });


    } catch (error) {
    // console.error('Failed to load captcha', error);
    const errMsg = error.response?.data?.message || 'Login failed. Please try again.'
     this.$q.notify({
        type: 'negative',
        message: errMsg,
        timeout: 3000,
        position: 'top'
      });
    }
    }
  },
  mounted() {
    this.loadCaptcha()
  }
}
</script>
