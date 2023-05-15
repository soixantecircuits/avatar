<template>
<div>
    <start-page v-if="camStore.isStartPage && !camStore.isStartXp && !camStore.isStartShoot && !camStore.isStartVerif && !camStore.isStartShare && !camStore.isStartMail & !camStore.isStartQR" />
    <start-x-p v-if="!camStore.isStartPage && camStore.isStartXp && !camStore.isStartShoot && !camStore.isStartVerif && !camStore.isStartShare && !camStore.isStartMail & !camStore.isStartQR" />
    <photo-shoot v-if="!camStore.isStartPage && !camStore.isStartXp && camStore.isStartShoot && !camStore.isStartVerif && !camStore.isStartShare && !camStore.isStartMail & !camStore.isStartQR" />
    <verif-photo-shoot v-if="!camStore.isStartPage && !camStore.isStartXp && !camStore.isStartShoot && camStore.isStartVerif && !camStore.isStartShare && !camStore.isStartMail & !camStore.isStartQR" />
    <share-photo-shoot v-if="!camStore.isStartPage && !camStore.isStartXp && !camStore.isStartShoot && !camStore.isStartVerif&& camStore.isStartShare && !camStore.isStartMail & !camStore.isStartQR" />
    <email-photo-shoot v-if="!camStore.isStartPage && !camStore.isStartXp && !camStore.isStartShoot && !camStore.isStartVerif&& !camStore.isStartShare && camStore.isStartMail & !camStore.isStartQR" />
    <qr-photo-shoot v-if="!camStore.isStartPage && !camStore.isStartXp && !camStore.isStartShoot && !camStore.isStartVerif&& !camStore.isStartShare && !camStore.isStartMail & camStore.isStartQR" />
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
