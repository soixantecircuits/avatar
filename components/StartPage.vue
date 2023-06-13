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

    async function readFromDatabase() {
      const { data, error } = await supabase
        .storage
        .from('images')
        .list('', { limit: 8 })

      if (error) {
        console.log(error)
      } else {
        const shuffledData = data.sort(() => Math.random() - 0.5).slice(0, 8)
        images.value = shuffledData
      }
    }

    function getURL (imagename) {
      const url = 'https://piuidgbfculczkpeswnb.supabase.co/storage/v1/object/public/images/' + imagename
      return url
    }

    const filteredImages = computed(() => {
      return images.value.filter(image => image.name !== '.emptyFolderPlaceholder');
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
