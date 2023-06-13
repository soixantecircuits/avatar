<template>
  <div class='h-full w-full flex flex-col items-center justify-center'>
    <button class='ping-animation text-5xl font-black lg:title text-center low-highlight layer-text mt-4' @click='camStore.initializeStartPage()'>
        LET'S GO
      </button>
    <div class='absolute'>
      <img :class="'image' + (index + 1)" v-for='(image, index) in filteredImages' :key='image.id' :src='getURL(image.name)' :alt='image.name' />
      <!-- <img class='image1' src='/assets/image1.png' alt='Picture 1' />
      <img class= 'image2' src='/assets/image2.png' alt='Picture 2' />
      <img class='image3' src='/assets/image3.png' alt='Picture 3' />
      <img class='image4' src='/assets/image1.png' alt='Picture 4' />
      <img class='image5' src='/assets/image2.png' alt='Picture 5' />
      <img class='image6' src='/assets/image3.png' alt='Picture 6' />
      <img class='image7' src='/assets/image1.png' alt='Picture 7' /> -->
    </div>
  </div>
</template>

<script>
import { useCameraStore } from '~~/store'
import { onMounted } from '@vue/runtime-core'
import supabase from '~/plugins/supabase'
import { ref, computed } from 'vue'

export default {
  name: 'TakePickPage',
  layout: 'defaultLayout',

  setup () {
    const camStore = useCameraStore()
    const images = ref([])

    let selectedImageIDs = [];

    async function readFromDatabase() {
      const { data, error } = await supabase
        .storage
        .from('gallery')
        .list('', { limit: 1000 })

      if (error) {
        console.log(error)
      } else {
        const availableImages = data.filter(image => !selectedImageIDs.includes(image.id))
        const shuffledData = shuffleArray(availableImages).slice(0, 7)
        selectedImageIDs = shuffledData.map(image => image.id)
        images.value = shuffledData
      }
    }

    function shuffleArray (array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
      }
      return array
    }

    function getURL (imagename) {
      const url = 'https://piuidgbfculczkpeswnb.supabase.co/storage/v1/object/public/gallery/' + imagename
      return url
    }

    const filteredImages = computed(() => {
      return images.value.filter(image => image.name !== '.emptyFolderPlaceholder')
    })

    onMounted(() => {
      readFromDatabase()
    })

    return {
      camStore,
      images,
      getURL,
      filteredImages
    }
  }
}
</script>
