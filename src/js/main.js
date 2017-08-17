import Vue from 'vue'

function Guest() {
  this.name = null;
  this.age = 'Age';
  this.dietary = false;
  this.dietaryNotes = null;
}

var guests = [ new Guest ];

var vm = new Vue({
  el: '#rsvp',
  data: {
    attending: null,
    email: null,
    guests: guests
  },
  computed: {
    multiParty: function() {
      return this.guests.length > 1;
    }
  },
  methods: {
    addGuest: function () {
      this.guests.push(new Guest);
    },
    removeGuest: function(index) {
      console.log(guests[index]);
      this.guests.splice(index, 1);
    }
  }
})
