Vue.component('orders',{
	template:
	`
	<div>

    <br>


<v-row class="mb-16">
<v-col cols="12" md="9" sm="9" lg="9" style="border-right:1px solid #ccc;">
<h3>Most recent orders :</h3>
<p class="red--text font-weight-bold">Please log out once you're done 🙂</p>
<br>
 <v-divider></v-divider>
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
         Getting orders...
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
          <div v-if="!orders.length" class="mx-auto mt-10">
          <img src="/static/img/b_not_found.svg" height="150"><br>
          <p>No Orders,yet</p></div>
      </v-row>
    <v-row class="mb-16">
      <v-col cols="10" md="4" sm="4" lg="4" class="coffee-card" v-for="o in orders.slice(0, 7)" :key="o.id">
        <v-card style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;" class="rounded-lg">
      <div style="height:50px;padding:0.6em;background:#795548!important;margin-bottom:0.2em;">
      <v-row>
      <v-col cols="10">
      <p class="white--text"><v-avatar size="30"><v-img lazy-src="/static/img/cofee.png" v-bind:src="'https://res.cloudinary.com/rlabs-developers-2020/' + o.barista.profile_image"></v-img></v-avatar> Order info</p>
      </v-col>
      <v-col cols="2">
       <p class="text-right"><v-icon color="white" style="font-size:20px;">mdi-information-outline</v-icon></p>
       </v-col>
      </v-row>
      </div>
        <v-card-text>
          <v-row>
              <v-col cols="3">
                <v-avatar size="50"><v-img lazy-src="/static/img/cofee.png" v-bind:src="'https://res.cloudinary.com/rlabs-developers-2020/' + o.customer.profile"></v-img></v-avatar> 
              </v-col>
              <v-col cols="9">

              <p>Time : <span style="color:rgb(121, 85, 72);"> <time class="timeago" :datetime="o.date"></time></span><br>

               {{o.beverage}} with <b> {{o.sugar}} </b> sugar.</p>
             <v-btn color="brown darken-2" outlined link v-on:click="statusF(o)" depressed class="white--text">{{o.status}} % <v-badge dot color="green darken-1" v-if="o.status == '100'"></v-badge></v-btn>

              </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      </v-col>
     </v-row>

</v-col>
<v-col cols="12" md="3" sm="3" lg="3">
<h3>Manage Beverages</h3>
<br>
 <v-divider></v-divider>
 <br>
 <v-row>
  <v-col cols="6" v-for="b in beverages">
 <v-card  style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
  <v-card-text>
    <v-row >
      <v-col cols="12" >
       <p>{{b.name}}</p>
         <v-switch v-model="b.active" inset  color="brown" @click="b_active(b)"></v-switch>
      </v-col>
     
     </v-row>
  </v-card-text>
 </v-card>
  </v-col>
</v-row>

</v-col>

</v-row>

	
 

   <v-snackbar
    shaped
    color="brown darken-1"
    outlined
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
			status:0,
			color:'brown',
      orders:[],
      new_orders:[],
      snackbar:false,
      id_:0,
      text:'',
      has_bev:false,
      beverages:[],
      active_false:false,
      active_true:true,

		}
	},
	methods:{

     beveragesF(){
        axios
          .get(domain + '/api/beverages_all/')
          .then(response => {this.response = response.data;this.beverages = this.response }).catch(err => console.log(err));
      },

		statusF(o){
      this.status = parseInt(o.status);
      console.log(this.status)
      this.id_ = o.id
			if(this.status === 100 ){this.status = 100 ;}
      else(
        this.status += 20
        )
      o.status = this.status
      console.log(this.status)
       axios({ method : "POST", url: domain +'/api/updatestatus/', headers: header_info, data : { "status":this.status,"id_":this.id_},})
      .then(response => { this.status = 0}).catch(err => { console.log(err); });

      
			
		},

    b_active(b){
      this.id_ = b.id
       axios({ method : "POST", url: domain +'/api/updatebeverage/', headers: header_info, data : {"id_":this.id_},})
      .then(response => { b.active = this.response.data['msg']}).catch(err => { console.log(err); });

      
      
    },

    orderNotification(){
        axios
        .get(domain + '/api/allorders/')
          .then(response => {
            var data = { soundurl : '/static/audio/new_order.wav'} 

            this.response = response.data;
            this.new_orders = this.response 
             // var audio = new Audio(data.soundurl);
             //  audio.play();
             // var audio = new Audio('/static/audio/new_order.wav');
             //  audio.play();
          }).catch(err => console.log(err));
      },



   has_beverage(){
        axios
        .get(domain + '/api/has_bev/')
          .then(response => {
            this.has_bev = this.response.data['has_bev']
          }).catch(err => console.log(err));
      }
	},


  mounted:function(){
      window.setInterval(() => {
          this.orderNotification()
          jQuery(document).ready(function() {
          jQuery("time.timeago").timeago();
          });

           if(this.new_orders.length > this.orders.length){
               
              this.has_beverage()
              if(this.has_bev = true){
                this.snackbar = true;
                this.text = 'New Order!';

                
                audio.play();
                this.orders = this.new_orders;
                jQuery(document).ready(function() {
                jQuery("time.timeago").timeago();
                });
                return
              }
           }else if(this.new_orders.length < this.orders.length){
              this.snackbar = true;

              this.text = 'Order has been cancelled.';
              this.orders = this.new_orders;
           }
          }, 1000)
    
  },

    created() {
         
      this.loading = true
        axios
          .get(domain + '/api/allorders/')
          .then(response => {
            this.beveragesF()

              jQuery(document).ready(function() {
              jQuery("time.timeago").timeago();
            });
            this.response = response.data;
            this.orders = this.response
            this.loading = false
          })

          .catch(err => console.log(err));
      },

})