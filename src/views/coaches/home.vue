<template>
	<d-container fluid class="main-content-container px-4">
		<d-row no-gutters class="page-header py-4">
	    <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
	      <span class="text-uppercase page-subtitle">Dashboard</span>
	      <h3 class="page-title">Coaches Home/List</h3>
	    </d-col>
	  </d-row>

	  <d-row>
      <d-col v-for="(post, idx) in data3" :key="idx" lg="4">
        <d-card class="card-small card-post mb-4">
          <d-card-body>
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text text-muted">{{ post.body }}</p>
          </d-card-body>
          <d-card-footer class="border-top d-flex">
            <div class="card-post__author d-flex">
              <a href="#" class="card-post__author-avatar card-post__author-avatar--small" :style="{ backgroundImage: 'url(\'' + post.authorAvatar + '\')' }">Written by James Khan</a>
              <div class="d-flex flex-column justify-content-center ml-3">
                <span class="card-post__author-name">{{ post.author }}</span>
                <small class="text-muted">{{ post.date }}</small>
              </div>
            </div>
            <div class="my-auto ml-auto">
              <d-button size="sm" class="btn-white">
                <i class="far fa-bookmark mr-1"></i> Bookmark
              </d-button>
            </div>
          </d-card-footer>
        </d-card>
      </d-col>
    </d-row>


	</d-container>
</template>
<script>
const data3 = [{
  author: 'John James',
  authorAvatar: require('@/assets/images/avatars/1.jpg'),
  title: 'Had denoting properly jointure which well books beyond',
  body: 'In said to of poor full be post face snug. Introduced imprudence see say unpleasing devonshire acceptance son. Exeter longer wisdom work...',
  date: '29 February 2019',
}, {
  author: 'John James',
  authorAvatar: require('@/assets/images/avatars/2.jpg'),
  title: 'Husbands ask repeated resolved but laughter debating',
  body: 'It abode words began enjoy years no do ﻿no. Tried spoil as heart visit blush or. Boy possible blessing sensible set but margaret interest. Off tears...',
  date: '29 February 2019',
}, {
  author: 'John James',
  authorAvatar: require('@/assets/images/avatars/3.jpg'),
  title: 'Instantly gentleman contained belonging exquisite now direction',
  body: 'West room at sent if year. Numerous indulged distance old law you. Total state as merit court green decay he. Steepest merit checking railway...',
  date: '29 February 2019',
}];

export default {
	data () {
		return {
			data3
		}
	}
}
</script>
