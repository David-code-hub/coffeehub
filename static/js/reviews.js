Vue.component('reviews',{

	template:
	`
	<div class="mb-16">

    <center><img class="mb-5 mx-auto" src="/static/img/comment.svg" height="150"></center>
    <br>
     <v-row
        v-if="loading"
        class="fill-height"
        align-content="center"
        justify="center"
      >
        <v-col
          class="subtitle-1 text-center"
          cols="12"
        >
         Getting reviews...
        </v-col>
        <v-col cols="6">
          <v-progress-linear
            color="brown darken-1"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
        </v-col>
      </v-row>
       <v-row v-else>
          <div v-if="!reviews.length" class="mx-auto mt-10">
          <img src="/static/img/b_not_found.svg" height="150"><br>
          <p>No Reviews,yet.</p></div>
      </v-row>





  <v-card class="mx-auto mb-3" max-width="500" elevation="0" style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px!important;" v-for="r in reviews">
    <v-img
        class="show-mobile"
        height="150"
        lazy-src="/static/img/cofee.png" 
        :src="'https://res.cloudinary.com/rlabs-developers-2020/' + r.customer.profile"
        
      ></v-img>
   <v-card-text style="padding:12px;">
  <v-row cols="12">
    <v-col  md="3" sm="3" cols="12" style="padding-top:0px;padding-bottom:0px;padding-left:0px;">

      <v-avatar class="hide-mobile" style="max-width:100%;width:100%;height:100%;border-bottom-right-radius:0px;border-top-right-radius:0px;border-top-left-radius:5px;border-bottom-left-radius:5px;">
      <v-img
        style="width:100%;"
        lazy-src="/static/img/cofee.png" 
        :src="'https://res.cloudinary.com/rlabs-developers-2020/' + r.customer.profile"
        
      ></v-img>
    </v-avatar>

    </v-col>

    <v-col md="9" sm="9" cols="12">
        <p style="margin-bottom:0px;">By {{r.user}} - <time class="timeago" :datetime="r.datetime"></time></p>
        <p>{{r.comment}}</p>
        <v-row>
          <v-col cols="6">
            <v-rating :value="r.rate" color="brown"  background-color="brown" dense half-increments readonly size="15"></v-rating>
          </v-col>
          <v-col cols="6" style="text-align: end;">
         

         <div v-for="l in r.love.slice(0,1)">
          <v-btn
             :loading="r.loading"
              :disabled="r.loading"
              @click="love(r)"
              icon >
              <v-icon>mdi-heart-outline</v-icon> {{r.love.length}}
            </v-btn>
            
          <!-- <div v-if="l.username === username">
              <v-btn
              :loading="r.loading"
              :disabled="r.loading"
              @click="love(r)"
                  icon
                  color="pink"
                >
              <v-icon>mdi-heart</v-icon> {{r.love.length}}
            </v-btn>
          </div>
          <div v-else-if="l.username !== username">
             <v-btn
             :loading="r.loading"
              :disabled="r.loading"
              @click="love(r)"
              icon >
              <v-icon>mdi-heart-outline</v-icon> {{r.love.length}}
            </v-btn>
          </div>-->

          

          </div>
          <div v-if="!r.love.length">
             <v-btn
             :loading="r.loading"
              :disabled="r.loading"
              @click="love(r)"
              icon >
              <v-icon>mdi-heart-outline</v-icon> {{r.love.length}}
            </v-btn>
          </div>
             
          </v-col>
        </v-row>

    </v-col>
  </v-row>
  </v-card-text>
  </v-card>
  

</div>






	`,
  data(){
    return{
      loading:false,
      reviews:[],
      value:3,
      username:'',
      loading5:false,
      username1:'David Lee',
    }
  },
  methods:{
    refresh(){
      axios
          .get(domain + '/api/reviews/')
          .then(response => {
            this.response = response.data;
            this.reviews_new = this.response
            this.reviews = this.reviews_new
              
          })

          .catch(err => console.log(err));
        },
    love(r){
      r.loading = true
        axios
          .get(domain + '/api/love/' + r.id + '/')
          .then(response => {  this.refresh();r.loading = false  }) .catch(err => console.log(err));
        },
  },
 created() {
         
        this.loading = true
        axios
          .get(domain + '/api/reviews/')
          .then(response => {
            this.response = response.data;
            this.reviews = this.response
            this.username = username
              jQuery(document).ready(function() {
              jQuery("time.timeago").timeago();
            });
              this.loading = false
          })

          .catch(err => console.log(err));
      },
})