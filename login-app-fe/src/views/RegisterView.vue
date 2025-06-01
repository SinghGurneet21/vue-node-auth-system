<template>
    <q-page class="q-pa-xl flex flex-center bg-grey-">

    <q-card class="q-pa-xl shadow-2 rounded-borders" style="width: 400px">
      <div class="text-h5 text-center q-mb-md">Register</div>

      <q-input
        v-model="username"
        label="Username"
        filled
        class="q-mb-md"
      />

      <q-input
        v-model="email"
        label="Email"
        type="email"
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

      <q-btn label="REGISTER" color="primary" unelevated class="full-width" @click="handleRegister" />
    </q-card>
  </q-page>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      captchaText: '',
      captchaImage: '', 
      captchaSvg: '',
    }
  },
  methods: {
     async loadCaptcha() {
      try {
        const response = await axios.get(`http://localhost:5000/api/captcha?ts=${Date.now()}`, {
          responseType: 'text', 
            withCredentials: true 

        });
        this.captchaSvg = response.data;
      } catch (error) {
        console.error('Failed to load captcha', error);
      }
    },

    
    async handleRegister() {
      // Call register API with username, password, email, captcha
      try {
        const response = await axios.post('http://localhost:5000/api/auth/register', {
          'username': this.username,
          'email': this.email,
          'password': this.password,
          'captcha': this.captchaText
          },
          {
          withCredentials: true
        });
        this.$q.notify({
          type: 'positive',
          message: response.data.message || 'Registration successful',
          timeout: 2500,
          position: 'top'
        });


      } catch (error) {
        console.error('Failed to load captcha', error);
        const errMsg = error.response?.data?.message || 'Registration failed. Please try again.'
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
