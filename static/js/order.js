Vue.component('order',{
	template:
	`
	<div>

	<v-card  max-width="500" class="mx-auto mb-14" style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;"  :loading="loading">
  <template slot="progress">
      <v-progress-linear
        color="green"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>
	  
    <div v-show="step1">
      <v-card-title class="ml-4">Step 1: Select Barista ☕</v-card-title>
     <v-card-text class="grey--text ml-4"><div style="color:#795548;">All available baristas.</div></v-card-text>
        
        <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
      <v-col md="6" sm="6" v-for="b in basrista_list" >
      <div class="text-center elevation-0" style="color:#795548;">
   		 <v-avatar v-on:click="step1F(b)" style="cursor: pointer;" size="100">
      <v-img
        lazy-src="/static/img/cofee.png" 
         v-bind:src="'https://res.cloudinary.com/rlabs-developers-2020/' + b.profile_image"
        :alt="b.user.username"
      ></v-img>
    </v-avatar><br>
   
    {{b.user.username}}
    </div>
    </v-col>


    <v-row
        v-if="loading"
        class="fill-height"
        align-content="center"
        justify="center"
      >
        <v-col
          class="subtitle-1 text-center mb-5"
          cols="12"
        >
         Revrieving data...Please wait
        </v-col>
       
      </v-row>
    <div v-else>
      <div v-if="!basrista_list.length" class="mx-auto">
      <img src="/static/img/b_not_found.svg" height="120"><br>
      No baristas online
      </div>
    </div>
  

        
      </v-row>

      

     
    </v-card-text>

   
    </div>


    <div v-show="step2" v-bind:class="{ 'animated bounceInUp' : step2 === true}">
    <v-card-title class="ml-4">Step 2 :</v-card-title>
     <v-card-text class="grey--text ml-4"><div style="color:#795548;">Fill in following details ✍️.</div></v-card-text>
    <v-card-text>

   
     <p>Coffee preference</p>

     <v-row align="center"
        class="mx-0">
      <v-col cols="4" md="4" sm="4" lg="4" class="text-center" v-for="b in beverages"  v-on:click="bev_s(b)" style="cursor:pointer;">
        <v-avatar size="40"><v-img lazy-src="/static/img/cofee.png"  src="https://images.unsplash.com/photo-1512568400610-62da28bc8a13?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80"></v-img></v-avatar>
       <center> <p>{{b.name}}</p></center>
      </v-col>
     </v-row>
    <!--<v-chip class="ma-2 elevation-0" label color="brown" outlined v-for="b in beverages"  v-on:click="bev_s(b)"><v-icon left> mdi-coffee-outline </v-icon> {{b.name}}</v-chip>-->
    <p class="mt-5">Sugar</p>

        <v-slider
          thumb-size="24"
          thumb-label="always"
          color="brown"
          v-model="value"
          :rules="rules"
          :max="10"
          track-color="brown lighten-3"
        ></v-slider>


    <!--  <v-text-field label="Sugar" outlined type="number"></v-text-field>
     <v-textarea  outlined name="input-7-4" label="Additional information(optional)"></v-textarea>-->


     <v-card-actions>
     <v-btn class="col white--text" color="brown" v-on:click="step2F" outlined>Next</v-btn>
    </v-card-actions>
    </v-card-text>

    
    </div>



    <div v-show="step3" v-bind:class="{ 'animated bounceInUp' : step3 === true}">

    <v-card-text>
     <v-card-title class="ml-4">Step 3 : Order progress 🕰 </v-card-title>

     <v-card-text class="grey--text ml-4"><div style="color:#795548;">Please don't refresh the page.</div></v-card-text>
    <v-progress-linear color="brown" v-model="order.status" height="25" rounded>

      <strong>{{ Math.ceil(order.status) }}%</strong>
    </v-progress-linear>
    <br>
    <div v-if="order != 0" class="text-center">
        <div  v-if="!order.status_info.length" class="mx-auto">
        <img src="/static/img/soon.svg" height="120"><br>
        A barista will get to your order soon.<br>
        <v-btn depressed class="white--text" color="red" outlined @click="cancelorder(order)"  :loading="loading" :disabled="loading">Cancel Order</v-btn>
        </div>
    </div>

    <template v-show="timeline">
        <v-subheader v-show="timeline">Timeline</v-subheader>
    </template>
    

      <v-timeline v-show="timeline">
    <v-timeline-item v-for="s in order.status_info" :key="s.id" small>
      <template v-slot:icon>
        <v-avatar>
          
          <v-img lazy-src="/static/img/cofee.png"  v-bind:src="'https://res.cloudinary.com/rlabs-developers-2020/' + order.barista.profile_image" ></v-img>

        </v-avatar>
      </template>

      <template v-slot:opposite>
        <span class="brown--text font-weight-bold">Progress {{s.status_val}} %</span>
      </template>
      <v-card class="elevation-2">
       

        
        
        
        <v-card-text> 
       <span class="font-weight-bold green--text"> Time :</span><br>
        <time class="timeago font-weight-light brown--text" :datetime="s.date"></time>
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
    <br>

    </v-card-text>

    </div>
    <div v-show="step4" v-bind:class="{ 'animated bounceInUp' : step4 === true}">

    <v-card-text>
     <v-card-title class="ml-4">Step 4 : Order complete 💯</v-card-title>

     <v-card-text class="grey--text ml-4"><div style="color:#795548;"> How was the service?</div></v-card-text>
 
    <br>
    
        <div class="mx-auto text-center">
        <img src="/static/img/rate.svg" height="120"><br>

       <v-rating
        v-model="rating"
        background-color="brown"
        color="brown darken-1"
        size="30"
      ></v-rating>
      <v-text-field outlined label="Comment" prepend-icon="mdi-comment-text-outline" v-model="comment" name="Comment" required type="text"></v-text-field>
      <v-btn class="col white--text" color="brown" v-on:click="submitrate" outlined>Submit</v-btn>
       
        </div>
    

   
    


    <br>

    </v-card-text>

    </div>
	</v-card>
  <v-snackbar
    shaped
    outlined
    :color="snackcolor"
            v-model="snackbar"
          >
            {{ text }}

            <template v-slot:action="{ attrs }">
              <v-btn
                color="brown darken-1"

                text
                v-bind="attrs"
                @click="snackbar = false"
              >
                Close
              </v-btn>
            </template>
          </v-snackbar>
	</div>
	











	`,

	data(){
		return{
      
			step1:true,
			step2:false,
			step3:false,
      step4:false,
			knowledge: 10,
			items: ['Cuppaccino', 'Glace', 'Hot chocolate','Mocha','Irish','Latte','Espresso','Macchiato'],
      value:1,
      rules: [
          v => v <= 4 || 'Super sweet!',
        ],
      basrista_list:[],
      order:0,
      user_name:'',
      beverage:'',
      snackbar: false,
      text:'',
      newstatus:0,
      newstatusitem:[],
      loading: false,
      rating:1,
      timeline:false,
      beverages:[],
      snackcolor:'',
      comment:'',

		}
	},
	methods:{
		step1F(b){
      
      this.user_name = b.user.username;
      this.select_b()
			this.step1 = false
			this.step2 = true
     
		},
    bev_s(b){
      this.beverage = b.name
      this.snackcolor = 'brown darken-1'
      this.text = 'You selected' + ' " ' + this.beverage + ' " 🤎'
      this.snackbar = true
      console.log(this.beverage)
    },
		step2F(){
      if (this.beverage === ''){
            this.snackcolor = 'red'
            this.text = 'Please select a beverage!☝️ '
            this.snackbar = true

            return
        }
      this.loading = true
			this.step2 = false
			this.step3 = true
      this.orderF()
      this.beverage_s()
     
       jQuery(document).ready(function() {
      jQuery("time.timeago").timeago();
    });
      this.loading = false
        
		},
    submitrate(){
        this.loading = true
        axios({ method : "POST", url: domain +'/api/new_reviews/', headers: header_info, data : { "rate":this.rating,"comment":this.comment,},})
        .then(response => {this.loading = false;router.push({ name: "reviews"})}).catch(err => { console.log(err);this.loading = false });
    },
		select_b(){
        this.loading = true
        axios({ method : "POST", url: domain +'/api/select_b/', headers: header_info, data : { "user":this.user_name, },})
        .then(response => {this.response = response.data['order'];this.order = this.response;this.loading = false}).catch(err => { console.log(err);this.loading = false });
      },
      cancelorder(order){
        this.loading = true

         axios
          .get(domain + '/api/cancelorder/' + order.id + '/')
          .then(response => { 
            this.order = 0
            this.loading = false
            this.step1 = true
            this.step2 = false
            this.step3 = false
            this.step4 = false
            this.snackcolor = 'success'
            this.text = 'Order has been cancelled 🙂'
            this.snackbar = true
           }).catch(err => console.log(err));},
      beverage_s(){
        
        this.loading = true
        axios({ method : "POST", url: domain +'/api/beverage_s/', headers: header_info, data : { "beverage":this.beverage,'order_id':this.order.id,'sugar':this.value},})
        .then(response => {this.loading = false}).catch(err => { console.log(err); this.loading = false});
      },
      orderF(){
        this.loading = true
         axios
          .get(domain + '/api/order/' + this.order.id)
          .then(response => {
            this.response = response.data;
            this.order = this.response
            this.loading = false
            
          })

          .catch(err => console.log(err));
      },
      orderNew(){
         axios
          .get(domain + '/api/order/' + this.order.id)
          .then(response => {
            this.response = response.data;
            this.newstatus = this.response
            
          })

          .catch(err => console.log(err));
      },
      statusnew(){
         axios
          .get(domain + '/api/newstatus/' + this.order.id)
          .then(response => {
            this.response = response.data;
            this.newstatusitem = this.response
            
          })

          .catch(err => console.log(err));
      },
      b_get(){
        axios
          .get(domain + '/api/baristas/')
          .then(response => {this.response = response.data;this.basrista_list = this.response }).catch(err => console.log(err));
      },
      beveragesF(){
        axios
          .get(domain + '/api/beverages/')
          .then(response => {this.response = response.data;this.beverages = this.response }).catch(err => console.log(err));
      },

	},


mounted: function () {
      window.setInterval(() => {
        this.b_get()
        if(this.order != 0){
          this.statusnew()
          this.orderNew()
          var ratestatus = parseInt(this.order.status)
          if(ratestatus === 100){
            this.step3 = false
            this.step4 = true
            return
          }
          
          if(this.newstatus === 0){
            var new_2 = this.newstatus
          }else{
            var new_2 = this.newstatus.status_info.length
          }
          
          var old2 =  this.order.status_info.length
          if(this.order.status != this.newstatus.status) {
            this.order.status = this.newstatus.status
            return
          }else{
            return
          }
        }
          
       
      }, 1000)
    },
  created() {
         
      this.loading = true
        axios
          .get(domain + '/api/baristas/')
          .then(response => {
            this.response = response.data;
            this.basrista_list = this.response
            this.beveragesF()
             window.setInterval(() => {
          
             if(this.order != 0){
              var new_ = this.newstatus.status_info.length
              var old =  this.order.status_info.length

              if(old != new_) {
                this.order.status_info.push({date: this.newstatusitem.date, profile_image: this.order.barista.profile_image , status_val: this.newstatusitem.status_val});
                  jQuery(document).ready(function() {
                  jQuery("time.timeago").timeago();
                });
                  this.timeline = true
                return
              }else{
                return
              }
            }
          }, 2000)
             this.loading = false
            
          })

          .catch(err => console.log(err));
      },
})