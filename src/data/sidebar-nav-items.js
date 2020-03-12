export default function () {
  return [{
    title: ' Dashboard',
    to: {
      name: 'dashboard',
    },
    htmlBefore: '<i class="material-icons">dashboard</i>',
    htmlAfter: '',
  }, {
    title: 'Courses',
    htmlBefore: '<i class="material-icons">library_books</i>',
    to: {
      name: 'blog-posts',
    },
  }, {
    title: 'Coaches',
    htmlBefore: '<i class="material-icons">school</i>',
    to: {
      name: 'add-new-post',
    },
  }, {
    title: 'Messaging',
    htmlBefore: '<i class="material-icons">message</i>',
    to: {
      name: 'components-overview',
    },
  }, {
    title: 'Groups',
    htmlBefore: '<i class="material-icons">people</i>',
    to: {
      name: 'tables',
    },
  }, {
    title: 'User Profile',
    htmlBefore: '<i class="material-icons">person</i>',
    to: {
      name: 'user-profile-lite',
    },
  }, {
    title: 'Reports',
    htmlBefore: '<i class="material-icons">report</i>',
    to: {
      name: 'errors',
    },
  }];
}
