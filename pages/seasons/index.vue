<template>
  <div id="season">
    <el-row
      id="chapters-list"
      :gutter="gutter"
    >
      <el-col
        v-for="chapter in chapters"
        :key="chapter.id"
        class="chapter-col"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
      >
        <ChapterCard :chapter="chapter" />
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import { Loading } from 'element-ui';
import utils from '../../utils';
import ChapterCard from '../../components/ChapterCard.vue';

export default {
  name: 'Season',
  components: {
    ChapterCard,
  },
  nuxtI18n: {
    paths: {
      es: '/temporadas/:season_number',
    },
  },
  async fetch() {
    if (process.browser) {
      this.loadingInstance = Loading.service({
        target: utils.LOADING.QUERY_SELECTOR,
        background: 'rgba(0, 0, 0, 0.8)',
      });
    }

    return this.$store.dispatch('chapters/getAll', { season: this.$route.params.season_number })
      .finally(() => {
        if (this.loadingInstance) this.loadingInstance.close();
      });
  },
  data() {
    return {
      gutter: 50,
      detailButtonText: this.$t('VIEWS.SEASONS.SEE_DETAIL.TEXT'),
    };
  },
  computed: {
    ...mapState('chapters', {
      chapters: 'all',
    }),
  },
  created() {
    if (process.browser) {
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    }
  },
  beforeDestroy() {
    if (this.loadingInstance) this.loadingInstance.close();
    window.removeEventListener('resize', this.handleResize);
    this.$store.dispatch('chapters/destroyAll');
  },
  methods: {
    handleResize() {
      if (utils.isMobile()) {
        this.gutter = utils.VIEWS.CHARACTERS.GUTTER.MOBILE;
      } else {
        this.gutter = utils.VIEWS.CHARACTERS.GUTTER.DEFAULT;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#season {
  #chapters-list{
    .chapter-col{
      padding: 6px;

      .image-container{
        .image{
          width: 100%;
          height: 100%;
          display: block;
        }
      }

      .chapter-card-info{
        .el-row{
          .chapter-name{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: block;
          }

          &:not(:last-child){
            margin-bottom: 20px;
          }
        }
      }
    }
  }
}
</style>