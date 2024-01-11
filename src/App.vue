<script>
import CountryList from './components/CountryList.vue';
import CountryDetail from './components/CountryDetail.vue';

export default {
  components: {
    CountryList,
    CountryDetail,
  },
  data() {
    return {
      selectedCountry: null,
      isModalOpen: false,
    };
  },
  methods: {
    openModal(country) {
      this.selectedCountry = country;
      this.isModalOpen = true;
    },
    closeModal() {
      this.selectedCountry = null;
      this.isModalOpen = false;
    },
  },
};
</script>

<template>
  <div id="app">
    <CountryList @countrySelected="openModal" />
    <CountryDetail :country="selectedCountry" v-if="isModalOpen" @closeModal="closeModal"/>
  </div>
</template>