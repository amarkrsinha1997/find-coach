<template>
  <main>
    <section>
      <base-card>
        <h2>Register as a coach now!</h2>
        <coach-form></coach-form>
      </base-card>
    </section>
  </main>
</template>

<script>
import CoachForm from './CoachForm';

export default {
  components: { CoachForm } ,
}
</script>
<style scoped>

</style>