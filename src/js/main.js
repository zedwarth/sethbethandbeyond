import Vue from 'vue'

const dietaryPlaceholder = 'Kindly tell us about any food allergies or other'
  + 'dietary needs. Vegetarian options will be provided.';

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
    dietaryPlaceholder: dietaryPlaceholder,
    email: null,
    guests: guests
  },
  computed: {
    multiParty: function() {
      return this.guests.length > 1;
    }
  },
  methods: {
    addGuest: function() {
      this.guests.push(new Guest);
    },
    dietaryToggle: function(guest) {
      guest.dietary = !guest.dietary
    },
    removeGuest: function(index) {
      this.guests.splice(index, 1);
    }
  }
})
