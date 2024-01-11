<template>
  <div class="modal-overlay flex flex-col" @click="closeModal">
    <button type="button" @click="closeModal"
      class="bg-white hover:bg-red-200 border-gray-200 mb-4 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
      <span class="sr-only">Close menu</span>
      <!-- Heroicon name: outline/x -->
      <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
        aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    <div class="modal" @click.stop>
      <div class="modal-content">

        <div
          class="w-m h-[600px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center">
          <img class="border border-gray-200 mt-2 rounded-lg w-98 h-72" :src="country.flags.png"
            :alt="country.name.official" alt="" />
          <h5 class="p-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ country.name.official }}</h5>
          <div class="px-5 h-[220px] overflow-auto">


            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                <tbody>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <th scope="row"
                      class="w-72 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-500">
                      Official Name:
                    </th>
                    <td class="w-72 h-5 px-6 py-4 overflow-auto">
                      {{ country.name.official }}
                    </td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <th scope="row"
                      class="w-72 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-500">
                      Common Name:
                    </th>
                    <td class="w-72 h-5 px-6 py-4 overflow-auto">
                      {{ country.name.common }}
                    </td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <th scope="row"
                      class="w-72 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-500">
                      Native Name:
                    </th>
                    <td class="w-72 h-5 px-6 py-4 overflow-auto">
                      <p v-if="!country.name.nativeName" class="text-red-900">N/A</p>
                      <p v-for="(name, langCode) in country.name.nativeName" :key="langCode"> {{
                        langCode.toUpperCase() }}: "{{ name.official }}"</p>
                    </td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <th scope="row"
                      class="w-72 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-500">
                      Alternative Name:
                    </th>
                    <td class="w-72 h-5 px-6 py-4 overflow-auto">

                      <p v-if="!country.altSpellings" class="text-red-900">N/A</p>
                      <p v-for="altName in country.altSpellings">"{{ altName }}"</p>

                    </td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <th scope="row"
                      class="w-72 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-500">
                      Calling Code:
                    </th>
                    <td class="w-72 h-5 px-6 py-4 overflow-auto">

                      <p v-if="!country.idd.root" class="text-red-900">N/A</p>
                      <p v-for="suffix in country.idd.suffixes"> {{ country.idd.root }}{{ suffix }}</p>

                    </td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <th scope="row"
                      class="w-72 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-500">
                      Capital:
                    </th>
                    <td class="w-72 h-5 px-6 py-4 overflow-auto">

                      <p v-if="!country.capital" class="text-red-900">N/A</p>
                      <p v-for="capital in country.capital"> {{ capital }}</p>

                    </td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <th scope="row"
                      class="w-72 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-500">
                      Region:
                    </th>
                    <td class="w-72 h-5 px-6 py-4 overflow-auto">

                      <p v-if="!country.region" class="text-red-900">N/A</p>
                      {{ country.region }}

                    </td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <th scope="row"
                      class="w-72 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-500">
                      Sub-Region:
                    </th>
                    <td class="w-72 h-5 px-6 py-4 overflow-auto">

                      <p v-if="!country.subregion" class="text-red-900">N/A</p>
                      {{ country.subregion }}

                    </td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <th scope="row"
                      class="w-72 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-500">
                      Languages:
                    </th>
                    <td class="w-72 h-5 px-6 py-4 overflow-auto">
                      <p v-if="!country.languages" class="text-red-900">N/A</p>
                      <p v-for="(name, langCode) in country.languages" :key="langCode">
                        {{ name }}</p>
                    </td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <th scope="row"
                      class="w-72 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-500">
                      Translation:
                    </th>
                    <td class="w-72 h-5 px-6 py-4 overflow-auto">
                      <p v-if="!country.translations" class="text-red-900">N/A</p>
                      <p v-for="(name, langCode) in country.translations" :key="langCode"> {{
                        langCode.toUpperCase() }}: "{{ name.official }}"</p>
                    </td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <th scope="row"
                      class="w-72 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-500">
                      Latitude and Longitude:
                    </th>
                    <td class="w-72 h-5 px-6 py-4 overflow-auto">
                      <p v-if="!country.latlng" class="text-red-900">N/A</p>
                      <p>Lat: {{country.latlng[0]}}</p>
                      <p>Long: {{country.latlng[1]}}</p>
                    </td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <th scope="row"
                      class="w-72 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-500">
                      Map:
                    </th>
                    <td class="w-72 h-5 px-6 py-4 overflow-auto">
                      <p v-if="!country.maps" class="text-red-900">N/A</p>
                      <p v-for="(data, code) in country.maps" :key="code"> {{
                        code }}: <a :href="data">{{ data }}</a></p>
                    </td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <th scope="row"
                      class="w-72 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-500">
                      Population:
                    </th>
                    <td class="w-72 h-5 px-6 py-4 overflow-auto">
                      <p v-if="!country.population" class="text-red-900">N/A</p>
                      {{country.population}}
                    </td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <th scope="row"
                      class="w-72 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-500">
                      Timezones:
                    </th>
                    <td class="w-72 h-5 px-6 py-4 overflow-auto">
                      <p v-if="!country.timezones" class="text-red-900">N/A</p>
                      {{country.timezones}}
                    </td>
                  </tr>


                </tbody>
              </table>
            </div>


          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['country'],
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  /* Semi-transparent black overlay */
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  /* Modal styles (positioning, background, etc.) */
  background-color: white;
  border-radius: 10px;
  padding: 5px;
}
</style>
