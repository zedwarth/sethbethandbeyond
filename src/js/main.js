import Vue from 'vue'
import axios from 'axios'
import VueScrollTo from 'vue-scrollto'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate)
Vue.use(VueScrollTo)

const dietaryPlaceholder = 'Kindly tell us about any food allergies or other'
  + ' dietary restrictions. Vegetarian options will be provided.';

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
    disableSubmit: function() {
      console.log('posting?', this.posting);
      console.log('errors?', this.errors.any());
      return this.posting || this.errors.any() || this.guests.every(this.guestLacksRequiredFields);
    },
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
    guestLacksRequiredFields: function(guest) {
      var validDietary = guest.dietary ? guest.dietaryNotes : true;
      var validAge = guest.age !== 'Age';

      if (this.attending) {
        return !(guest.name && validAge && validDietary);
      } else {
        return Boolean(guest.name);
      }
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
          window.location.href = "/";
        })
        .catch(function (error) {
          self.posting = false;
        });
    },
    removeGuest: function(index) {
      this.guests.splice(index, 1);
    }
  }
})
