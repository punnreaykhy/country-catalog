<script>
import axios from 'axios';
import fuzzysort from 'fuzzysort'; // Make sure to install fuzzysort: npm install fuzzysort
import countryService from '../services/countryService';
export default {
  data() {
    return {
      countries: [],
      currentPage: 1,
      countriesPerPage: 25,
      searchQuery: '',
    };
  },
  computed: {
    sortedCountries() {
      return this.countries.sort((a, b) =>
        a.name.official.localeCompare(b.name.official)
      );
    },
    filteredCountries() {
      if (!this.searchQuery) return this.sortedCountries;
      const options = {
        keys: ['name.official'],
      };
      const results = fuzzysort.go(this.searchQuery, this.sortedCountries, options);
      this.currentPage = 1;

      return results.map((result) => result.obj);
    },
    totalPages() {
      return Math.ceil(this.filteredCountries.length / this.countriesPerPage);
    },
    paginatedSortedAndFilteredCountries() {
      const startIndex = (this.currentPage - 1) * this.countriesPerPage;
      const endIndex = startIndex + this.countriesPerPage;
      return this.filteredCountries.slice(startIndex, endIndex);
    },
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1;
      }
    },
  },
  async mounted() {
    // Fetch countries from the API
    this.countries = await countryService.getCountries();
  },
};
</script>

<template>
  <div>
    

    <h1>Countries List</h1>
    <input v-model="searchQuery" placeholder="Search by country name" />
    <div class='flex items-center justify-center my-3'>
      <div class="flex justify-center items-center space-x-4">
        <button @click="prevPage" :disabled="currentPage === 1">« Previous</button>
        <div class="text-slate-500">{{ currentPage }} / {{ totalPages }}</div>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next »</button>
      </div>
    </div>
    <ul>
      <li v-for="country in paginatedSortedAndFilteredCountries" :key="country.ccn3">
        <div class="bg-white dark:bg-gray-900 mt-3">
          <div class="container px-4 py-4 mx-auto">
              <div class="flex flex-col lg:-mx-6 lg:flex-row items-center justify-center">
                <img class="lg:mx-4 w-64 lg:w-96 rounded-xl h-48 lg:h-64" :src="country.flags.png" :alt="country.name.official">
                <div class="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
                  <div class="block mt-4 text-2xl font-semibold text-gray-800 hover:underline dark:text-white md:text-3xl">
                    {{ country.name.official }}
                  </div>
                  <div class="">
                    <div class=" mt-2 text-blue-500">{{country.cca2}}</div>
                    <div class=" mt-2 text-blue-500">{{country.cca3}}</div>
                    <div class=" mt-2 text-blue-500">{{ country.nativeName }}</div>
                    <div class=" mt-2 text-blue-500">{{country.altSpellings}}</div>
                    <div class=" mt-2 text-blue-500 overscroll-auto">Calling Codes: <a href="#">{{ country.idd.root }}</a></div>
                  </div>
                </div>
              </div>
          </div>
        </div>
        
        
      </li>
    </ul>
    

<div class='flex items-center justify-center my-3'>
  <div class="flex justify-center items-center space-x-4">
    <button @click="prevPage" :disabled="currentPage === 1">« Previous</button>
    <div class="text-slate-500">{{ currentPage }} / {{ totalPages }}</div>
    <button @click="nextPage" :disabled="currentPage === totalPages">Next »</button>
  </div>
</div>
    
  </div>
</template>

<style scoped>

</style>