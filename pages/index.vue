<template>
<div class="flex flex-col">
    <start-page v-if="camStore.isStartPage && !camStore.isStartXp && !camStore.isStartShoot && !camStore.isStartVerif && !camStore.isStartShare && !camStore.isStartMail" />
    <start-x-p v-if="!camStore.isStartPage && camStore.isStartXp && !camStore.isStartShoot && !camStore.isStartVerif && !camStore.isStartShare && !camStore.isStartMail" />
    <photo-shoot v-if="!camStore.isStartPage && !camStore.isStartXp && camStore.isStartShoot && !camStore.isStartVerif && !camStore.isStartShare && !camStore.isStartMail" />
    <verif-photo-shoot v-if="!camStore.isStartPage && !camStore.isStartXp && !camStore.isStartShoot && camStore.isStartVerif && !camStore.isStartShare && !camStore.isStartMail" />
    <share-photo-shoot v-if="!camStore.isStartPage && !camStore.isStartXp && !camStore.isStartShoot && !camStore.isStartVerif&& camStore.isStartShare && !camStore.isStartMail" />
    <email-photo-shoot v-if="!camStore.isStartPage && !camStore.isStartXp && !camStore.isStartShoot && !camStore.isStartVerif&& !camStore.isStartShare && camStore.isStartMail" />
</div>
</template>

<script>
import { useCameraStore } from '~~/store'
import { onBeforeUnmount } from 'vue'
import StartPage from '~~/components/StartPage.vue'
import StartXP from '~~/components/StartXP.vue'
import PhotoShoot from '~~/components/PhotoShoot.vue'
import VerifPhotoShoot from '~~/components/VerifPhotoShoot.vue'
import SharePhotoShoot from '~~/components/SharePhotoShoot.vue'

export default {
  components: { StartPage, StartXP, PhotoShoot, VerifPhotoShoot, SharePhotoShoot },
  name: 'IndexPage',
  setup () {
    const camStore = useCameraStore()

    onBeforeUnmount(() => {
      camStore.initializeMediaUI()
    })

    return {
      camStore
    }
  }
}
</script>
