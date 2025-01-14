<template>
  <div class="guide-cards">
    <!-- Left Card -->
    <a-card class="guide-card" bordered>
      <NuxtImg
        width="400"
        src="https://www.citibank.pl/assets/images/other/push-en.png"
        alt="Guide"
      />
    </a-card>

    <!-- Right Card -->
    <a-card class="guide-card" bordered>
      <div class="report-item">
        <div class="report-info">
          <h4>Report, 15 Oct</h4>
          <p>Shared with CFO</p>
        </div>
        <div class="report-status">
          <a-tag color="gold">In Progress</a-tag>
          <span>Due in 3 days</span>
          <a-button type="link">Annotate</a-button>
        </div>
      </div>
      <div class="report-item secondary">
        <div class="report-info">
          <h4>Report, 10 Sep</h4>
          <p>Shared with Investors</p>
        </div>
        <div class="report-status">
          <a-tag color="green">Complete</a-tag>
          <a-tag color="blue">Realistic</a-tag>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
export default {
  name: "GuideCard",
};
</script>

<style scoped>
.guide-cards {
  display: flex;
  gap: 16px;
}

.guide-card {
  flex: 1;
  padding: 16px;
  border-radius: 16px;
  background-color: rgb(247, 247, 247);
}

.custom-card {
  background: linear-gradient(
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.1)
    ),
    #0f3871;
  color: #fff;
}

.report-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.report-item.secondary {
  background-color: #f9dcb6;
  border-radius: 8px;
  padding: 12px;
}

.report-info h4 {
  margin: 0;
  font-size: 1rem;
}

.report-info p {
  margin: 0;
  font-size: 0.8rem;
  color: #555;
}

.report-status {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
