Vue.component('profile',{
	template:
	`




	<div>
	
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
         Retrieving data...Please wait
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
     

		<v-card  max-width="400" class="mx-auto mb-14" style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;color:#795548;" >
		 <v-img  lazy-src="/static/img/cofee.png" v-bind:src="'https://res.cloudinary.com/rlabs-developers-2020/' + customer.profile" :alt="customer.user.username" height="200"></v-img>

				<v-card-text>
		<center>
		<!--<v-avatar size="70" class="elevation-0">
	      <v-img  lazy-src="/static/img/cofee.png" v-bind:src="'https://res.cloudinary.com/rlabs-developers-2020/' + customer.profile" :alt="customer.user.username"></v-img>
	    </v-avatar>-->
	    <br>
	    <p >{{customer.user.username}}</p>
          
	    <v-divider></v-divider>
	    </center>
	    
	    <br>
	    <center><p>Total Coffee Ordered.</p></center>
	    <br>
	    <center><h1><b>☕ {{customer.orders.length}}</b> <span style="font-size:15px;">Cups</span></h1></center>
		<br>
	
		</v-card-text>
	
	</v-card>
	</div>














	`,


	data(){
		return{
			error:false,
			loading:false,
			customer:[],
			 width: 2,
		      radius: 5,
		      padding: 4,
		      lineCap: 'round',
		      switch1:true,
		      value: [
		      	0,
		        20,
		      
		      ],
		      labels: [
		      	'0',
		        '2 min',
		    
		      ],
		      fill: true,
		      type: 'trend',
		      autoLineWidth: false,
			}
	},

	methods: {

	},


	created(){
		this.loading = true
		axios.get(domain + '/api/customer/').then(response =>{ this.response = response.data;this.customer = this.response;this.loading = false}).catch(err=>{console.log(err);this.error = true})
	}


})
