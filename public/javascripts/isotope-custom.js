$('.grid').isotope({
    // options
    itemSelector: '.grid-item',
    layoutMode: 'fitRows',
    getSortData: {
        days: '.days parseInt'
    },
    sortBy: ['days'],
    sortAscending: {
        days: true
    }
  });