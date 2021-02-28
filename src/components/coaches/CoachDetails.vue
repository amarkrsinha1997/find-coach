<template>
  <main>
    <section>
      <base-card>
        <h2>
          {{ fullName }}
        </h2>
        <h3>${{ rate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested? React out now!</h2>
          <base-button v-if="!isContactPage" link :to="contactLink">Contact</base-button>
          <base-button v-else>Contact</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        >
        </base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </main>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      selectedCoach: null,
    };
  },
  computed: {
    fullName() {
      return this.selectedCoach.firstName + " " + this.selectedCoach.lastName;
    },
    contactLink() {
      return this.$route.path + "/contact";
    },
    areas() {
      return this.selectedCoach.areas;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    description() {
      return this.selectedCoach.description;
    },
    isContactPage() {
      return this.$route.path.includes("/contact")
    }
  },
  created() {
    this.selectedCoach = this.$store.getters["coaches/coaches"].find(
      (coach) => coach.id === this.id
    );
  },
};
</script>