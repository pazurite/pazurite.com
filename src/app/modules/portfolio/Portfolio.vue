<template>
  <div class="portfolio">
    <section
      class="portfolio__section"
      v-for="{ name, title, component } in portfolioSections"
      :key="name"
      :id="name"
    >
      <heading-text>{{ title }}</heading-text>

      <component :is="component" />
    </section>
  </div>
</template>

<script lang="ts">
import HeadingText from "@c/components/HeadingText.vue";
import AboutMe from "@m/portfolio/sections/AboutMe.vue";
import MyProjects from "@m/portfolio/sections/MyPortfolio.vue";

export default {
  components: { HeadingText, AboutMe, MyProjects },
  data() {
    return {
      portfolioSections: [
        {
          name: "about-us",
          title: "About Me",
          component: AboutMe,
        },

        {
          name: "my-projects",
          title: "My Portfolio",
          component: MyProjects,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.portfolio {
  display: grid;
  gap: 60px;
  grid-auto-flow: row;
  padding: 60px;

  overflow-y: auto;

  &__section {
    display: grid;
    gap: 30px;
    grid-auto-flow: row;
  }
}
</style>
