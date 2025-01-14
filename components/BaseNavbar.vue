<template>
  <header class="navbar-container">
    <nav class="navbar">
      <NuxtLink to="/" class="logo-container">
        <NuxtImg
          width="56px"
          src="https://img.freepik.com/free-vector/abstract-blue-flower-design_1142-206807.jpg"
          format="webp"
          alt="Nuxtcipes Logo"
        />
        <span class="logo-text">Rezume</span>
      </NuxtLink>
      <ul class="nav-links">
        <li>
          <NuxtLink to="/login">Log in</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/signup">Sign up</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.navbar-container {
  width: 100%;
  background-color: white;
  border-bottom: 1px solid #ddd;
}

.navbar {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  padding: 6px;
}

.logo-text {
  font-size: 24px;
  font-weight: bold;
  color: #41bbff;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
  list-style: none;
  margin: 0;
  padding: 0;
  font-weight: 500;
}

.nav-links a {
  text-decoration: none;
  color: #000;
}

.nav-links a:hover {
  color: #41bbff;
}
</style>
