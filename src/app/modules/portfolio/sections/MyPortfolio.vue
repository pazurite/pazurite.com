<template>
  <div class="project-listing">
    <a
      class="project-card"
      v-for="({ title, url, image }, i) in projects"
      :key="i"
      :href="url"
      target="_blank"
    >
      <div class="card-overlay" />
      <div class="card-details">
        <base-typography class="card-title" variant="title-6" font-weight="medium">
          {{ title }}
        </base-typography>

        <div class="card-icon-link">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 442.246 442.246"
            width="20"
            xml:space="preserve"
          >
            <g fill="white">
              <path
                d="M409.657,32.474c-43.146-43.146-113.832-43.146-156.978,0l-84.763,84.762c29.07-8.262,60.589-6.12,88.129,6.732
			l44.063-44.064c17.136-17.136,44.982-17.136,62.118,0c17.136,17.136,17.136,44.982,0,62.118l-55.386,55.386l-36.414,36.414
			c-17.136,17.136-44.982,17.136-62.119,0l-47.43,47.43c11.016,11.017,23.868,19.278,37.332,24.48
			c36.415,14.382,78.643,8.874,110.467-16.219c3.06-2.447,6.426-5.201,9.18-8.262l57.222-57.222l34.578-34.578
			C453.109,146.306,453.109,75.926,409.657,32.474z"
              />
              <path
                d="M184.135,320.114l-42.228,42.228c-17.136,17.137-44.982,17.137-62.118,0c-17.136-17.136-17.136-44.981,0-62.118
			l91.8-91.799c17.136-17.136,44.982-17.136,62.119,0l47.43-47.43c-11.016-11.016-23.868-19.278-37.332-24.48
			c-38.25-15.3-83.232-8.262-115.362,20.502c-1.53,1.224-3.06,2.754-4.284,3.978l-91.8,91.799
			c-43.146,43.146-43.146,113.832,0,156.979c43.146,43.146,113.832,43.146,156.978,0l82.927-83.845
			C230.035,335.719,220.243,334.496,184.135,320.114z"
              />
            </g>
          </svg>
        </div>
      </div>

      <base-img :src="image" />
    </a>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      projects: [
        {
          title: "FINSO: Real Estate Fintech",
          url: "https://finso.com.vn/",
          image: require("@/assets/images/finso-image.jpg"),
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.project-listing {
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.project-card {
  position: relative;

  background-color: color(white);
  border-radius: 20px;
  box-shadow: 0px 5px 20px 0px rgba(69, 67, 96, 0.1);

  overflow: hidden;

  .card-details {
    position: absolute;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 100%;
    width: 100%;
    z-index: 20;

    padding: 20px;
  }

  .card-overlay {
    position: absolute;
    height: 100%;
    width: 100%;
    opacity: 0;
    z-index: 20;
    background-color: color(violet);

    transition: all 0.3s $ease-in-out;
  }

  .card-title {
    opacity: 0;
    transform: translateY(30px);
    transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 1s;
  }

  .card-icon-link {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;

    background-color: color(yellow);
    border-radius: 100%;

    opacity: 0;
    transition: all 0.3s $ease-in-out;
  }

  &:hover {
    .card-title,
    .card-icon-link {
      opacity: 1;
      transform: translateY(0);
    }
    .card-overlay {
      opacity: 0.9;
    }
  }
}
</style>
