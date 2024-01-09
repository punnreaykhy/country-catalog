<script>
import CountryList from './components/CountryList.vue';
// import CountryDetailModal from './components/CountryDetail.vue';

export default {
  components: {
    CountryList,
    // CountryDetail,
  },
  data() {
    return {
      selectedCountry: null,
    };
  },
};
</script>

<template>
  <div id="app">
    <CountryList />
    <!-- <CountryDetail :country="selectedCountry" /> -->
  </div>
</template>