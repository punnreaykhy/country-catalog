<script>
import fuzzysort from 'fuzzysort';
import countryService from '../services/countryService';
export default {
    data() {
        return {
            countries: [],
            currentPage: 1,
            countriesPerPage: 25,
            searchQuery: '',
            sortOrder: 'asc',
        };
    },
    computed: {
        sortedCountries() {
            const sortOrderFactor = this.sortOrder === 'asc' ? 1 : -1;
            return this.countries.sort((a, b) =>
                sortOrderFactor * a.name.official.localeCompare(b.name.official)
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
        selectCountry(country) {
            this.$emit('countrySelected', country);
        },
    },
    async mounted() {
        // Fetch countries from the API
        this.countries = await countryService.getCountries();
    },
};
</script>

<template>
    <div class="w-full h-screen">
        <div class="mt-5 flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
            <div>
                <select v-model="sortOrder"
                    class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    <option value="asc">Sorting by Country Name (Asc) ↓</option>
                    <option value="desc">Sorting by Country Name (Desc) ↑</option>
                </select>
            </div>
            <label for="table-search" class="sr-only">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor"
                        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd"></path>
                    </svg>
                </div>
                <input v-model="searchQuery" type="text" id="table-search"
                    class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for countries">
            </div>
        </div>


        <div class="relative h-[80vh] w-[90vw] shadow-md sm:rounded-lg overflow-x-auto">

            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-16 py-3">
                            Flag
                        </th>
                        <th scope="col" class="px-6 py-3 w-[20%]">
                            Full Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Alpha-2 code
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Alpha-3 code
                        </th>
                        <th scope="col" class="px-6 py-3 w-[20%]">
                            Native Name
                        </th>
                        <th scope="col" class="px-6 py-3 w-[20%]">
                            Alternative Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Calling Code
                        </th>
                    </tr>
                </thead>
                <tbody>

                    <tr v-for="country in paginatedSortedAndFilteredCountries" :key="country.ccn3"
                        @click="selectCountry(country)"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="p-4">
                            <img :src="country.flags.png" :alt="country.name.official"
                                class="border border-gray w-16 md:w-32 w-40 h-20">
                        </td>
                        <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {{ country.name.official }}
                        </td>
                        <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {{ country.cca2 }}
                        </td>
                        <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {{ country.cca3 }}
                        </td>
                        <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            <div class="max-h-[100px] overflow-auto">
                                <p v-if="!country.name.nativeName" class="text-red-900">N/A</p>
                                <p v-for="(name, langCode) in country.name.nativeName" :key="langCode"> {{
                                    langCode.toUpperCase() }}: "{{ name.official }}"</p>
                            </div>

                        </td>

                        <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            <div class="max-h-[100px] overflow-auto">
                                <p v-if="!country.altSpellings" class="text-red-900">N/A</p>
                                <p v-for="altName in country.altSpellings">"{{ altName }}"</p>
                            </div>

                        </td>
                        <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            <div class="max-h-[100px] overflow-auto">
                                <p v-if="!country.idd.root" class="text-red-900">N/A</p>
                                <p v-for="suffix in country.idd.suffixes"> {{ country.idd.root }}{{ suffix }}</p>
                            </div>

                        </td>


                    </tr>


                </tbody>
            </table>


        </div>

        <div class="flex flex-col md:flex-row justify-between items-start md:items-center p-4">
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                Showing
                <span class="font-semibold text-gray-900 dark:text-white">25</span>
                of
                <span class="font-semibold text-gray-900 dark:text-white">250</span>
            </span>
            <ul class="inline-flex items-stretch -space-x-px">
                <li>
                    <div type="button" @click="prevPage" :disabled="currentPage === 1"
                        class="cursor-pointer flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span class="sr-only">Previous</span>
                        <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                </li>
                <li class="w-[5rem]">
                    <div
                        class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        {{ currentPage }} / {{ totalPages }}</div>
                </li>

                <li>
                    <div type="button" @click="nextPage" :disabled="currentPage === totalPages"
                        class="cursor-pointer flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span class="sr-only">Next</span>
                        <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped></style>