<template>
  <section class="container mt-4">
    <h3>Home</h3>
    <p>{{ authenticated }}</p>
  </section>
</template>

<script>

export default {  
    middleware: 'auth',
}
</script>

