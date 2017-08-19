import Vue from 'vue'
import axios from 'axios'

const dietaryPlaceholder = 'Kindly tell us about any food allergies or other'
  + 'dietary needs. Vegetarian options will be provided.';

const apiEndpoint = 'https://api.sethbethandbeyond.com/rsvp';

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
    guests: guests,
    posting: false
  },
  computed: {
    multiParty: function() {
      return this.guests.length > 1;
    },
    disableSubmit: function() {
      console.log("Posting?", this.posting);
      return this.posting;
    }
  },
  methods: {
    addGuest: function() {
      this.guests.push(new Guest);
    },
    dietaryToggle: function(guest) {
      guest.dietary = !guest.dietary
    },
    postForm: function() {
      this.posting = true;
      var self = this;

      axios.post(apiEndpoint, {
        attending: this.attending,
        email: this.email,
        guests: this.guests
      })
      .then(function (response) {
        console.log(response);
        window.location.href = "/";
      })
      .catch(function (error) {
        console.log(error);
        self.posting = false;
      });

    },
    removeGuest: function(index) {
      this.guests.splice(index, 1);
    }
  }
})
