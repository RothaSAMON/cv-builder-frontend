<template>
  <a-card
    class="custom-card"
    bordered
    :style="{
      backgroundColor: '#0f3871',
      borderRadius: '8px',
      padding: '16px',
    }"
  >
    <div class="content">
      <div class="text-section">
        <h3 class="title">Get the very best apps for your store</h3>
        <p class="subtitle">Upgrade to the new checkout automation.</p>
        <a-button class="resumes-button" type="primary" size="large" ghost>
          <AppstoreOutlined /> See Resumes
        </a-button>
      </div>
      <div class="greeting-image">
        <NuxtImg
          width="200"
          src="https://maxst.icons8.com/vue-static/icon/popular-request/request-social-media.png"
          alt="greeting"
        />
      </div>
    </div>
  </a-card>
</template>

<script>
import { AppstoreOutlined } from "@ant-design/icons-vue";

export default {
  name: "CardGreeting",
  components: {
    AppstoreOutlined,
  },
};
</script>

<style scoped>
.custom-card {
  color: #fff;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text-section {
  flex: 1;
}

.title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
}

.subtitle {
  margin: 0 0 16px 0;
  font-size: 1rem;
  color: #d3d3d3;
}

.icons img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.resumes-button {
  background-color: var(--background-color);
}
</style>
